"use client";

import { useRoleStore, Era, Archetype } from "../store/useRoleStore";

const ERAS: { value: Era; year: string; label: string; sub: string }[] = [
  { value: "2025", year: "2025", label: "Today", sub: "AI as power tool" },
  { value: "2027", year: "2027", label: "Near Future", sub: "Human–AI partnership" },
  { value: "2030", year: "2030", label: "Far Future", sub: "The orchestration era" },
  { value: "2035", year: "2035", label: "Horizon", sub: "Curatorial intelligence" },
];

const ARCHETYPES: { value: Archetype; title: string; desc: string }[] = [
  { value: "maker", title: "The Maker", desc: "You build — prototype, code, craft. Making is your north star." },
  { value: "researcher", title: "The Researcher", desc: "You listen — to users, data, patterns. Insight shapes everything." },
  { value: "strategist", title: "The Strategist", desc: "You decide — priorities, systems, direction. Vision is your work." },
];

interface Props {
  onGenerate: () => void;
}

export default function ConfigStrip({ onGenerate }: Props) {
  const { era, archetype, isGenerating, setEra, setArchetype } = useRoleStore();

  return (
    <div style={{
      borderBottom: "1px solid rgba(0,0,0,0.09)",
      padding: "20px 36px",
      flexShrink: 0,
      background: "#f4efe5",
    }}>
      <p style={{
        fontSize: 9,
        fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "#7a6a50",
        marginBottom: 16,
      }}>
        Role Model · Field Guide · Choose Your Path
      </p>

      <div style={{ display: "flex", gap: 28, alignItems: "flex-end" }}>
        {/* Era selector */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: 9,
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            color: "#7a6a50",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 9,
          }}>
            01 — The Era
          </p>
          <div style={{ display: "flex", gap: 7 }}>
            {ERAS.map((e) => {
              const active = era === e.value;
              return (
                <button
                  key={e.value}
                  onClick={() => setEra(e.value)}
                  style={{
                    flex: 1,
                    padding: "10px 9px",
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    textAlign: "left",
                    background: active ? "#b85228" : "#ece6da",
                    outline: active ? "none" : "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.2s",
                  }}
                >
                  <p style={{ fontSize: 17, fontWeight: 700, lineHeight: 1, marginBottom: 3, color: active ? "#fff" : "#1a1208" }}>
                    {e.year}
                  </p>
                  <p style={{ fontSize: 11, color: active ? "rgba(255,255,255,0.9)" : "#7a6a50" }}>
                    {e.label}
                  </p>
                  <p style={{ fontSize: 10, marginTop: 1, color: active ? "rgba(255,255,255,0.65)" : "#7a6a50" }}>
                    {e.sub}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Archetype selector */}
        <div style={{ flex: 1 }}>
          <p style={{
            fontSize: 9,
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            color: "#7a6a50",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 9,
          }}>
            02 — Your Archetype
          </p>
          <div style={{ display: "flex", gap: 7 }}>
            {ARCHETYPES.map((a) => {
              const active = archetype === a.value;
              return (
                <button
                  key={a.value}
                  onClick={() => setArchetype(a.value)}
                  style={{
                    flex: 1,
                    padding: "10px 12px",
                    border: "none",
                    borderRadius: 7,
                    cursor: "pointer",
                    textAlign: "left",
                    background: active ? "#b85228" : "#ece6da",
                    outline: active ? "none" : "1px solid rgba(0,0,0,0.08)",
                    transition: "all 0.2s",
                  }}
                >
                  <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 4, color: active ? "#fff" : "#1a1208" }}>
                    {a.title}
                  </p>
                  <p style={{ fontSize: 11, lineHeight: 1.5, color: active ? "rgba(255,255,255,0.8)" : "#7a6a50" }}>
                    {a.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate button */}
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          style={{
            padding: "11px 22px",
            border: "none",
            borderRadius: 7,
            background: isGenerating ? "#c8825a" : "#b85228",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "var(--font-space), 'Space Grotesk', sans-serif",
            cursor: isGenerating ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            flexShrink: 0,
            opacity: isGenerating ? 0.75 : 1,
            transition: "opacity 0.2s",
          }}
        >
          {isGenerating ? "Generating…" : "→ Generate"}
        </button>
      </div>
    </div>
  );
}
