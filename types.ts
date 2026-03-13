
export interface CompanyProfile {
  name: string;
  description: string;
  goals: string;
  apiKey?: string;
}

export interface UserInput {
  department: string;
  role: string;
}

export interface AIPoint {
  title: string;
  description: string;
  tools: string[];
  implementation: string;
}

export interface SupermanPlan {
  role: string;
  department: string;
  summary: string;
  points: {
    thinking: AIPoint;
    resources: AIPoint;
    assistant: AIPoint;
    accumulation: AIPoint;
    management: AIPoint;
  };
  // 新增：AI 进阶建议，用于实现数十倍提效的 Brainstorming
  extraInsights: {
    title: string;
    content: string;
    impact: string; // 预估提升倍数
  }[];
}

export enum AppTab {
  USER = 'user',
  ADMIN = 'admin'
}
