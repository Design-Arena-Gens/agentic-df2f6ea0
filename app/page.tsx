import { fetchIdeas } from "../lib/scrapeIdeas";
import { slugify } from "../lib/slugify";
import IdeaCard from "../components/IdeaCard";

export const revalidate = 3600; // refresh ideas hourly

export default async function HomePage() {
  const ideas = await fetchIdeas();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Ideas from IdeaBrowser</h1>
      <p className="mt-2 text-zinc-600">Auto-scraped ideas with generated PRDs and ready-made landing pages.</p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} href={`/${slugify(idea.title)}-${idea.id}`} />
        ))}
      </div>
    </div>
  );
}
