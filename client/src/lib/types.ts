export interface User {
  id: number;
  email: string | null;
  buildsUsed: number;
  easyBuildsUsed: number;
  maxBuilds: number;
  maxEasyBuilds: number;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
  createdAt: Date;
}

export interface Project {
  id: number;
  userId: number | null;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string;
  difficulty: string;
  estimatedTime: number;
  estimatedCost: string | null;
  materials: {
    name: string;
    quantity: string;
    estimatedCost: number;
    affiliateLink?: string;
  }[];
  tools: string[];
  safetyNotes: string | null;
  averageRating: string | null;
  totalRatings: number | null;
  ratingPercentage: number | null;
  createdAt: Date;
}

export interface Instruction {
  id: number;
  projectId: number;
  stepNumber: number;
  title: string;
  description: string;
  imageUrl: string | null;
  safetyWarning: string | null;
  adultSupervision: boolean | null;
}

export interface Feedback {
  id: number;
  projectId: number | null;
  userId: number | null;
  rating: number;
  isHelpful: boolean | null;
  comments: string | null;
  pagePath?: string | null;
  stepNumber?: number | null;
  context?: any;
  createdAt: Date;
}

export interface ProjectWithInstructions {
  project: Project;
  instructions: Instruction[];
}

export interface UsageInfo {
  buildsUsed: number;
  easyBuildsUsed: number;
  maxBuilds: number;
  maxEasyBuilds: number;
  remainingBuilds: number;
  isPremium: boolean;
  isLimitReached: boolean;
  premiumExpiresAt: Date | null;
}
