import { NextResponse } from "next/server";
import { extractWorkflowData } from "@/lib/extractionRules";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const threadText =
    typeof body === "object" &&
    body !== null &&
    "threadText" in body &&
    typeof (body as { threadText: unknown }).threadText === "string"
      ? (body as { threadText: string }).threadText.trim()
      : "";

  if (!threadText) {
    return NextResponse.json(
      { error: "Provide a non-empty threadText string." },
      { status: 400 },
    );
  }

  const apiKey =
    process.env.OPENAI_API_KEY?.trim() ??
    process.env.NEXT_PUBLIC_OPENAI_API_KEY?.trim() ??
    "";

  try {
    const data = await extractWorkflowData(threadText, apiKey);
    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Extraction failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
