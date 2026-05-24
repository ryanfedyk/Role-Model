"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 10, suffix: "+", label: "Years at Google" },
  { value: 242, suffix: "M+", label: "Google Meet Users" },
  { value: 7, suffix: "+", label: "Active Patents" },
  { value: 20, suffix: "+", label: "Product Launches" },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  const start = useRef<number | null>(null);
  const duration = 1800;

  useEffect(() => {
    if (!active) return;
    start.current = null;
    function tick(ts: number) {
      if (!start.current) start.current = ts;
      const progress = Math.min((ts - start.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
      else setCount(target);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, target]);

  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "80px clamp(24px, 6vw, 120px)",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* Manifesto quote */}
      <div style={{ maxWidth: 900, margin: "0 auto 80px", textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "clamp(22px, 3.5vw, 40px)",
          color: "var(--text)",
          lineHeight: 1.4,
          letterSpacing: "-0.01em",
        }}>
          &ldquo;Stories are at the foundation of my design practice. I use narrative
          to define strategy — and strategy to change what&apos;s possible.&rdquo;
        </p>
        <div style={{
          marginTop: 24,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(77,124,255,0.3), transparent)",
        }} />
      </div>

      {/* Stats grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 2,
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              padding: "40px 24px",
              textAlign: "center",
              border: "1px solid var(--border)",
              background: "rgba(77,124,255,0.02)",
              position: "relative",
              overflow: "hidden",
              animation: active ? `fade-up 0.5s ease ${i * 0.1}s both` : "none",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(77,124,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(77,124,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(77,124,255,0.02)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            <div style={{
              fontFamily: "var(--font-space)",
              fontWeight: 800,
              fontSize: "clamp(36px, 5vw, 56px)",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              marginBottom: 8,
              background: "linear-gradient(135deg, #eef2ff, #7ba4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              <CountUp target={s.value} suffix={s.suffix} active={active} />
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Company logos text row */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "clamp(24px, 4vw, 60px)",
        flexWrap: "wrap",
        marginTop: 64,
      }}>
        {["Google", "Jigsaw", "Google X", "Microsoft", "NYU Tisch"].map((co) => (
          <span key={co} style={{
            fontFamily: "var(--font-space)",
            fontWeight: 600,
            fontSize: "clamp(13px, 1.5vw, 17px)",
            color: "var(--text-dim)",
            letterSpacing: "0.04em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => { (e.target as HTMLSpanElement).style.color = "var(--text-muted)"; }}
          onMouseLeave={(e) => { (e.target as HTMLSpanElement).style.color = "var(--text-dim)"; }}
          >
            {co}
          </span>
        ))}
      </div>
    </section>
  );
}
