"use client";
import { useState } from "react";

export default function CtaForm({ ideaTitle }: { ideaTitle: string }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, name, ideaTitle }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setEmail("");
      setName("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <h3 className="text-xl font-semibold">{`Get updates for: ${ideaTitle}`}</h3>
      <p className="text-sm text-zinc-600">Join the waitlist. We?ll email you when it?s ready.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="rounded border px-3 py-2"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="you@company.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="mt-1 inline-flex items-center justify-center rounded bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting?" : "Join Waitlist"}
      </button>
      {status === "success" && <div className="text-green-700">Thanks! You?re on the list.</div>}
      {status === "error" && <div className="text-red-700">Something went wrong. Try again.</div>}
    </form>
  );
}
