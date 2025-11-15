import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { email, name, ideaTitle } = body ?? {};

  if (!email || !ideaTitle) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 });
  }

  // In a real app, integrate with a DB or email provider.
  console.log("New lead:", { email, name, ideaTitle, ts: new Date().toISOString() });

  return NextResponse.json({ ok: true });
}
