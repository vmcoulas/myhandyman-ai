import {
  users,
  projects,
  instructions,
  feedback,
  type User,
  type UpsertUser,
  type InsertUser,
  type Project,
  type InsertProject,
  type Instruction,
  type InsertInstruction,
  type Feedback,
  type InsertFeedback
} from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (mandatory for Replit Auth)
  createUser(userData: InsertUser): Promise<User>;
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: string, updates: Partial<InsertUser>): Promise<User>;
  incrementUserBuilds(userId: string, difficulty: string): Promise<void>;
  upgradeToPremium(userId: string): Promise<void>;
  canUserBuild(userId: string, difficulty: string): Promise<boolean>;
  
  // Project methods
  createProject(project: InsertProject): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByUser(userId: string): Promise<Project[]>;
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

export class DatabaseStorage implements IStorage {
  // User operations (mandatory for Replit Auth)

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(userData).returning();
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async updateUser(id: string, updates: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async incrementUserBuilds(userId: string, difficulty: string): Promise<void> {
    const user = await this.getUser(userId);
    if (user) {
      const buildsUsed = (user.buildsUsed || 0) + 1;
      const easyBuildsUsed = difficulty.toLowerCase() === 'easy' 
        ? (user.easyBuildsUsed || 0) + 1 
        : user.easyBuildsUsed || 0;

      await db
        .update(users)
        .set({ 
          buildsUsed, 
          easyBuildsUsed,
          updatedAt: new Date()
        })
        .where(eq(users.id, userId));
    }
  }

  async canUserBuild(userId: string, difficulty: string): Promise<boolean> {
    // TODO: Re-enable build limits after testing
    return true;
  }

  // Project methods
  async createProject(projectData: InsertProject): Promise<Project> {
    const [project] = await db
      .insert(projects)
      .values(projectData)
      .returning();
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(projects.createdAt);
  }

  async getProjectsByUser(userId: string): Promise<Project[]> {
    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(projects.createdAt);
  }

  async updateProjectRating(projectId: number, newRating: number): Promise<void> {
    const project = await this.getProject(projectId);
    if (!project) return;

    // Calculate new average
    const currentTotal = parseFloat(project.averageRating?.toString() || "0") * (project.totalRatings || 0);
    const newTotal = currentTotal + newRating;
    const newCount = (project.totalRatings || 0) + 1;
    const newAverage = newTotal / newCount;
    
    // Update project
    await db
      .update(projects)
      .set({
        averageRating: newAverage.toFixed(2),
        totalRatings: newCount,
        ratingPercentage: Math.round((newAverage / 5) * 100),
      })
      .where(eq(projects.id, projectId));
  }

  async getTopRatedProjects(limit: number = 10): Promise<Project[]> {
    // For now, return all projects ordered by rating since we need a more complex query
    const allProjects = await this.getAllProjects();
    return allProjects
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

  // Instruction methods
  async createInstruction(instructionData: InsertInstruction): Promise<Instruction> {
    const [instruction] = await db
      .insert(instructions)
      .values(instructionData)
      .returning();
    return instruction;
  }

  async getInstructionsByProject(projectId: number): Promise<Instruction[]> {
    return await db
      .select()
      .from(instructions)
      .where(eq(instructions.projectId, projectId))
      .orderBy(instructions.stepNumber);
  }

  async deleteInstructionsByProject(projectId: number): Promise<void> {
    await db
      .delete(instructions)
      .where(eq(instructions.projectId, projectId));
  }

  // Feedback methods
  async createFeedback(feedbackData: InsertFeedback): Promise<Feedback> {
    const [created] = await db
      .insert(feedback)
      .values(feedbackData)
      .returning();
    return created;
  }

  async getFeedbackByProject(projectId: number): Promise<Feedback[]> {
    return await db
      .select()
      .from(feedback)
      .where(eq(feedback.projectId, projectId))
      .orderBy(feedback.createdAt);
  }

  async upgradeToPremium(userId: string): Promise<void> {
    await db.update(users).set({
      isPremium: true,
      maxBuilds: 999,
      premiumExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
    }).where(eq(users.id, userId));
  }

}