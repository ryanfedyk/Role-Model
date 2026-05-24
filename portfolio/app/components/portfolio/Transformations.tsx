"use client";
import { useEffect, useRef, useState } from "react";

const cases = [
  {
    index: "01",
    company: "Google Meet",
    role: "Design Lead & Design Manager",
    title: "Feature Chasing → AI-Focused Differentiators",
    summary:
      "During the pandemic Meet evolved rapidly. After my team brought the world back to the office with hybrid work, I pivoted the broader team toward longer-term vision, product differentiators, and increasing product excellence.",
    impact: [
      "Led team of 10 designers across hybrid & AI pivots",
      "Delivered hybrid work to 242 million users",
      "Launched 7 key features for return-to-office · 89% CSAT",
      "Launched Board 65 & Series One 27 collaboration devices",
      "Led pivot to AI: Generative Backgrounds, AI layouts, real-time speech translation",
    ],
    tags: ["AI", "Hybrid Work", "Design Leadership", "Patents"],
    gradient: "linear-gradient(135deg, rgba(77,124,255,0.12), rgba(168,85,247,0.08))",
    accent: "#4d7cff",
  },
  {
    index: "02",
    company: "Google Jigsaw",
    role: "Design Lead & Design Manager",
    title: "Using Technology to Improve Public Safety",
    summary:
      "At Jigsaw I rebuilt the design team from scratch and redirected its mission around user-centered design. My team developed tools to improve information hygiene, combat misinformation, fight harassment, and end repressive censorship.",
    impact: [
      "Rebuilt design team: recruiting, process, culture, OKRs",
      "Perspective API: ML toxicity detection used by 200+ partners including NYTimes",
      "Co-founded Jigsaw Incubate — company-wide annual hackathon",
      "Grew Outline to give internet access to people under repressive censorship",
      "Developed the Jigsaw Design System",
    ],
    tags: ["Safety Tech", "ML/AI", "Team Building", "Design Systems"],
    gradient: "linear-gradient(135deg, rgba(6,214,160,0.1), rgba(77,124,255,0.06))",
    accent: "#06d6a0",
  },
  {
    index: "03",
    company: "Google Shopping",
    role: "Design Lead",
    title: "Beyond the Prompt — The Implicit AI Interface",
    summary:
      "In 2-3 years predictive, agentic, and generative UIs will replace conversational interfaces for most tasks. I led the strategic vision and design explorations that are defining what that near-term future looks like for commerce.",
    impact: [
      "Agentic Commerce: Universal Commerce Protocol — buy in Gemini/AI Mode end-to-end",
      "Implicit Shopping: predictive journeys, bespoke generated UI responses",
      "Shopping AI Pathways — novel UX pattern for visual LLM-powered browsing (Patent Pending)",
      "Outfit Agent — generative catalog mailer curated by a shopping agent (Patent)",
      "Founded CSUX Vibe Coding Club — 20+ participants, weekly challenges",
    ],
    tags: ["Agentic AI", "Vision", "Patents", "Generative UI"],
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(255,107,53,0.06))",
    accent: "#a855f7",
  },
  {
    index: "04",
    company: "Google Classroom / Apps Education",
    role: "Design Lead & Design Manager",
    title: "Redefining the Future of Education",
    summary:
      "As classrooms went digital, teachers needed more robust tools for planning, grading, and assignment distribution. My team rebuilt Google Classroom to meet those needs and doubled the user base.",
    impact: [
      "Doubled Classroom from 20M to 40M users",
      "Led Classroom redesign across web and mobile (Material 2.0)",
      "Strategic pivot to Higher Ed resulting in Course Kit (new product)",
      "Managed team of 6 through numerous feature and product releases",
    ],
    tags: ["Education Tech", "Product Strategy", "Design Systems"],
    gradient: "linear-gradient(135deg, rgba(255,214,0,0.08), rgba(6,214,160,0.06))",
    accent: "#ffd600",
  },
];

function CaseCard({ c, index }: { c: typeof cases[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * 6, y: -cx * 6 });
  }

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          background: "var(--surface)",
          border: `1px solid ${expanded ? c.accent + "40" : "var(--border)"}`,
          borderRadius: 16,
          padding: "clamp(28px, 3vw, 48px)",
          position: "relative",
          overflow: "hidden",
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.3s ease, border-color 0.3s, box-shadow 0.3s",
          boxShadow: expanded ? `0 0 40px ${c.accent}18` : "none",
        }}
      >
        {/* Background gradient blob */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: c.gradient,
          opacity: expanded ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: "none",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: c.accent,
                  letterSpacing: "0.1em",
                }}>
                  {c.index}
                </span>
                <span style={{
                  padding: "3px 10px",
                  borderRadius: 4,
                  border: `1px solid ${c.accent}30`,
                  background: `${c.accent}10`,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: c.accent,
                  letterSpacing: "0.06em",
                }}>
                  {c.company}
                </span>
              </div>
              <h3 style={{
                fontFamily: "var(--font-space)",
                fontWeight: 700,
                fontSize: "clamp(18px, 2.5vw, 26px)",
                letterSpacing: "-0.02em",
                color: "var(--text)",
                lineHeight: 1.2,
                marginBottom: 6,
              }}>
                {c.title}
              </h3>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}>
                {c.role}
              </p>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              data-cursor
              style={{
                flexShrink: 0,
                width: 40,
                height: 40,
                borderRadius: "50%",
                border: `1px solid ${expanded ? c.accent : "var(--border)"}`,
                background: expanded ? `${c.accent}15` : "transparent",
                color: expanded ? c.accent : "var(--text-muted)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                fontSize: 18,
                fontWeight: 300,
                transform: expanded ? "rotate(45deg)" : "rotate(0)",
              }}
            >
              +
            </button>
          </div>

          <p style={{
            color: "var(--text-muted)",
            fontSize: "clamp(14px, 1.5vw, 16px)",
            lineHeight: 1.7,
            marginTop: 20,
            marginBottom: expanded ? 0 : 0,
          }}>
            {c.summary}
          </p>

          {/* Expandable detail */}
          <div style={{
            maxHeight: expanded ? 600 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s ease",
          }}>
            <div style={{ paddingTop: 28 }}>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                color: c.accent,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}>
                What I did
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {c.impact.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: c.accent, flexShrink: 0, marginTop: 2, fontSize: 14 }}>→</span>
                    <span style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24 }}>
            {c.tags.map((tag) => (
              <span key={tag} style={{
                padding: "4px 10px",
                borderRadius: 4,
                border: "1px solid var(--border)",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--text-dim)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Transformations() {
  return (
    <section
      id="transformations"
      style={{
        padding: "120px clamp(24px, 6vw, 120px)",
        background: "var(--bg)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 80 }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            Case Studies
          </p>
          <h2 style={{
            fontFamily: "var(--font-space)",
            fontWeight: 800,
            fontSize: "clamp(32px, 5vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--text)",
            marginBottom: 20,
          }}>
            These launches come from the<br />
            <span style={{
              background: "linear-gradient(135deg, #4d7cff, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              amazing teams I&apos;ve built, led, and been a part of.
            </span>
          </h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 540 }}>
            Click any card to expand the full story. Every number here represents real people whose work changed product trajectories.
          </p>
        </div>

        {/* Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cases.map((c, i) => (
            <CaseCard key={c.index} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
