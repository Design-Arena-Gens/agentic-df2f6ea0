import { fetchIdeas } from "../../lib/scrapeIdeas";
import { slugify } from "../../lib/slugify";
import { generatePrd } from "../../lib/generatePrd";
import PrdView from "../../components/PrdView";
import CtaForm from "../../components/CtaForm";

interface Params { slug: string }

export default async function IdeaLanding({ params }: { params: Params }) {
  const ideas = await fetchIdeas();
  const idea = ideas.find((i) => `${slugify(i.title)}-${i.id}` === params.slug);
  if (!idea) {
    return <div className="text-red-600">Idea not found.</div>;
  }
  const prd = generatePrd(idea);

  return (
    <div className="prose prose-zinc max-w-none">
      <h1>{idea.title}</h1>
      <p className="lead">{idea.summary}</p>

      <div className="not-prose mt-6 rounded-lg border bg-white p-6 shadow-sm">
        <CtaForm ideaTitle={idea.title} />
      </div>

      <div className="mt-10">
        <PrdView prd={prd} />
      </div>
    </div>
  );
}
