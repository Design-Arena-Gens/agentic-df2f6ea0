import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Idea Browser PRD Generator",
  description: "Auto-generates PRDs and landing pages from IdeaBrowser ideas",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto max-w-6xl px-6 py-8">
          <header className="flex items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-2 font-semibold text-zinc-900">
              <span className="inline-block h-7 w-7 rounded bg-black text-white grid place-items-center">IB</span>
              <span>IdeaBrowser ? PRD & Landing Pages</span>
            </a>
            <a href="https://agentic-df2f6ea0.vercel.app" className="text-sm text-zinc-500 hover:text-zinc-800">Live</a>
          </header>
          <main className="mt-8">{children}</main>
          <footer className="mt-16 border-t pt-6 text-sm text-zinc-500">Built for automatic PRD generation and CTAs.</footer>
        </div>
      </body>
    </html>
  );
}
