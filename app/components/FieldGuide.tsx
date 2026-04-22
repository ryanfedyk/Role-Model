"use client";

import { FieldGuideOutput } from "../store/useRoleStore";

const accent = "#b85228";
const fg = "#1a1208";
const muted = "#7a6a50";
const card = "#ece6da";
const border = "rgba(0,0,0,0.09)";
const mono = "var(--font-mono), 'JetBrains Mono', monospace";
const serif = "var(--font-serif), 'DM Serif Display', serif";

function BeatTag({ children, color, bg }: { children: string; color: string; bg: string }) {
  return (
    <span style={{
      display: "inline-block",
      fontSize: 8,
      fontFamily: mono,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      padding: "2px 7px",
      borderRadius: 3,
      marginBottom: 8,
      background: bg,
      color,
    }}>
      {children}
    </span>
  );
}

function BodyText({ children, style }: { children: string; style?: React.CSSProperties }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.9, color: fg, marginBottom: 28, textWrap: "pretty" as never, ...style }}>
      {children}
    </p>
  );
}

interface Props {
  output: FieldGuideOutput;
}

export default function FieldGuide({ output }: Props) {
  return (
    <div style={{ flex: 1, overflow: "auto", padding: "40px 40px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Beat legend */}
        <div style={{
          display: "flex",
          gap: 14,
          flexWrap: "wrap",
          marginBottom: 28,
          padding: "12px 16px",
          background: card,
          borderRadius: 8,
          alignItems: "center",
        }}>
          <p style={{ fontSize: 9, fontFamily: mono, color: muted, textTransform: "uppercase", letterSpacing: "0.08em", marginRight: 4 }}>
            Narrative beats:
          </p>
          {[
            { label: "Portrait", color: "rgba(184,82,40,0.4)" },
            { label: "Day-in-the-Life", color: "rgba(59,130,246,0.4)" },
            { label: "Collaboration", color: "rgba(16,185,129,0.4)" },
            { label: "Career Arc", color: "rgba(139,92,246,0.4)" },
            { label: "Future-Proof", color: "rgba(245,158,11,0.4)" },
          ].map((b) => (
            <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: muted, fontFamily: mono }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: b.color }} />
              {b.label}
            </div>
          ))}
        </div>

        {/* Header */}
        <p style={{ fontSize: 9, fontFamily: mono, color: accent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 10 }}>
          {output.eyebrow}
        </p>
        <h1 style={{ fontFamily: serif, fontSize: 40, fontWeight: 400, lineHeight: 1.15, marginBottom: 10, color: fg }}>
          {output.headline}
        </h1>
        <p style={{ fontSize: 14, color: muted, fontStyle: "italic" }}>{output.roleTitle}</p>
        <hr style={{ border: "none", borderTop: `1px solid ${border}`, margin: "28px 0" }} />

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 258px", gap: 48 }}>

          {/* Left column */}
          <div>
            {/* Portrait */}
            <BeatTag color={accent} bg="rgba(184,82,40,0.1)">Portrait</BeatTag>
            {output.portrait.map((p, i) => (
              <BodyText key={i}>{p}</BodyText>
            ))}

            {/* Day in the Life */}
            <BeatTag color="#2563eb" bg="rgba(59,130,246,0.1)">Day in the Life</BeatTag>
            <div style={{ position: "relative", paddingLeft: 24, marginBottom: 28 }}>
              {/* Vertical timeline line */}
              <div style={{
                position: "absolute",
                left: 5,
                top: 8,
                bottom: 8,
                width: 1,
                background: "rgba(184,82,40,0.25)",
              }} />
              {output.dayInLife.map((scene, i) => (
                <div key={i} style={{ position: "relative", marginBottom: i < output.dayInLife.length - 1 ? 22 : 0 }}>
                  {/* Dot */}
                  <div style={{
                    position: "absolute",
                    left: -24,
                    top: 6,
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: accent,
                    border: "2px solid #f4efe5",
                    boxShadow: `0 0 0 1px ${accent}`,
                  }} />
                  <p style={{ fontSize: 9, fontFamily: mono, color: accent, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>
                    {scene.time}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: fg, marginBottom: 4 }}>
                    {scene.title}
                  </p>
                  <p style={{ fontSize: 13, lineHeight: 1.8, color: muted, textWrap: "pretty" as never }}>
                    {scene.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Collaboration */}
            <BeatTag color="#059669" bg="rgba(16,185,129,0.1)">Collaboration</BeatTag>
            <p style={{ fontSize: 14, lineHeight: 1.85, color: fg, marginBottom: 20, textWrap: "pretty" as never }}>
              {output.collabOverview}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 28 }}>
              {output.collabCards.map((card_item) => (
                <div key={card_item.team} style={{
                  padding: "14px 16px",
                  background: card,
                  borderRadius: 8,
                  borderLeft: `3px solid ${accent}`,
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: fg, marginBottom: 4, letterSpacing: "0.01em" }}>
                    {card_item.team}
                  </p>
                  <p style={{ fontSize: 12, lineHeight: 1.65, color: muted }}>
                    {card_item.rel}
                  </p>
                </div>
              ))}
            </div>

            {/* Pull quote */}
            <div style={{ borderLeft: `3px solid ${accent}`, paddingLeft: 20, marginBottom: 28 }}>
              <p style={{ fontFamily: serif, fontSize: 22, fontStyle: "italic", lineHeight: 1.5, color: fg }}>
                "{output.pullQuote}"
              </p>
            </div>

            <BodyText>{output.bodyClose}</BodyText>
          </div>

          {/* Sidebar */}
          <div style={{ borderLeft: `1px solid ${border}`, paddingLeft: 28 }}>

            {/* Career Arc */}
            <div style={{ marginBottom: 28 }}>
              <BeatTag color="#7c3aed" bg="rgba(139,92,246,0.1)">Career Arc</BeatTag>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {[
                  { key: "entry" as const, badge: "Entry", badgeColor: accent, badgeBg: "rgba(184,82,40,0.1)" },
                  { key: "senior" as const, badge: "Senior", badgeColor: "#7c3aed", badgeBg: "rgba(139,92,246,0.12)" },
                  { key: "exec" as const, badge: "Executive", badgeColor: "#047857", badgeBg: "rgba(16,185,129,0.1)" },
                ].map((level, i, arr) => (
                  <div key={level.key} style={{
                    padding: "14px 0",
                    borderBottom: i < arr.length - 1 ? `1px solid ${border}` : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 8,
                        fontFamily: mono,
                        textTransform: "uppercase",
                        letterSpacing: "0.1em",
                        padding: "2px 7px",
                        borderRadius: 3,
                        flexShrink: 0,
                        background: level.badgeBg,
                        color: level.badgeColor,
                      }}>
                        {level.badge}
                      </span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: fg }}>
                        {output.careerArc[level.key].title}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, lineHeight: 1.75, color: muted, textWrap: "pretty" as never }}>
                      {output.careerArc[level.key].desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future-Proof callout */}
            <div style={{ background: card, borderRadius: 8, padding: 16 }}>
              <BeatTag color="#d97706" bg="rgba(245,158,11,0.1)">Future-Proof?</BeatTag>
              <p style={{ fontSize: 12, lineHeight: 1.8, color: muted, textWrap: "pretty" as never }}>
                {output.futureProof}
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
