import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

function buildPrompt(
  sliders: Record<string, number>,
  automationDepth: string
): string {
  const depthLabel =
    automationDepth === "autopilot"
      ? "Autopilot Era (human supervises AI fleets)"
      : "Co-Pilot Era (AI assists the human)";

  const automationMultiplier = automationDepth === "autopilot" ? 2.5 : 1.4;

  const leverageScore = Math.round(
    (Object.values(sliders).reduce((a, b) => a + b, 0) / 600) *
      10 *
      automationMultiplier
  );

  return `You are an expert workforce futurist and UX industry analyst. Generate a detailed, grounded role profile for a future UX Designer based on the following competency configuration.

## Competency DNA (0–100 scale)
- Aesthetic Direction & Taste: ${sliders.aestheticDirection}/100
- Systems Architecture: ${sliders.systemsArchitecture}/100
- Agent Orchestration: ${sliders.agentOrchestration}/100
- Ethical & Algorithmic Governance: ${sliders.ethicalGovernance}/100
- Technical Synthesis: ${sliders.technicalSynthesis}/100
- Strategic Storytelling: ${sliders.strategicStorytelling}/100

## Automation Depth
${depthLabel}

## Human Leverage Score
Estimated: ${leverageScore}x (one human replacing ${leverageScore} traditional roles)

---

Generate a complete role profile in **valid Markdown** with these exact sections. Use industry-standard terminology (Design Systems, Tokenization, Inference, Model Evaluation, etc.). Be specific, not generic. Avoid hallucinated jargon.

### 🎯 Role Identity
Give this configuration a punchy archetype title (e.g. "The Design Architect" or "The Curator-Operator"). Follow with exactly 2 sentences: what this person does and why it matters now.

### ☀️ Day in the Life
A chronological schedule from ~9am to ~6pm showing 6–8 time-stamped activities. Each entry should be specific and reflect the competency weights. Higher orchestration scores = more time managing agents. Higher aesthetic scores = more time in creative review. Use format:
**09:00** — [activity]

### 📈 Career Ladder

**Entry Level — [title]**
2–3 sentences on what a junior in this configuration focuses on day-to-day.

**Senior Level — [title]**
2–3 sentences on what senior ownership looks like, what systems or processes they define.

**Executive Level — [title]**
2–3 sentences on strategic scope, liability, and organizational influence.

### 🤝 Collaboration Matrix
Describe how this role works with each of these functions. Be specific about who leads, who supports, and what artifacts are exchanged:
- **AI Product Manager**: ...
- **Agentic Engineer**: ...
- **Data / Analytics**: ...
- **Brand & Marketing**: ...
- **Legal / Compliance**: ...

### 🏆 Ownership Model
Answer these three questions directly:
1. **What does this role have full ownership over?** (list 3–5 things)
2. **What is delegated to AI/agents?** (list 3–5 things)
3. **Are there fewer human collaborators, or is the team expected to do more?** (2–3 sentences)

### ⚡ Human Leverage Score
**${leverageScore}x**
Explain the formula in plain language: given the automation depth (${depthLabel}) and the competency mix, how is one person doing the work of ${leverageScore}? Give 2 concrete examples of leverage in action for this specific configuration.`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sliders, automationDepth } = body;

    if (!sliders || !automationDepth) {
      return NextResponse.json(
        { error: "Missing sliders or automationDepth" },
        { status: 400 }
      );
    }

    const prompt = buildPrompt(sliders, automationDepth);

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2048,
      system:
        "You are a precise workforce futurist. Always respond in clean, well-structured Markdown. Use concrete, industry-specific language. Never use filler phrases like 'in today's fast-paced world'. Be direct and specific.",
      messages: [{ role: "user", content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json(
        { error: "Unexpected response type from AI" },
        { status: 500 }
      );
    }

    const leverageScore = Math.round(
      (Object.values(sliders as Record<string, number>).reduce(
        (a, b) => a + b,
        0
      ) /
        600) *
        10 *
        (automationDepth === "autopilot" ? 2.5 : 1.4)
    );

    return NextResponse.json({
      markdown: content.text,
      leverageScore,
    });
  } catch (err) {
    console.error("generate-role error:", err);
    return NextResponse.json(
      { error: "Failed to generate role profile" },
      { status: 500 }
    );
  }
}
