"use client";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Work", href: "#transformations" },
  { label: "Patents", href: "#patents" },
  { label: "Story", href: "#about" },
  { label: "Connect", href: "#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleNav(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 clamp(24px, 5vw, 80px)",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled
          ? "rgba(5,7,15,0.88)"
          : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}
    >
      {/* Logo */}
      <button
        id="logo-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "none",
          border: "none",
          display: "flex",
          alignItems: "center",
          gap: 10,
          color: "var(--text)",
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #4d7cff, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-space)",
            fontWeight: 700,
            fontSize: 13,
            color: "#fff",
            letterSpacing: "-0.02em",
          }}
        >
          RF
        </div>
        <span
          style={{
            fontFamily: "var(--font-space)",
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: "-0.02em",
          }}
        >
          Ryan Fedyk
        </span>
      </button>

      {/* Desktop links */}
      <div
        style={{
          display: "flex",
          gap: 6,
          alignItems: "center",
        }}
        className="hidden-mobile"
      >
        {links.map((l) => (
          <button
            key={l.href}
            onClick={() => handleNav(l.href)}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              fontFamily: "var(--font-space)",
              fontSize: 14,
              fontWeight: 500,
              padding: "6px 14px",
              borderRadius: 6,
              transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = "var(--text)";
              (e.target as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = "var(--text-muted)";
              (e.target as HTMLButtonElement).style.background = "transparent";
            }}
          >
            {l.label}
          </button>
        ))}
        <button
          onClick={() => handleNav("#contact")}
          data-cursor
          data-cursor-label="say hello"
          style={{
            marginLeft: 8,
            padding: "8px 20px",
            background: "transparent",
            border: "1px solid rgba(77,124,255,0.5)",
            borderRadius: 8,
            color: "#4d7cff",
            fontFamily: "var(--font-space)",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.02em",
            transition: "background 0.2s, border-color 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.background = "rgba(77,124,255,0.1)";
            t.style.borderColor = "rgba(77,124,255,0.9)";
            t.style.boxShadow = "0 0 20px rgba(77,124,255,0.25)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.background = "transparent";
            t.style.borderColor = "rgba(77,124,255,0.5)";
            t.style.boxShadow = "none";
          }}
        >
          Let&apos;s Talk
        </button>
      </div>

      {/* Mobile menu toggle */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "var(--text)",
          padding: 8,
        }}
        className="show-mobile"
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {menuOpen ? (
            <>
              <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="3" y1="15" x2="19" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </>
          )}
        </svg>
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: 64,
            left: 0,
            right: 0,
            background: "rgba(5,7,15,0.97)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            animation: "fade-up 0.2s ease",
          }}
        >
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text-muted)",
                fontFamily: "var(--font-space)",
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                textAlign: "left",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: block !important; }
        }
        @media (min-width: 641px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
