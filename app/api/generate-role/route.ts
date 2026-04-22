import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const ERA_CONTEXT: Record<string, { label: string; subtitle: string; aiContext: string }> = {
  "2025": {
    label: "Today",
    subtitle: "AI as power tool",
    aiContext: "AI is a productivity tool — Copilot, Midjourney, GPT. Designers use it to go faster but own all decisions. Teams are roughly the same size.",
  },
  "2027": {
    label: "Near Future",
    subtitle: "Human–AI partnership",
    aiContext: "AI handles most production work. Designers direct agents rather than build manually. Teams are starting to shrink. The role is shifting from maker to editor.",
  },
  "2030": {
    label: "Far Future",
    subtitle: "The orchestration era",
    aiContext: "AI agents handle entire workflows overnight. A team of 4 does what 12 did in 2023. The designer's job is judgment, taste, and quality bar — not production. Specs have been replaced by working prototypes.",
  },
  "2035": {
    label: "Horizon",
    subtitle: "Curatorial intelligence",
    aiContext: "Fully autonomous design pipelines. Humans are in the loop only for strategic direction, ethical review, and brand soul decisions. The role has converged with creative direction and organizational design.",
  },
};

const ARCHETYPE_CONTEXT: Record<string, { label: string; desc: string; aiContext: string }> = {
  maker: {
    label: "The Maker",
    desc: "You build — prototype, code, craft. Making is your north star.",
    aiContext: "Emphasis on craft, prototyping, code-adjacent tools, and production quality. Leans toward hands-on work with AI as a creative collaborator. Output-focused.",
  },
  researcher: {
    label: "The Researcher",
    desc: "You listen — to users, data, patterns. Insight shapes everything.",
    aiContext: "Emphasis on user insight, synthesis, and translating human signals into design direction. Uses AI to run research at scale but applies human judgment to interpretation. Evidence-focused.",
  },
  strategist: {
    label: "The Strategist",
    desc: "You decide — priorities, systems, direction. Vision is your work.",
    aiContext: "Emphasis on systems thinking, stakeholder alignment, and long-range vision. Uses AI outputs as inputs for strategic decisions. Influence-focused.",
  },
};

function buildPrompt(era: string, archetype: string): string {
  const eraCtx = ERA_CONTEXT[era];
  const archCtx = ARCHETYPE_CONTEXT[archetype];

  return `You are a workforce futurist writing an editorial Field Guide entry for a UX Designer in ${era}.

## Context
- Era: ${era} — ${eraCtx.label} (${eraCtx.subtitle})
- ${eraCtx.aiContext}
- Archetype: ${archCtx.label} — ${archCtx.desc}
- ${archCtx.aiContext}

## Your task
Generate a complete field guide entry as a JSON object. Every field must be present. Write in a direct, honest, slightly editorial voice — like a smart magazine that respects its readers. No filler phrases ("in today's fast-paced world", "it's more important than ever"). Use concrete specifics, not abstractions.

Return ONLY valid JSON matching this exact schema:

{
  "eyebrow": "string — e.g. '2030 · The Maker'",
  "headline": "string — a punchy DM Serif Display headline 6–12 words. Name the essential truth of this role in this era. Not a job title, a statement.",
  "roleTitle": "string — a plausible job title + context, e.g. 'Creative Production Lead · AI Systems Studio'",
  "portrait": [
    "string — paragraph 1: who this person is, what makes their judgment essential. 3–5 sentences.",
    "string — paragraph 2: what the job actually is (not the title). The texture of the work. 3–5 sentences."
  ],
  "dayInLife": [
    { "time": "Morning", "title": "string", "text": "string — 3–4 sentences. A specific scene, not a list of tasks." },
    { "time": "Mid-morning", "title": "string", "text": "string — 3–4 sentences." },
    { "time": "Afternoon", "title": "string", "text": "string — 3–4 sentences." }
  ],
  "collabOverview": "string — 2–3 sentences on how the org has changed and what this role's position in it is now.",
  "collabCards": [
    { "team": "Engineering", "rel": "string — 2–3 sentences on the specific working relationship." },
    { "team": "Product", "rel": "string" },
    { "team": "Research", "rel": "string" },
    { "team": "Data & Analytics", "rel": "string" }
  ],
  "pullQuote": "string — the single sentence that names the essential truth of this specific configuration. Memorable, direct, slightly provocative. No quotes in the string.",
  "bodyClose": "string — 2–3 sentences. The honest summary: what the role has gained, what it costs, what the real craft is now.",
  "careerArc": {
    "entry": {
      "title": "string — a plausible entry-level job title for this archetype in this era",
      "desc": "string — 2–3 sentences on what entry-level looks like: what you spend time on, what you're learning, what the path forward requires."
    },
    "senior": {
      "title": "string — senior-level job title",
      "desc": "string — 2–3 sentences on ownership, scope, what decisions escalate to you."
    },
    "exec": {
      "title": "string — executive title, e.g. VP of Creative / CDO",
      "desc": "string — 2–3 sentences on organizational design, culture, and the decisions only you can make."
    }
  },
  "futureProof": "string — 4–6 sentences. What parts of this role survive further automation (and why), what parts are quietly at risk. Be honest. Name the specific skills and specific things that will be automated away. Give a rough timeline."
}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { era, archetype } = body;

    if (!era || !archetype) {
      return NextResponse.json({ error: "Missing era or archetype" }, { status: 400 });
    }

    const prompt = buildPrompt(era, archetype);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      system:
        "You are a precise workforce futurist writing editorial field guide content. Always respond with valid JSON only — no markdown fences, no preamble, no explanation. Just the JSON object.",
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response type" }, { status: 500 });
    }

    let parsed;
    try {
      parsed = JSON.parse(content.text.trim());
    } catch {
      // strip any accidental markdown fences
      const cleaned = content.text.replace(/^```json?\n?/, "").replace(/\n?```$/, "").trim();
      parsed = JSON.parse(cleaned);
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("generate-role error:", err);
    return NextResponse.json({ error: "Failed to generate role profile" }, { status: 500 });
  }
}
