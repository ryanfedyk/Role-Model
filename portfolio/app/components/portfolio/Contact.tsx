"use client";
import { useState } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  function copyEmail() {
    navigator.clipboard.writeText("ryanfedyk@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <section
      id="contact"
      style={{
        padding: "120px clamp(24px, 6vw, 120px) 80px",
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        height: 400,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(77,124,255,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--accent)",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          marginBottom: 24,
        }}>
          Let&apos;s Connect
        </p>

        <h2 style={{
          fontFamily: "var(--font-space)",
          fontWeight: 800,
          fontSize: "clamp(32px, 5vw, 64px)",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
          color: "var(--text)",
          marginBottom: 24,
        }}>
          Please contact me to<br />
          <span style={{
            background: "linear-gradient(135deg, #4d7cff, #a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            view detailed work samples.
          </span>
        </h2>

        <p style={{
          color: "var(--text-muted)",
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 56,
          maxWidth: 480,
          margin: "0 auto 56px",
        }}>
          I&apos;m always excited to talk about AI design, product transformation, and what comes next.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 64 }}>
          <a
            href="https://www.linkedin.com/in/ryanfedyk/"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            data-cursor-label="view profile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "linear-gradient(135deg, #4d7cff, #a855f7)",
              borderRadius: 10,
              color: "#fff",
              fontFamily: "var(--font-space)",
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
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
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>

          <button
            onClick={copyEmail}
            data-cursor
            data-cursor-label={copied ? "copied!" : "copy email"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "14px 28px",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 10,
              color: copied ? "#06d6a0" : "var(--text-muted)",
              fontFamily: "var(--font-space)",
              fontSize: 15,
              fontWeight: 500,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              if (!copied) e.currentTarget.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
              if (!copied) e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            {copied ? (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h11v4h4v12H9v-4H4z" />
                </svg>
                ryanfedyk@gmail.com
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 40,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
            letterSpacing: "0.08em",
          }}>
            © 2026 Ryan Fedyk
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
            letterSpacing: "0.06em",
          }}>
            SP4C3C4SS3TT3
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-dim)",
            letterSpacing: "0.06em",
          }}>
            ↑↑↓↓←→←→BA
          </span>
        </div>
      </div>
    </section>
  );
}
