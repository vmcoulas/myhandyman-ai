import type { Express } from "express";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia" as any,
});

const PREMIUM_PRICE_ID = "price_1T7SCrFiJLf9jJBOOejoYL7n";

import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzeFurnitureImage, analyzeFromDescription } from "./services/openai";
import { insertProjectSchema, insertInstructionSchema, insertUserSchema, insertFeedbackSchema } from "@shared/schema";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import express from "express";

// Configure multer for image uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve static assets from attached_assets directory
  app.use('/attached_assets', express.static(path.join(process.cwd(), 'attached_assets')));
  
  // Add auth routes (setup will be simplified for now)
  app.get('/api/auth/user', (req, res) => {
    // For now, return null (no authenticated user)
    // In production, this would integrate with Replit Auth
    res.json(null);
  });
  
  // Lightweight outbound click tracking (best-effort)
  app.post("/api/events/outbound", (req, res) => {
    try {
      // Intentionally permissive for MVP
      console.log("[outbound_click]", {
        ...req.body,
        ip: req.ip,
        ua: req.get("user-agent"),
      });
      res.json({ ok: true });
    } catch (error) {
      console.error("Error tracking outbound click:", error);
      res.status(500).json({ ok: false });
    }
  });

  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const validatedUser = insertUserSchema.parse(req.body);
      const user = await storage.createUser(validatedUser);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Failed to create user" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      // Handle both string and numeric IDs for compatibility
      const id = req.params.id;
      const numericId = parseInt(id);
      
      // Try to get user with the ID (handle both string and number)
      const user = await storage.getUser(isNaN(numericId) ? id : numericId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.post("/api/users/email", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      let user = await storage.getUserByEmail(email);
      if (!user) {
        // Create a new user if they don't exist
        user = await storage.createUser({ email });
      }

      res.json(user);
    } catch (error) {
      console.error("Error finding/creating user:", error);
      res.status(500).json({ message: "Failed to find or create user" });
    }
  });

  // Get projects for a specific user
  app.get("/api/users/:id/projects", async (req, res) => {
    try {
      const id = req.params.id;
      const projects = await storage.getProjectsByUser(id);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching user projects:", error);
      res.status(500).json({ message: "Failed to fetch user projects" });
    }
  });

  // Get all projects
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get top-rated projects (must come BEFORE /api/projects/:id)
  app.get("/api/projects/top-rated", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const projects = await storage.getTopRatedProjects(limit);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching top-rated projects:", error);
      res.status(500).json({ message: "Failed to fetch top-rated projects" });
    }
  });

  // Get single project with instructions
  app.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const instructions = await storage.getInstructionsByProject(id);
      res.json({ project, instructions });
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Check build limits
  app.post("/api/check-build-limit", async (req, res) => {
    try {
      const { userId, difficulty } = req.body;
      
      if (!userId || !difficulty) {
        return res.status(400).json({ message: "User ID and difficulty required" });
      }

      const canBuild = await storage.canUserBuild(userId, difficulty);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let limitMessage = "";
      let upgradeRequired = false;

      if (!canBuild) {
        if (!user.isPremium && difficulty.toLowerCase() !== 'easy') {
          limitMessage = "Only Easy builds are available in the free plan. Upgrade to Premium for Medium and Hard builds!";
          upgradeRequired = true;
        } else if (!user.isPremium) {
          limitMessage = `You've used all ${user.maxEasyBuilds} free Easy builds this month. Upgrade to Premium for unlimited builds!`;
          upgradeRequired = true;
        } else {
          limitMessage = "You've reached your Premium build limit for this month.";
        }
      }

      res.json({
        canBuild,
        limitMessage,
        upgradeRequired,
        user: {
          buildsUsed: user.buildsUsed,
          easyBuildsUsed: user.easyBuildsUsed,
          maxBuilds: user.isPremium ? 10 : user.maxEasyBuilds,
          isPremium: user.isPremium
        }
      });
    } catch (error) {
      console.error("Error checking build limit:", error);
      res.status(500).json({ message: "Failed to check build limit" });
    }
  });

  // Analyze furniture image and create project
  app.post("/api/analyze-furniture", upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image file provided" });
      }

      // Convert image to base64
      const processedImage = await sharp(req.file.buffer)
        .resize(1024, 1024, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toBuffer();
      
      const base64Image = processedImage.toString('base64');

      // Check if user can build this difficulty level
      const { userId } = req.body;
      if (userId) {
        // Ensure user exists in database (auto-create if not)
        let user = await storage.getUser(String(userId));
        if (!user) {
          try {
            user = await storage.upsertUser({ id: String(userId), email: `user-${userId}@myhandyman.ai` });
            console.log(`[users] Auto-created user ${userId}`);
          } catch (e) {
            console.error("[users] Failed to auto-create user:", e);
          }
        }
        const canBuild = await storage.canUserBuild(String(userId), "unknown"); // We'll check after analysis
        if (!canBuild) {
          return res.status(403).json({ 
            message: "Build limit reached. Please upgrade to continue." 
          });
        }
      }

      // Analyze with OpenAI
      const analysis = await analyzeFurnitureImage(base64Image);

      // Check build limits based on actual difficulty
      if (userId) {
        const canBuildActual = await storage.canUserBuild(String(userId), analysis.difficulty);
        if (!canBuildActual) {
          let message = "Build limit reached.";
          const user = await storage.getUser(String(userId));
          if (user && !user.isPremium && analysis.difficulty.toLowerCase() !== 'easy') {
            message = "Only Easy builds are available in the free plan. Upgrade to Premium for Medium and Hard builds!";
          } else if (user && !user.isPremium) {
            message = `You've used all ${user.maxEasyBuilds} free Easy builds this month. Upgrade to Premium for unlimited builds!`;
          }
          return res.status(403).json({ message });
        }
        
        // Increment user's build count
        await storage.incrementUserBuilds(String(userId), analysis.difficulty);
      }

      // Create project
      const projectData = {
        userId: userId ? String(userId) : null,
        title: analysis.title,
        description: analysis.description,
        imageUrl: `data:image/jpeg;base64,${base64Image}`,
        category: analysis.category,
        difficulty: analysis.difficulty,
        estimatedTime: analysis.estimatedTime,
        estimatedCost: analysis.estimatedCost.toString(),
        materials: analysis.materials,
        tools: analysis.tools,
        safetyNotes: analysis.safetyNotes,
            safetyLevel: analysis.safetyLevel || "DIY-friendly",
            safetyWarningProject: analysis.safetyWarning || null,
            safetyLevel: analysis.safetyLevel || "DIY-friendly",
            safetyWarningProject: analysis.safetyWarning || null,
      };

      const validatedProject = insertProjectSchema.parse(projectData);
      const project = await storage.createProject(validatedProject);

      // Create instructions
      const instructions = await Promise.all(
        analysis.steps.map(step => {
          const instructionData = {
            projectId: project.id,
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description,
            imageUrl: null,
            safetyWarning: step.safetyWarning || null,
            adultSupervisionRequired: step.adultSupervision,
          };
          const validatedInstruction = insertInstructionSchema.parse(instructionData);
          return storage.createInstruction(validatedInstruction);
        })
      );

      res.json({ project, instructions });
    } catch (error) {
      console.error("Error analyzing furniture:", error);
      res.status(500).json({ 
        message: error instanceof Error ? error.message : "Failed to analyze furniture image" 
      });
    }
  });



  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedFeedback = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedFeedback);
      
      // Update project rating if a star rating was provided AND this feedback is tied to a project
      if (feedback.projectId && feedback.rating && feedback.rating > 0) {
        await storage.updateProjectRating(feedback.projectId, feedback.rating);
      }
      
      res.json(feedback);
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(400).json({ message: "Failed to create feedback" });
    }
  });

  app.get("/api/projects/:id/feedback", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const feedback = await storage.getFeedbackByProject(projectId);
      res.json(feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  // Export project as PDF (placeholder for now - would need PDF generation library)
  app.get("/api/projects/:id/export", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }

      const project = await storage.getProject(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const instructions = await storage.getInstructionsByProject(id);
      
      // For MVP, return JSON data that frontend can use to generate PDF
      res.json({
        project,
        instructions,
        exportFormat: "json", // Could be extended to support PDF generation
      });
    } catch (error) {
      console.error("Error exporting project:", error);
      res.status(500).json({ message: "Failed to export project" });
    }
  });

  // Check usage limits
  app.get("/api/users/:id/usage", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const user = await storage.getUser(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const remainingBuilds = Math.max(0, user.maxBuilds - user.buildsUsed);
      const isLimitReached = remainingBuilds <= 0 && !user.isPremium;

      res.json({
        buildsUsed: user.buildsUsed,
        maxBuilds: user.maxBuilds,
        remainingBuilds,
        isPremium: user.isPremium,
        isLimitReached,
        premiumExpiresAt: user.premiumExpiresAt,
      });
    } catch (error) {
      console.error("Error checking usage:", error);
      res.status(500).json({ message: "Failed to check usage" });
    }
  });



  // Analyze from text description (no photo needed)
  app.post("/api/analyze-description", async (req, res) => {
    try {
      const { description, userId } = req.body;
      
      if (!description || description.trim().length < 5) {
        return res.status(400).json({ message: "Please provide a description of what you want to build." });
      }

      if (userId) {
        let user = await storage.getUser(String(userId));
        if (!user) {
          try {
            user = await storage.upsertUser({ id: String(userId), email: `user-${userId}@myhandyman.ai` });
          } catch (e) {
            console.error("[users] Failed to auto-create user:", e);
          }
        }
      }

      const analysis = await analyzeFromDescription(description.trim());

      if (userId) {
        await storage.incrementUserBuilds(String(userId), analysis.difficulty);
      }

      const projectData = {
        userId: userId ? String(userId) : null,
        title: analysis.title,
        description: analysis.description,
        imageUrl: "text-input",
        category: analysis.category,
        difficulty: analysis.difficulty,
        estimatedTime: analysis.estimatedTime,
        estimatedCost: analysis.estimatedCost.toString(),
        materials: analysis.materials,
        tools: analysis.tools,
        safetyNotes: analysis.safetyNotes,
            safetyLevel: analysis.safetyLevel || "DIY-friendly",
            safetyWarningProject: analysis.safetyWarning || null,
            safetyLevel: analysis.safetyLevel || "DIY-friendly",
            safetyWarningProject: analysis.safetyWarning || null,
      };

      const validatedProject = insertProjectSchema.parse(projectData);
      const project = await storage.createProject(validatedProject);

      const instructions = await Promise.all(
        analysis.steps.map(step => {
          const instructionData = {
            projectId: project.id,
            stepNumber: step.stepNumber,
            title: step.title,
            description: step.description,
            safetyWarning: step.safetyWarning || null,
            adultSupervision: step.adultSupervision || false,
          };
          return storage.createInstruction(insertInstructionSchema.parse(instructionData));
        })
      );

      res.json({
        project,
        instructions,
        analysis,
      });
    } catch (error: any) {
      console.error("Error analyzing description:", error);
      res.status(500).json({ message: error.message || "Failed to generate build plan." });
    }
  });

  // Stripe: Create checkout session for premium upgrade
  app.post("/api/stripe/create-checkout", async (req, res) => {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID required" });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{ price: PREMIUM_PRICE_ID, quantity: 1 }],
        mode: "subscription",
        success_url: `${req.protocol}://${req.get("host")}/?premium=success`,
        cancel_url: `${req.protocol}://${req.get("host")}/?premium=cancelled`,
        metadata: { userId },
      });

      res.json({ url: session.url });
    } catch (error) {
      console.error("Stripe checkout error:", error);
      res.status(500).json({ message: "Failed to create checkout session" });
    }
  });

  // Stripe: Webhook to handle subscription events
  app.post("/api/stripe/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"] as string;
    let event: Stripe.Event;

    try {
      // In production, verify with webhook secret
      event = JSON.parse(req.body.toString()) as Stripe.Event;
    } catch (error) {
      console.error("Webhook parse error:", error);
      return res.status(400).send("Webhook Error");
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      if (userId) {
        try {
          const user = await storage.getUser(userId);
          if (user) {
            await storage.upgradeToPremium(userId);
            console.log(`[stripe] User ${userId} upgraded to premium`);
          }
        } catch (err) {
          console.error("Error upgrading user:", err);
        }
      }
    }

    res.json({ received: true });
  });

  const httpServer = createServer(app);
  return httpServer;
}
