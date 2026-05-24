"use client";
import { useEffect, useRef, useState } from "react";

const patents = [
  {
    id: "PAT-001",
    title: "Portrait Framing with Background Freeze",
    product: "Google Meet",
    status: "Patented",
    desc: "Larger, more consistent face sizes with natural cropping while maintaining the authenticity of natural backgrounds.",
    color: "#4d7cff",
  },
  {
    id: "PAT-002",
    title: "Reinventing the Self View",
    product: "Google Meet",
    status: "Patented",
    desc: "Quick-access self view which reduces distraction and VC fatigue, optimized for intentional moments of self-looking.",
    color: "#a855f7",
  },
  {
    id: "PAT-003",
    title: "Dynamic Layouts",
    product: "Google Meet",
    status: "Patented",
    desc: "Rebuild Meet's layout logic to support new hybrid technologies which improve equity and reduce VC fatigue.",
    color: "#06d6a0",
  },
  {
    id: "PAT-004",
    title: "Pop-up Rooms",
    product: "Google Meet",
    status: "Patented",
    desc: "A hybrid meeting powered by a spatial arrangement of personal devices that creates a single, more natural meeting experience.",
    color: "#4d7cff",
  },
  {
    id: "PAT-005",
    title: "Vibe Check",
    product: "Google Meet",
    status: "Patent Pending",
    desc: "Using AI to detect non-verbal cues and amplify the colors and visual treatment in each participant's tile.",
    color: "#a855f7",
  },
  {
    id: "PAT-006",
    title: "Shopping AI Pathways",
    product: "Google Shopping",
    status: "Patent Pending",
    desc: "Novel UX pattern that brings LLM power to the product grid, empowering users to visually browse while intuitively refining their search.",
    color: "#06d6a0",
  },
  {
    id: "PAT-007",
    title: "Outfit Agent",
    product: "Google Shopping",
    status: "Patented",
    desc: "A modern take on the catalog mailer curated by a shopping agent to drive re-engagement with contextual, generative media.",
    color: "#ffd600",
  },
];

const launches = [
  { name: "Google Meet Generative Backgrounds", year: "2023", type: "Launched", co: "Google" },
  { name: "Real-time Speech Translation", year: "2025", type: "Launched", co: "Google" },
  { name: "Hybrid Work / Return to Office", year: "2022", type: "Launched", co: "Google" },
  { name: "Board 65 Collaboration Device", year: "2022", type: "Launched", co: "Google" },
  { name: "Series One 27 Device", year: "2022", type: "Launched", co: "Google" },
  { name: "Google Classroom Redesign", year: "2019", type: "Launched", co: "Google" },
  { name: "Perspective API (200+ partners)", year: "2018", type: "Launched", co: "Jigsaw" },
  { name: "Outline VPN / Censorship Tool", year: "2018", type: "Launched", co: "Jigsaw" },
  { name: "Windows Phone 7", year: "2010", type: "Shipped", co: "Microsoft" },
  { name: "Xbox Kinect", year: "2010", type: "Shipped", co: "Microsoft" },
  { name: "Bing Maps", year: "2011", type: "Shipped", co: "Microsoft" },
  { name: "Windows Translator", year: "2012", type: "Shipped", co: "Microsoft" },
];

function PatentCard({ p, index }: { p: typeof patents[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.06}s, transform 0.5s ease ${index * 0.06}s, box-shadow 0.3s, border-color 0.3s`,
        background: hovered ? `linear-gradient(135deg, ${p.color}08, transparent)` : "var(--surface)",
        border: `1px solid ${hovered ? p.color + "35" : "var(--border)"}`,
        borderRadius: 12,
        padding: "28px 24px",
        boxShadow: hovered ? `0 4px 24px ${p.color}15, 0 0 0 1px ${p.color}15` : "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--text-dim)",
          letterSpacing: "0.1em",
        }}>
          {p.id}
        </span>
        <span style={{
          padding: "2px 8px",
          borderRadius: 4,
          background: p.status === "Patented" ? `${p.color}18` : "rgba(255,214,0,0.1)",
          border: `1px solid ${p.status === "Patented" ? p.color + "30" : "rgba(255,214,0,0.3)"}`,
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          color: p.status === "Patented" ? p.color : "#ffd600",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
        }}>
          {p.status}
        </span>
      </div>
      <h4 style={{
        fontFamily: "var(--font-space)",
        fontWeight: 600,
        fontSize: 15,
        color: "var(--text)",
        lineHeight: 1.3,
        marginBottom: 8,
        letterSpacing: "-0.01em",
      }}>
        {p.title}
      </h4>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: p.color, letterSpacing: "0.06em", marginBottom: 10 }}>
        {p.product}
      </p>
      <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>
        {p.desc}
      </p>
    </div>
  );
}

export default function Patents() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="patents"
      style={{
        padding: "120px clamp(24px, 6vw, 120px)",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            marginBottom: 80,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}>
            IP & Launches
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
            Patents &<br />
            <span style={{
              background: "linear-gradient(135deg, #06d6a0, #4d7cff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Notable Launches
            </span>
          </h2>
        </div>

        {/* Patents grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
          marginBottom: 80,
        }}>
          {patents.map((p, i) => (
            <PatentCard key={p.id} p={p} index={i} />
          ))}
        </div>

        {/* Launches timeline */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 32,
          }}>
            Other Notable Launches — Contact me to view detailed work samples
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {launches.map((l, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(77,124,255,0.03)";
                  e.currentTarget.style.marginLeft = "8px";
                  e.currentTarget.style.paddingLeft = "8px";
                  e.currentTarget.style.transition = "all 0.2s";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.marginLeft = "0px";
                  e.currentTarget.style.paddingLeft = "0px";
                }}
              >
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-dim)",
                  minWidth: 36,
                }}>
                  {l.year}
                </span>
                <span style={{
                  flex: 1,
                  fontSize: 14,
                  color: "var(--text-muted)",
                  fontWeight: 500,
                }}>
                  {l.name}
                </span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: l.co === "Microsoft" ? "#00a4ef" : "#4d7cff",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}>
                  {l.co}
                </span>
                <span style={{
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: "rgba(6,214,160,0.08)",
                  border: "1px solid rgba(6,214,160,0.2)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "#06d6a0",
                  letterSpacing: "0.06em",
                }}>
                  {l.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
