import { projects, instructions, users, feedback, type Project, type InsertProject, type Instruction, type InsertInstruction, type User, type InsertUser, type Feedback, type InsertFeedback } from "@shared/schema";

export interface IStorage {
  // User methods
  createUser(user: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, updates: Partial<InsertUser>): Promise<User>;
  incrementUserBuilds(userId: number, difficulty: string): Promise<void>;
  upgradeToPremium(userId: number | string): Promise<void>;
  canUserBuild(userId: number, difficulty: string): Promise<boolean>;
  
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByUser(userId: number): Promise<Project[]>;
  updateProjectRating(projectId: number, newRating: number): Promise<void>;
  getTopRatedProjects(limit?: number): Promise<Project[]>;
  
  // Instruction methods
  createInstruction(instruction: InsertInstruction): Promise<Instruction>;
  getInstructionsByProject(projectId: number): Promise<Instruction[]>;
  deleteInstructionsByProject(projectId: number): Promise<void>;
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedbackByProject(projectId: number): Promise<Feedback[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private instructions: Map<number, Instruction>;
  private feedback: Map<number, Feedback>;
  private currentUserId: number;
  private currentProjectId: number;
  private currentInstructionId: number;
  private currentFeedbackId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.instructions = new Map();
    this.feedback = new Map();
    this.currentUserId = 1;
    this.currentProjectId = 1;
    this.currentInstructionId = 1;
    this.currentFeedbackId = 1;
    this.initSampleData();
  }

  private initSampleData() {
    // Add sample instructions for the Garden Plant Stand project
    const gardenPlantStandInstructions: Instruction[] = [
      {
        id: 1,
        projectId: 3,
        stepNumber: 1,
        title: "Prepare Your Workspace",
        description: "Set up a clean, well-ventilated workspace. Lay out all cedar wood pieces and organize your tools. Have an adult check that all materials are present and in good condition.",
        safetyWarning: "Always work in a well-ventilated area when using wood stain",
        adultSupervisionRequired: true
      },
      {
        id: 2,
        projectId: 3,
        stepNumber: 2,
        title: "Sand the Cedar Wood",
        description: "Lightly sand all cedar pieces with fine-grit sandpaper to smooth any rough edges. This helps the stain absorb evenly and prevents splinters.",
        safetyWarning: "Wear safety glasses and dust mask while sanding",
        adultSupervisionRequired: true
      },
      {
        id: 3,
        projectId: 3,
        stepNumber: 3,
        title: "Measure and Mark",
        description: "Using your measuring tape, mark where the shelves will be attached to the side panels. Make light pencil marks that can be erased later.",
        safetyWarning: null,
        adultSupervisionRequired: false
      },
      {
        id: 4,
        projectId: 3,
        stepNumber: 4,
        title: "Pre-drill Holes",
        description: "Have an adult pre-drill pilot holes at your marked locations. This prevents the wood from splitting when screws are inserted.",
        safetyWarning: "Always wear safety glasses when drilling",
        adultSupervisionRequired: true
      },
      {
        id: 5,
        projectId: 3,
        stepNumber: 5,
        title: "Assemble the Frame",
        description: "Connect the side panels to the back panel first, then attach the shelves at your marked locations. Work slowly and check that everything is square.",
        safetyWarning: "Handle screws carefully to avoid cuts",
        adultSupervisionRequired: true
      },
      {
        id: 6,
        projectId: 3,
        stepNumber: 6,
        title: "Apply Wood Stain",
        description: "Using a brush or cloth, apply wood stain in long, even strokes following the wood grain. Work on one section at a time for best results.",
        safetyWarning: "Use proper ventilation and wear gloves when applying stain",
        adultSupervisionRequired: true
      },
      {
        id: 7,
        projectId: 3,
        stepNumber: 7,
        title: "Final Inspection",
        description: "Once dry, inspect your plant stand for stability and finish quality. Add decorative plants and enjoy your beautiful creation together!",
        safetyWarning: null,
        adultSupervisionRequired: false
      }
    ];

    // Add sample instructions for the Simple Bookshelf project (renamed)
    const simpleStoolInstructions: Instruction[] = [
      {
        id: 8,
        projectId: 1,
        stepNumber: 1,
        title: "Organize Materials",
        description: "Arrange all wood planks, screws, and tools on your workspace. Check that all pieces match the materials list.",
        safetyWarning: null,
        adultSupervisionRequired: false
      },
      {
        id: 9,
        projectId: 1,
        stepNumber: 2,
        title: "Sand All Pieces",
        description: "Smooth all wood surfaces with sandpaper to prevent splinters. Take turns with your building partner to make the work fun!",
        safetyWarning: "Wear dust masks and work in ventilated area",
        adultSupervisionRequired: true
      },
      {
        id: 10,
        projectId: 1,
        stepNumber: 3,
        title: "Mark Connection Points",
        description: "Use a pencil to mark where the legs will connect to the seat. Measure carefully to ensure the stool will be stable.",
        safetyWarning: null,
        adultSupervisionRequired: false
      },
      {
        id: 11,
        projectId: 1,
        stepNumber: 4,
        title: "Pre-drill Holes",
        description: "Have an adult pre-drill holes at marked locations. This prevents wood from cracking when screws are inserted.",
        safetyWarning: "Always wear safety glasses when drilling",
        adultSupervisionRequired: true
      },
      {
        id: 12,
        projectId: 1,
        stepNumber: 5,
        title: "Attach the Legs",
        description: "Apply wood glue to joints, then secure legs to the seat with screws. Work on opposite corners for stability.",
        safetyWarning: "Handle wood glue carefully and ensure good ventilation",
        adultSupervisionRequired: true
      },
      {
        id: 13,
        projectId: 1,
        stepNumber: 6,
        title: "Test Your Stool",
        description: "Let the glue dry completely, then test the stool carefully. Congratulations on building your first piece of furniture together!",
        safetyWarning: null,
        adultSupervisionRequired: false
      }
    ];

    // Add sample instructions for the Toy Storage Chest project
    const toyStorageInstructions: Instruction[] = [
      {
        id: 14,
        projectId: 2,
        stepNumber: 1,
        title: "Plan Your Design",
        description: "Look at the design together and discuss what toys will go inside. This makes the project more exciting for young builders!",
        safetyWarning: null,
        adultSupervisionRequired: false
      },
      {
        id: 15,
        projectId: 2,
        stepNumber: 2,
        title: "Cut Plywood Pieces",
        description: "Have an adult cut all plywood pieces to size. Sand the cut edges smooth to prevent splinters during assembly.",
        safetyWarning: "All power tool use requires adult operation only",
        adultSupervisionRequired: true
      },
      {
        id: 16,
        projectId: 2,
        stepNumber: 3,
        title: "Create the Base",
        description: "Join the bottom panel with the side panels. Use wood glue at joints and secure with screws for extra strength.",
        safetyWarning: "Handle wood glue carefully and have good ventilation",
        adultSupervisionRequired: true
      },
      {
        id: 17,
        projectId: 2,
        stepNumber: 4,
        title: "Add the Back Panel",
        description: "Attach the back panel to complete the box structure. Check that all corners are square using a carpenter's square.",
        safetyWarning: null,
        adultSupervisionRequired: true
      },
      {
        id: 18,
        projectId: 2,
        stepNumber: 5,
        title: "Install Lid Hinges",
        description: "Mark hinge positions on both the lid and the back edge of the chest. Install hinges with screws, ensuring smooth operation.",
        safetyWarning: "Small screws can be sharp - handle with care",
        adultSupervisionRequired: true
      },
      {
        id: 19,
        projectId: 2,
        stepNumber: 6,
        title: "Sand and Finish",
        description: "Sand all surfaces smooth, then apply your chosen finish. Let your child help with light sanding using fine-grit paper.",
        safetyWarning: "Always sand in the direction of the wood grain",
        adultSupervisionRequired: true
      },
      {
        id: 20,
        projectId: 2,
        stepNumber: 7,
        title: "Final Assembly",
        description: "Install the lid, test the hinges, and add any decorative elements you've chosen together. Fill with toys and celebrate your teamwork!",
        safetyWarning: null,
        adultSupervisionRequired: false
      }
    ];

    // Store instructions in memory
    gardenPlantStandInstructions.forEach(instruction => {
      this.instructions.set(instruction.id, instruction);
    });
    
    simpleStoolInstructions.forEach(instruction => {
      this.instructions.set(instruction.id, instruction);
    });
    
    toyStorageInstructions.forEach(instruction => {
      this.instructions.set(instruction.id, instruction);
    });

    // Create sample highly-rated projects for demonstration
    const sampleProjects = [
      {
        id: 1,
        userId: null,
        title: "Simple Wooden Stool",
        description: "Perfect first project for little builders",
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzFfMSkiPjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRkZGRkZGIi8+PHJlY3QgeD0iNTAiIHk9IjEyMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0Q2OTc0QyIvPjxyZWN0IHg9IjcwIiB5PSI2MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOUY2MjMzIi8+PHJlY3QgeD0iMTQ1IiB5PSI2MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOUY2MjMzIi8+PHJlY3QgeD0iMjIwIiB5PSI2MCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjOUY2MjMzIi8+PC9nPjxkZWZzPjxjbGlwUGF0aCBpZD0iY2xpcDBfMV8xIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0id2hpdGUiLz48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=",
        category: "furniture",
        difficulty: "Easy",
        estimatedTime: 45,
        estimatedCost: "25",
        materials: [
          { name: "Wood planks", quantity: "4 pieces", estimatedCost: 15, affiliateLink: "https://amazon.com/dp/wood-planks" },
          { name: "Wood screws", quantity: "8 pieces", estimatedCost: 5, affiliateLink: "https://homedepot.com/screws" },
          { name: "Wood glue", quantity: "1 bottle", estimatedCost: 5, affiliateLink: "https://amazon.com/dp/wood-glue" }
        ],
        tools: ["drill", "screwdriver", "measuring tape", "sandpaper"],
        safetyNotes: "Always wear safety glasses when drilling",
        averageRating: "4.8",
        totalRatings: 127,
        ratingPercentage: 96,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        userId: null,
        title: "Kids' Toy Storage Box",
        description: "Organize toys while learning to build",
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSI1MCIgeT0iNzAiIHdpZHRoPSIyMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjRkZDOTY2IiBzdHJva2U9IiNEQjkyMjkiIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjYwIiB5PSI4MCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iI0ZGRURCQSIvPjxjaXJjbGUgY3g9IjIzMCIgY3k9IjExMCIgcj0iNSIgZmlsbD0iI0NCNzkzNiIvPjx0ZXh0IHg9IjE1MCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjY2NjYiPlRPWVM8L3RleHQ+PC9zdmc+",
        category: "storage",
        difficulty: "Medium",
        estimatedTime: 90,
        estimatedCost: "35",
        materials: [
          { name: "Plywood board", quantity: "1 sheet", estimatedCost: 20, affiliateLink: "https://homedepot.com/plywood" },
          { name: "Hinges", quantity: "2 pieces", estimatedCost: 8, affiliateLink: "https://amazon.com/dp/hinges" },
          { name: "Handle", quantity: "1 piece", estimatedCost: 7, affiliateLink: "https://homedepot.com/handles" }
        ],
        tools: ["jigsaw", "drill", "ruler", "pencil", "sandpaper"],
        safetyNotes: "Adult supervision required for power tool use",
        averageRating: "4.7",
        totalRatings: 89,
        ratingPercentage: 94,
        createdAt: new Date("2024-01-20"),
      },
      {
        id: 3,
        userId: null,
        title: "Garden Plant Stand",
        description: "Build a beautiful stand for your plants",
        imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNGMEY4RkYiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI2MCIgcj0iNDAiIGZpbGw9IiM2NkJCNkEiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSI2MCIgcj0iMzAiIGZpbGw9IiM0Qjk0NDYiLz48cmVjdCB4PSIxMDAiIHk9IjE0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0Q2OTc0QyIvPjxyZWN0IHg9IjEyMCIgeT0iMTAwIiB3aWR0aD0iNjAiIGhlaWdodD0iNDAiIGZpbGw9IiNBMDczM0EiLz48cmVjdCB4PSIxNDUiIHk9IjEwMCIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjOEU2NjMyIi8+PC9zdmc+",
        category: "furniture",
        difficulty: "Easy",
        estimatedTime: 60,
        estimatedCost: "18",
        materials: [
          { name: "Cedar wood", quantity: "3 pieces", estimatedCost: 12, affiliateLink: "https://amazon.com/dp/cedar-wood" },
          { name: "Wood stain", quantity: "1 bottle", estimatedCost: 6, affiliateLink: "https://homedepot.com/wood-stain" }
        ],
        tools: ["hand saw", "drill", "brush", "measuring tape"],
        safetyNotes: "Use proper ventilation when applying stain",
        averageRating: "4.9",
        totalRatings: 156,
        ratingPercentage: 98,
        createdAt: new Date("2024-01-10"),
      }
    ];

    // Add sample projects to storage
    sampleProjects.forEach(project => {
      this.projects.set(project.id, project);
      this.currentProjectId = Math.max(this.currentProjectId, project.id + 1);
    });
  }

  // User methods
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      email: insertUser.email || null,
      buildsUsed: insertUser.buildsUsed || 0,
      easyBuildsUsed: insertUser.easyBuildsUsed || 0,
      maxBuilds: insertUser.maxBuilds || 3,
      maxEasyBuilds: insertUser.maxEasyBuilds || 3,
      isPremium: insertUser.isPremium || false,
      premiumExpiresAt: insertUser.premiumExpiresAt || null,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async updateUser(id: number, updates: Partial<InsertUser>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser: User = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async incrementUserBuilds(userId: number, difficulty: string): Promise<void> {
    const user = this.users.get(userId);
    if (user) {
      user.buildsUsed = (user.buildsUsed || 0) + 1;
      if (difficulty.toLowerCase() === 'easy') {
        user.easyBuildsUsed = (user.easyBuildsUsed || 0) + 1;
      }
      this.users.set(userId, user);
    }
  }

  async canUserBuild(userId: number, difficulty: string): Promise<boolean> {
    const user = this.users.get(userId);
    if (!user) return false;
    
    if (user.isPremium) {
      // Premium users: unlimited easy builds, 10 total builds
      return user.buildsUsed < 10;
    } else {
      // Free users: only 3 easy builds
      if (difficulty.toLowerCase() === 'easy') {
        return user.easyBuildsUsed < user.maxEasyBuilds;
      } else {
        return false; // Free users can't build medium/hard
      }
    }
  }

  // Project methods
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const project: Project = {
      userId: insertProject.userId || null,
      title: insertProject.title,
      description: insertProject.description || null,
      imageUrl: insertProject.imageUrl,
      category: insertProject.category,
      difficulty: insertProject.difficulty,
      estimatedTime: insertProject.estimatedTime,
      estimatedCost: insertProject.estimatedCost || null,
      materials: insertProject.materials as any,
      tools: insertProject.tools as any,
      safetyNotes: insertProject.safetyNotes || null,
      averageRating: insertProject.averageRating || "0",
      totalRatings: insertProject.totalRatings || 0,
      ratingPercentage: insertProject.ratingPercentage || 0,
      id,
      createdAt: new Date(),
    };
    this.projects.set(id, project);
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getProjectsByUser(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => project.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async updateProjectRating(projectId: number, newRating: number): Promise<void> {
    const project = this.projects.get(projectId);
    if (!project) return;

    // Calculate new average
    const currentTotal = parseFloat(project.averageRating?.toString() || "0") * (project.totalRatings || 0);
    const newTotal = currentTotal + newRating;
    const newCount = (project.totalRatings || 0) + 1;
    const newAverage = newTotal / newCount;
    
    // Update project
    project.averageRating = newAverage.toFixed(2);
    project.totalRatings = newCount;
    project.ratingPercentage = Math.round((newAverage / 5) * 100);
    
    this.projects.set(projectId, project);
  }

  async getTopRatedProjects(limit: number = 10): Promise<Project[]> {
    return Array.from(this.projects.values())
      .filter(project => (project.totalRatings || 0) >= 3) // At least 3 ratings
      .sort((a, b) => {
        const ratingA = parseFloat(a.averageRating?.toString() || "0");
        const ratingB = parseFloat(b.averageRating?.toString() || "0");
        if (ratingA !== ratingB) {
          return ratingB - ratingA; // Higher rating first
        }
        return (b.totalRatings || 0) - (a.totalRatings || 0); // More ratings first
      })
      .slice(0, limit);
  }

  async createInstruction(insertInstruction: InsertInstruction): Promise<Instruction> {
    const id = this.currentInstructionId++;
    const instruction: Instruction = {
      projectId: insertInstruction.projectId,
      stepNumber: insertInstruction.stepNumber,
      title: insertInstruction.title,
      description: insertInstruction.description,
      imageUrl: insertInstruction.imageUrl || null,
      safetyWarning: insertInstruction.safetyWarning || null,
      adultSupervision: insertInstruction.adultSupervision || null,
      id,
    };
    this.instructions.set(id, instruction);
    return instruction;
  }

  async getInstructionsByProject(projectId: number): Promise<Instruction[]> {
    return Array.from(this.instructions.values())
      .filter(instruction => instruction.projectId === projectId)
      .sort((a, b) => a.stepNumber - b.stepNumber);
  }

  async deleteInstructionsByProject(projectId: number): Promise<void> {
    const instructionsToDelete = Array.from(this.instructions.values())
      .filter(instruction => instruction.projectId === projectId);
    
    instructionsToDelete.forEach(instruction => {
      this.instructions.delete(instruction.id);
    });
  }

  // Feedback methods
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const id = this.currentFeedbackId++;
    const feedback: Feedback = {
      projectId: insertFeedback.projectId ?? null,
      userId: insertFeedback.userId || null,
      rating: insertFeedback.rating,
      isHelpful: insertFeedback.isHelpful || null,
      comments: insertFeedback.comments || null,
      pagePath: (insertFeedback as any).pagePath ?? null,
      stepNumber: (insertFeedback as any).stepNumber ?? null,
      context: (insertFeedback as any).context ?? null,
      id,
      createdAt: new Date(),
    };
    this.feedback.set(id, feedback);
    return feedback;
  }

  async getFeedbackByProject(projectId: number): Promise<Feedback[]> {
    return Array.from(this.feedback.values())
      .filter(feedback => feedback.projectId === projectId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Add upsertUser method to MemStorage for compatibility with Replit Auth
export class MemStorageWithAuth extends MemStorage {
  async upsertUser(userData: any): Promise<User> {
    // Try to find existing user by ID
    const existingUser = Array.from(this.users.values()).find(u => u.id?.toString() === userData.id);
    if (existingUser) {
      const updatedUser = { ...existingUser, ...userData };
      this.users.set(existingUser.id, updatedUser);
      return updatedUser;
    } else {
      // Create new user
      const user: User = {
        id: parseInt(userData.id) || this.currentUserId++,
        email: userData.email || null,
        firstName: userData.firstName || null,
        lastName: userData.lastName || null,
        profileImageUrl: userData.profileImageUrl || null,
        buildsUsed: userData.buildsUsed || 0,
        easyBuildsUsed: userData.easyBuildsUsed || 0,
        maxBuilds: userData.maxBuilds || 10,
        maxEasyBuilds: userData.maxEasyBuilds || 3,
        isPremium: userData.isPremium || false,
        premiumExpiresAt: userData.premiumExpiresAt || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.users.set(user.id, user);
      return user;
    }
  }

  // Update getUser to handle string IDs from Replit Auth
  async getUser(id: number | string): Promise<User | undefined> {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    return this.users.get(numericId) || Array.from(this.users.values()).find(u => u.id?.toString() === id.toString());
  }

  // Update other methods to handle both string and number IDs
  async updateUser(id: number | string, updates: Partial<InsertUser>): Promise<User> {
    const user = await this.getUser(id);
    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser: User = { ...user, ...updates, updatedAt: new Date() };
    this.users.set(user.id, updatedUser);
    return updatedUser;
  }

  async incrementUserBuilds(userId: number | string, difficulty: string): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      user.buildsUsed = (user.buildsUsed || 0) + 1;
      if (difficulty.toLowerCase() === 'easy') {
        user.easyBuildsUsed = (user.easyBuildsUsed || 0) + 1;
      }
      user.updatedAt = new Date();
      this.users.set(user.id, user);
    }
  }

  async upgradeToPremium(userId: number | string): Promise<void> {
    const id = typeof userId === 'string' ? userId : userId.toString();
    const user = this.users.get(id);
    if (user) {
      user.isPremium = true;
      user.maxBuilds = 999;
      user.premiumExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
  }


  async canUserBuild(userId: number | string, difficulty: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;

    if (user.isPremium) {
      return (user.buildsUsed || 0) < (user.maxBuilds || 10);
    } else {
      if (difficulty.toLowerCase() !== 'easy') {
        return false;
      }
      return (user.easyBuildsUsed || 0) < (user.maxEasyBuilds || 3);
    }
  }
}

// Import database storage
import { DatabaseStorage } from "./databaseStorage";
export const storage = new DatabaseStorage();
