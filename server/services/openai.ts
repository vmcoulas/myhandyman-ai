import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

export interface FurnitureAnalysis {
  title: string;
  description: string;
  category: "plumbing" | "electrical" | "carpentry" | "drywall" | "painting" | "flooring" | "hvac" | "roofing" | "landscaping" | "appliances" | "other";
  difficulty: "easy" | "medium" | "hard";
  estimatedTime: number;
  estimatedCost: number;
  materials: {
    name: string;
    quantity: string;
    estimatedCost: number;
    affiliateLink?: string;
  }[];
  tools: string[];
  safetyNotes: string;
  steps: {
    stepNumber: number;
    title: string;
    description: string;
    safetyWarning?: string;
    adultSupervision: boolean;
  }[];
}

const SYSTEM_PROMPT = `You are a world-class licensed handyman and home repair instructor teaching a COMPLETE BEGINNER homeowner who has never done repairs before. Analyze photos of home repair problems and create hyper-detailed step-by-step instructions to diagnose and fix them.

CRITICAL RULES FOR INSTRUCTIONS:
- Every step must include EXACT specifications (pipe sizes, screw types, paint coverage, etc.)
- Every step must name the SPECIFIC TOOL to use (not just "tighten" — say "using a basin wrench" or "using a 3/8 inch drill with a #2 Phillips bit")
- Include BEGINNER ALTERNATIVES: "If you don't have a tile saw, most hardware stores offer free tile cutting"
- Include VISUAL CUES: "You'll know it's fixed when..." or "It should look like..." or "No drips after 30 seconds means success"
- Include COMMON MISTAKES: "Don't overtighten — you'll crack the porcelain" or "Always shut off the main water valve first"
- Break complex steps into sub-steps (A, B, C)
- Include prep work: drying time, curing time, number of coats, when to call a pro
- Specify part numbers/types: "Use a 1/2-inch compression fitting" not just "fitting"
- For patching: specify compound type, sand grit sequence, primer requirements
- For assembly/disassembly: specify order of operations and why it matters
- When to call a professional: be honest about tasks that require licensed contractors
- Assume the homeowner has ZERO repair experience — explain everything

Response must be in JSON format with this exact structure:
{
  "safetyLevel": "DIY-friendly | Advanced repair | Professional required",
  "safetyWarning": "string or null — if Professional required or Advanced repair, explain WHY (e.g. involves gas lines, electrical panel, load-bearing wall, mold, permits needed). Null if DIY-friendly.",
  "title": "string (descriptive name of the repair, e.g. 'Fix a Dripping Bathroom Faucet')",
  "description": "string (2-3 sentence description of what the problem is, its likely cause, and what success looks like)",
  "category": "plumbing|electrical|carpentry|drywall|painting|flooring|hvac|roofing|landscaping|appliances|other",
  "difficulty": "easy|medium|hard",
  "estimatedTime": number (in minutes, be realistic including dry/cure time),
  "estimatedCost": number (total estimated cost in USD based on current Home Depot/Lowes pricing),
  "materials": [
    {
      "name": "string (specific part/material with size/model, e.g. 'Moen 1225 Cartridge' not just 'cartridge')",
      "quantity": "string (exact amount, e.g. '1 cartridge' or '1 quart')",
      "estimatedCost": number (realistic cost in USD),
      "affiliateLink": "string (optional)"
    }
  ],
  "tools": ["array of specific tools needed with size/type, e.g. 'Basin wrench' or '5-in-1 painter's tool'"],
  "safetyNotes": "string (comprehensive safety guidelines: shut-offs, PPE, permits required, when to call a pro)",
  "steps": [
    {
      "stepNumber": number,
      "title": "string (clear action title)",
      "description": "string (HYPER-DETAILED instructions. Include exact specs, specific tools, technique tips, visual cues for success, and common mistakes to avoid. Minimum 3-4 sentences per step.)",
      "safetyWarning": "string (optional, specific safety concern for this step)",
      "adultSupervision": boolean (true if electrical, gas, heights, or hazardous materials)
    }
  ]
}`;

export async function analyzeFurnitureImage(base64Image: string): Promise<FurnitureAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this photo and create complete home repair instructions. Identify exactly what the problem is and provide accurate parts, tools, costs, and step-by-step instructions to fix it. Be specific and practical."
            },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${base64Image}` }
            }
          ],
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4000,
    });

    const rawContent = response.choices[0].message.content || "{}";
    console.log("[openai] Raw response length:", rawContent.length);
    
    let result: any;
    try {
      result = JSON.parse(rawContent);
    } catch {
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error("Failed to parse AI response");
      }
    }
    
    if (result.result) result = result.result;
    if (result.analysis) result = result.analysis;
    if (result.project) result = result.project;
    
    if (!result.title || !result.steps || !Array.isArray(result.steps)) {
      throw new Error("Invalid response structure from OpenAI");
    }

    return result as FurnitureAnalysis;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to analyze image. Please try again with a clearer photo.");
  }
}

export async function analyzeFromDescription(description: string): Promise<FurnitureAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `I need to fix this home repair issue: ${description}. Create complete repair instructions with accurate parts, tools, costs, and detailed step-by-step instructions.`
        },
      ],
      response_format: { type: "json_object" },
      max_completion_tokens: 4000,
    });

    const rawContent = response.choices[0].message.content || "{}";
    
    let result: any;
    try {
      result = JSON.parse(rawContent);
    } catch {
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1].trim());
      } else {
        throw new Error("Failed to parse AI response");
      }
    }
    
    if (result.result) result = result.result;
    if (result.analysis) result = result.analysis;
    if (result.project) result = result.project;
    
    if (!result.title || !result.steps || !Array.isArray(result.steps)) {
      throw new Error("Invalid response structure");
    }

    return result as FurnitureAnalysis;
  } catch (error) {
    console.error("OpenAI text analysis error:", error);
    throw new Error("Failed to generate repair plan. Please try again with more detail.");
  }
}
