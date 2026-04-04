import { pgTable, text, serial, integer, boolean, timestamp, jsonb, decimal, varchar, index, unique } from "drizzle-orm/pg-core";
import { sql } from 'drizzle-orm';
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  buildsUsed: integer("builds_used").default(0).notNull(),
  easyBuildsUsed: integer("easy_builds_used").default(0).notNull(),
  maxBuilds: integer("max_builds").default(10).notNull(), // 10 builds for premium
  maxEasyBuilds: integer("max_easy_builds").default(3).notNull(), // 3 easy builds for free
  isPremium: boolean("is_premium").default(false).notNull(),
  premiumExpiresAt: timestamp("premium_expires_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// OAuth accounts table — links OAuth provider accounts to users
export const oauthAccounts = pgTable(
  "oauth_accounts",
  {
    id: serial("id").primaryKey(),
    userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    provider: varchar("provider").notNull(), // "google" | "apple"
    providerAccountId: varchar("provider_account_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [
    index("oauth_accounts_provider_account_idx").on(t.provider, t.providerAccountId),
    unique("oauth_accounts_provider_unique").on(t.provider, t.providerAccountId),
  ],
);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(), // plumbing, electrical, carpentry, drywall, painting, flooring, hvac, roofing, appliances, other
  difficulty: text("difficulty").notNull(), // easy, medium, hard
  estimatedTime: integer("estimated_time").notNull(), // total time in minutes
  activeTime: integer("active_time"), // hands-on time in minutes (excludes drying/curing)
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  materials: jsonb("materials").$type<{ name: string; quantity: string; estimatedCost: number; affiliateLink?: string }[]>().notNull(),
  tools: jsonb("tools").$type<string[]>().notNull(),
  safetyNotes: text("safety_notes"),
  safetyLevel: text("safety_level"), // DIY-friendly, Advanced repair, Professional required
  safetyWarningProject: text("safety_warning_project"),
  confidence: text("confidence"), // high, medium, low — AI diagnosis confidence
  confidenceReason: text("confidence_reason"), // Why confidence is at this level
  // Rating system
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }).default("0"),
  totalRatings: integer("total_ratings").default(0),
  ratingPercentage: integer("rating_percentage").default(0), // 0-100 based on average rating
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const instructions = pgTable("instructions", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").references(() => projects.id).notNull(),
  stepNumber: integer("step_number").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  safetyWarning: text("safety_warning"),
  adultSupervision: boolean("adult_supervision").default(false),
});

export const feedback = pgTable("feedback", {
  id: serial("id").primaryKey(),
  // projectId is optional to allow general app feedback (not tied to a specific project)
  projectId: integer("project_id").references(() => projects.id),
  userId: varchar("user_id").references(() => users.id),
  rating: integer("rating").notNull(), // 1-5 stars
  isHelpful: boolean("is_helpful"),
  comments: text("comments"),
  pagePath: text("page_path"),
  stepNumber: integer("step_number"),
  context: jsonb("context"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertInstructionSchema = createInsertSchema(instructions).omit({
  id: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type UpsertUser = typeof users.$inferInsert;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Instruction = typeof instructions.$inferSelect;
export type InsertInstruction = z.infer<typeof insertInstructionSchema>;
export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type OAuthAccount = typeof oauthAccounts.$inferSelect;
export type InsertOAuthAccount = typeof oauthAccounts.$inferInsert;
