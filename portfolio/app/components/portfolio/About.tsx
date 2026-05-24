"use client";
import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    era: "Microsoft",
    period: "Early Career",
    color: "#00a4ef",
    desc: "Shipped products at scale — Windows Phone 7, Xbox Kinect, Bing Maps, Windows Translator. Built a foundation in systems thinking, hardware-software interaction, and designing for mass adoption.",
  },
  {
    era: "Google Display Ads",
    period: "Google — Year 1",
    color: "#4285f4",
    desc: "Defined principles for making ads genuinely helpful. Produced user research videos to align the org around improving the ad experience.",
  },
  {
    era: "Google X",
    period: "Google — Moonshots",
    color: "#ea4335",
    desc: "Designed Ender and Synch Ender — natural voice interaction products. Drove strategy, defined interaction methods, and built executive buy-in through vision artifacts.",
  },
  {
    era: "Apps Education",
    period: "Google — Education",
    color: "#34a853",
    desc: "Led design for Google Classroom, doubling the user base from 20M to 40M. Pivoted strategy to Higher Education, launching Course Kit into beta.",
  },
  {
    era: "Jigsaw",
    period: "Google — Safety",
    color: "#fbbc04",
    desc: "Rebuilt the design team from scratch. Launched Perspective API, Outline, and tools to fight misinformation, harassment, and censorship — used by 200+ partners including the NYTimes.",
  },
  {
    era: "Google Meet",
    period: "Google — Hybrid & AI",
    color: "#4d7cff",
    desc: "Led a team of 10. Transitioned 242M users to hybrid work. Pivoted Meet to be AI-first: Generative Backgrounds, AI Layouts, Real-time Speech Translation, and 7 active patents.",
  },
  {
    era: "Google Shopping",
    period: "Google — Agentic Commerce",
    color: "#a855f7",
    desc: "Designing the implicit AI interface — before the prompt exists. Agentic Commerce, Implicit Shopping, Shopping AI Pathways. Setting the vision for what commerce looks like when AI knows what you need before you ask.",
  },
  {
    era: "Google Docs",
    period: "Google — Future of Documents",
    color: "#06d6a0",
    desc: "In a world of bottomless text generation, what is the point of a document? The document becomes business memory — instructions for running your company. Leading the vision.",
  },
];

const principles = [
  {
    title: "Stories first",
    body: "I leverage my background in filmmaking and animation to define strategy through narrative. Vision only lands when people can see themselves in it.",
  },
  {
    title: "Build the team, then build the product",
    body: "I'm passionate about building healthy, productive teams. Process, culture, OKRs, crits — design leadership is people leadership.",
  },
  {
    title: "Solve real problems at real scale",
    body: "From a student submitting homework before a deadline to 242 million people rejoining the office — every interaction deserves the same care.",
  },
  {
    title: "Design the thing nobody's asked for yet",
    body: "Agentic interfaces. Implicit shopping. Meeting rooms that know you're there. The best design work is always ahead of the product roadmap.",
  },
];

export default function About() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      style={{
        padding: "120px clamp(24px, 6vw, 120px)",
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px, 5vw, 80px)",
            marginBottom: 100,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "none" : "translateY(24px)",
            transition: "opacity 0.6s, transform 0.6s",
          }}
          className="about-grid"
        >
          <div>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--accent)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              About
            </p>
            <h2 style={{
              fontFamily: "var(--font-space)",
              fontWeight: 800,
              fontSize: "clamp(32px, 4vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "var(--text)",
              marginBottom: 0,
            }}>
              I&apos;ve worked at Google<br />
              for{" "}
              <span style={{
                background: "linear-gradient(135deg, #4d7cff, #a855f7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                10 years.
              </span>
            </h2>
          </div>
          <div style={{ paddingTop: "clamp(0px, 2vw, 40px)" }}>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 20 }}>
              I&apos;m passionate about building tools that make people&apos;s lives safer, simpler, and more productive. I&apos;ve worked on problems ranging from mitigating the harmful effects of misinformation to microinteractions like a student pressing submit before a deadline.
            </p>
            <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8 }}>
              Stories are at the foundation of my practice. I leverage my background in filmmaking and animation to define strategy through narrative — and I advocate for user-centered design at the organizational level.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {["Professor · NYU Tisch", "Speaker · UXU 2019", "MFAs · Stern PhDs"].map((tag) => (
                <span key={tag} style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-muted)",
                  letterSpacing: "0.04em",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 100 }}>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 40,
          }}>
            Career Arc — hover to explore
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {timeline.map((t, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{
                  padding: "20px 24px",
                  border: `1px solid ${activeIndex === i ? t.color + "35" : "var(--border)"}`,
                  borderRadius: 10,
                  background: activeIndex === i ? `${t.color}08` : "transparent",
                  display: "flex",
                  gap: 24,
                  alignItems: "flex-start",
                  transition: "all 0.25s ease",
                  cursor: "default",
                }}
              >
                <div style={{ flexShrink: 0, width: 8, height: 8, borderRadius: "50%", background: t.color, marginTop: 6, boxShadow: activeIndex === i ? `0 0 12px ${t.color}` : "none", transition: "box-shadow 0.3s" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{
                      fontFamily: "var(--font-space)",
                      fontWeight: 700,
                      fontSize: 16,
                      color: activeIndex === i ? "var(--text)" : "var(--text-muted)",
                      transition: "color 0.2s",
                    }}>
                      {t.era}
                    </span>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: t.color,
                      letterSpacing: "0.06em",
                      opacity: activeIndex === i ? 1 : 0.5,
                      transition: "opacity 0.2s",
                    }}>
                      {t.period}
                    </span>
                  </div>
                  <div style={{
                    maxHeight: activeIndex === i ? 100 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease",
                  }}>
                    <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7, paddingBottom: 4 }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Design principles */}
        <div>
          <p style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--accent)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: 40,
          }}>
            Design Philosophy
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 16,
          }}>
            {principles.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "28px 24px",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  background: "var(--surface)",
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(77,124,255,0.3)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <p style={{
                  fontFamily: "var(--font-space)",
                  fontWeight: 700,
                  fontSize: 16,
                  color: "var(--text)",
                  marginBottom: 12,
                  letterSpacing: "-0.01em",
                }}>
                  {p.title}
                </p>
                <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
