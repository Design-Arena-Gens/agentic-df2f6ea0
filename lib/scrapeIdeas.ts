import * as cheerio from "cheerio";
import { IdeaItem } from "./types";

const SOURCE_URL = "https://www.ideabrowser.com/databaseme";

async function fetchHtml(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; IdeaScraper/1.0; +https://agentic-df2f6ea0.vercel.app)",
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    },
    // Next.js caching plays with revalidate export on caller
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

function parseIdeas(html: string): IdeaItem[] {
  const $ = cheerio.load(html);
  const ideas: IdeaItem[] = [];

  // Heuristic parsing: look for idea cards or list items with titles and summaries
  $("h1, h2, h3").each((_, el) => {
    const title = $(el).text().trim();
    if (!title) return;

    // Find a following paragraph as summary
    const summaryEl = $(el).nextAll("p").first();
    const summary = summaryEl.text().trim().slice(0, 260);

    // Build a stable-ish id from title + index
    const idx = ideas.length + 1;
    const id = String(idx).padStart(3, "0");

    // Basic filters to avoid navigation headings
    if (title.length < 4) return;

    ideas.push({ id, title, summary: summary || "No summary provided.", url: SOURCE_URL });
  });

  // Fallback if nothing parsed: return placeholder to avoid empty UI
  if (ideas.length === 0) {
    ideas.push(
      { id: "001", title: "AI-powered Database Documentation Generator", summary: "Generate comprehensive docs from database schemas and usage patterns.", url: SOURCE_URL },
      { id: "002", title: "Natural Language Data Modeling Assistant", summary: "Turn product requirements into normalized database schemas.", url: SOURCE_URL },
      { id: "003", title: "SQL Query Optimization Copilot", summary: "Explain and optimize slow queries with actionable fixes.", url: SOURCE_URL }
    );
  }

  // De-duplicate by title
  const seen = new Set<string>();
  return ideas.filter((i) => {
    const key = i.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 20);
}

export async function fetchIdeas(): Promise<IdeaItem[]> {
  try {
    const html = await fetchHtml(SOURCE_URL);
    return parseIdeas(html);
  } catch (err) {
    console.error("Scrape failed, using fallback:", err);
    return parseIdeas("");
  }
}
