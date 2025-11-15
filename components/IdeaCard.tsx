"use client";
import Link from "next/link";
import type { IdeaItem } from "../lib/types";

export default function IdeaCard({ idea, href }: { idea: IdeaItem; href: string }) {
  return (
    <Link href={href} className="block rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md">
      <h3 className="text-lg font-semibold text-zinc-900">{idea.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-zinc-600">{idea.summary}</p>
      <div className="mt-3 text-xs text-zinc-500">Open landing page ?</div>
    </Link>
  );
}
