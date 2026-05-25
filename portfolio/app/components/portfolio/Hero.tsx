"use client";
import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%!&*";
const HEADLINE = "DESIGNING EXPERIENCES TO IMPROVE PEOPLES LIVES";

const REEL = [
  "/assets/generativebackgrounds.gif",
  "/assets/agenticcommerce.gif",
  "/assets/shoppingaipathways.gif",
  "/assets/portraitframing.gif",
  "/assets/dynamiclayouts.gif",
  "/assets/outfitagent.gif",
  "/assets/aienhancedmeetings.gif",
  "/assets/eduvision.gif",
  "/assets/geminimeetings.gif",
  "/assets/reactions.gif",
  "/assets/disinfohighleverage.gif",
  "/assets/roomsvisoin.gif",
];

function useScramble(text: string, delay = 600) {
  const [display, setDisplay] = useState(
    () => text.split("").map(c => c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)]).join("")
  );
  const resolved = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let tick = 0;
    let started = false;
    const timer = setTimeout(() => { started = true; }, delay);

    function animate() {
      if (started) {
        tick++;
        if (tick % 2 === 0) {
          resolved.current = Math.min(resolved.current + 1, text.length);
        }
        setDisplay(
          text.split("").map((char, i) => {
            if (i < resolved.current) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
      }
      if (resolved.current < text.length) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay]);

  return display;
}

function GridBackground() {
  return (
    <div style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `
        linear-gradient(rgba(77,124,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(77,124,255,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
      animation: "grid-drift 8s linear infinite",
      maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
      WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
    }} />
  );
}

function FloatingOrbs() {
  return (
    <>
      <div style={{
        position: "absolute", top: "15%", left: "8%", width: 400, height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(77,124,255,0.12) 0%, transparent 70%)",
        animation: "orb-1 12s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", right: "5%", width: 500, height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
        animation: "orb-2 16s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "50%", right: "20%", width: 200, height: 200,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(6,214,160,0.07) 0%, transparent 70%)",
        animation: "orb-1 20s ease-in-out infinite reverse", pointerEvents: "none",
      }} />
    </>
  );
}

function MediaReel() {
  const doubled = [...REEL, ...REEL];
  return (
    <div style={{
      position: "absolute",
      bottom: 88,
      left: 0,
      right: 0,
      height: 130,
      overflow: "hidden",
      maskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      WebkitMaskImage: "linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)",
      pointerEvents: "none",
    }}>
      <div style={{
        display: "flex",
        gap: 10,
        animation: "marquee 45s linear infinite",
        width: "max-content",
      }}>
        {doubled.map((src, i) => (
          <div key={i} style={{
            width: 210,
            height: 120,
            borderRadius: 8,
            overflow: "hidden",
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: 0.65,
          }}>
            <img src={src} loading="lazy" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const headline = useScramble(HEADLINE, 800);
  const [showSub, setShowSub] = useState(false);
  const [showCta, setShowCta] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowSub(true), 1800);
    const t2 = setTimeout(() => setShowCta(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  function scrollToWork() {
    document.querySelector("#transformations")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg)",
        padding: "80px clamp(24px, 6vw, 120px) 240px",
      }}
    >
      <GridBackground />
      <FloatingOrbs />

      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, rgba(77,124,255,0.4), transparent)",
        animation: "scan-line 6s linear infinite",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 1100 }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 48,
          padding: "6px 16px",
          border: "1px solid rgba(77,124,255,0.25)",
          borderRadius: 100,
          background: "rgba(77,124,255,0.06)",
          animation: "fade-up 0.6s ease 0.2s both",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#06d6a0", boxShadow: "0 0 8px #06d6a0",
            display: "inline-block", animation: "pulse-ring 2s ease infinite",
          }} />
          <span style={{
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)",
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}>
            Google · Jigsaw · Microsoft · NYU · 10+ years
          </span>
        </div>

        <h1 style={{
          fontFamily: "var(--font-space)",
          fontWeight: 800,
          fontSize: "clamp(42px, 7vw, 100px)",
          lineHeight: 1.0,
          letterSpacing: "-0.03em",
          color: "var(--text)",
          marginBottom: 32,
          animation: "fade-up 0.6s ease 0.3s both",
          wordBreak: "break-word",
        }}>
          {headline.split(" ").map((word, i) => {
            const colorWords = ["EXPERIENCES", "PEOPLES", "LIVES"];
            const isAccent = colorWords.includes(word);
            return (
              <span key={i}>
                {isAccent ? (
                  <span style={{
                    background: "linear-gradient(135deg, #4d7cff, #a855f7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>{word}</span>
                ) : word}
                {" "}
              </span>
            );
          })}
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 22px)",
          color: "var(--text-muted)",
          maxWidth: 640,
          margin: "0 auto 48px",
          lineHeight: 1.6,
          fontWeight: 400,
          opacity: showSub ? 1 : 0,
          transform: showSub ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          UX Design leader who transforms legacy products into AI-forward platforms.
          Stories are at the foundation of everything I build.
        </p>

        <div style={{
          display: "flex",
          gap: 16,
          justifyContent: "center",
          flexWrap: "wrap",
          opacity: showCta ? 1 : 0,
          transform: showCta ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}>
          <button
            onClick={scrollToWork}
            data-cursor
            data-cursor-label="explore"
            style={{
              padding: "14px 32px",
              background: "linear-gradient(135deg, #4d7cff, #a855f7)",
              border: "none",
              borderRadius: 10,
              color: "#fff",
              fontFamily: "var(--font-space)",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(77,124,255,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >See the work</button>
          <a
            href="https://www.linkedin.com/in/ryanfedyk/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="LinkedIn"
            style={{
              padding: "14px 32px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              color: "var(--text-muted)",
              fontFamily: "var(--font-space)",
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              display: "inline-block",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >LinkedIn</a>
        </div>
      </div>

      <MediaReel />

      <div style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        animation: "fade-in 1s ease 3s both",
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)",
          letterSpacing: "0.15em", textTransform: "uppercase",
        }}>scroll</span>
        <div style={{
          width: 1, height: 40,
          background: "linear-gradient(to bottom, var(--text-dim), transparent)",
          animation: "float 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
