import { IdeaItem, Prd } from "./types";

function inferAudience(title: string, summary: string): string[] {
  const text = `${title} ${summary}`.toLowerCase();
  const audiences: string[] = [];
  if (text.includes("developer") || text.includes("sql") || text.includes("api")) audiences.push("Developers");
  if (text.includes("product") || text.includes("pm")) audiences.push("Product Managers");
  if (text.includes("data") || text.includes("analytics") || text.includes("bi")) audiences.push("Data Teams");
  if (audiences.length === 0) audiences.push("Early adopters in target niche");
  return audiences;
}

function deriveFeatures(title: string, summary: string): { name: string; description: string }[] {
  const list: { name: string; description: string }[] = [];
  const text = `${title}. ${summary}`;

  list.push({ name: "Onboarding & Setup", description: "Guided setup with sample data and templates." });

  if (/sql|database|schema|data/i.test(text)) {
    list.push(
      { name: "Schema Introspection", description: "Connect to DBs and auto-detect tables, PK/FK, and relationships." },
      { name: "Query Insights", description: "Analyze queries for performance and safety." }
    );
  }
  if (/ai|ml|copilot|assistant/i.test(text)) {
    list.push(
      { name: "AI Assistant", description: "Natural-language commands to generate artifacts and actions." },
      { name: "Prompt Library", description: "Reusable prompts tailored to your data and domain." }
    );
  }
  list.push({ name: "Export & Sharing", description: "Export PRDs/outputs to Markdown, Notion, and PDF." });
  return list;
}

export function generatePrd(idea: IdeaItem): Prd {
  const audience = inferAudience(idea.title, idea.summary);
  const features = deriveFeatures(idea.title, idea.summary);

  return {
    title: idea.title,
    problem: `Users lack an efficient way to execute "${idea.title}". Current alternatives are manual, error-prone, and slow.`,
    audience,
    goals: [
      "Deliver a usable MVP in 4 weeks",
      "Achieve first 20 qualified leads",
      "Demonstrate core value with 3 key features",
    ],
    nonGoals: [
      "Enterprise SSO and complex RBAC",
      "On-prem provisioning",
      "Custom SLAs",
    ],
    features,
    metrics: [
      "Signup-to-activation rate",
      "Time-to-first-value (TTFV)",
      "Weekly active users",
      "CTA conversions per landing page",
    ],
    risks: [
      "Scraping source content may change structure",
      "Over-reliance on LLM-like heuristics for generation",
      "Performance variance on large inputs",
    ],
    launchChecklist: [
      "Implement end-to-end flow from idea to PRD",
      "Ship landing page with clear CTA",
      "Add analytics to track conversions",
      "Publish docs and pricing stub",
    ],
    cta: "Join the waitlist for early access",
  };
}
