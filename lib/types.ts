export interface IdeaItem {
  id: string;
  title: string;
  summary: string;
  url?: string;
}

export interface Prd {
  title: string;
  problem: string;
  audience: string[];
  goals: string[];
  nonGoals: string[];
  features: { name: string; description: string }[];
  metrics: string[];
  risks: string[];
  launchChecklist: string[];
  cta: string;
}
