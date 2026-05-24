"use client";
import { useEffect, useRef } from "react";
import CustomCursor from "./components/portfolio/CustomCursor";
import Nav from "./components/portfolio/Nav";
import Hero from "./components/portfolio/Hero";
import Stats from "./components/portfolio/Stats";
import Transformations from "./components/portfolio/Transformations";
import Patents from "./components/portfolio/Patents";
import About from "./components/portfolio/About";
import Contact from "./components/portfolio/Contact";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function Home() {
  const konamiIdx = useRef(0);
  const logoClicks = useRef(0);
  const logoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Konami code easter egg
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === KONAMI[konamiIdx.current]) {
        konamiIdx.current++;
        if (konamiIdx.current === KONAMI.length) {
          konamiIdx.current = 0;
          triggerKonami();
        }
      } else {
        konamiIdx.current = 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Logo click easter egg — 5 rapid clicks
  useEffect(() => {
    function onLogoClick() {
      logoClicks.current++;
      if (logoTimer.current) clearTimeout(logoTimer.current);
      logoTimer.current = setTimeout(() => { logoClicks.current = 0; }, 1500);
      if (logoClicks.current >= 5) {
        logoClicks.current = 0;
        triggerLogoEgg();
      }
    }
    const btn = document.getElementById("logo-btn");
    btn?.addEventListener("click", onLogoClick);
    return () => btn?.removeEventListener("click", onLogoClick);
  }, []);

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <CustomCursor />
      <Nav />
      <Hero />
      <Stats />
      <Transformations />
      <Patents />
      <About />
      <Contact />
    </main>
  );
}

function triggerKonami() {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:99990;
    background:rgba(5,7,15,0.97);
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:20px;
    animation:fade-up 0.4s ease;
  `;
  overlay.innerHTML = `
    <div style="font-family:'JetBrains Mono',monospace;color:#4d7cff;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;animation:fade-up 0.4s ease 0.1s both;opacity:0">// cheat code activated</div>
    <div style="font-size:clamp(28px,5vw,60px);font-weight:800;color:#eef2ff;text-align:center;max-width:640px;line-height:1.1;letter-spacing:-0.03em;animation:fade-up 0.5s ease 0.2s both;opacity:0;font-family:'Space Grotesk',system-ui,sans-serif;">
      The real cheat code?<br/>
      <span style="background:linear-gradient(135deg,#4d7cff,#a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
        Ship things that matter.
      </span>
    </div>
    <div style="font-size:13px;color:#5a6489;font-family:'JetBrains Mono',monospace;text-align:center;line-height:1.8;animation:fade-up 0.5s ease 0.35s both;opacity:0;">
      10 years · Google, Jigsaw, Google X, Microsoft<br/>
      242M users · 7 patents · 20+ launches<br/>
      <span style="color:#4d7cff;letter-spacing:0.15em;">↑↑↓↓←→←→BA</span> unlocked ✓
    </div>
    <button id="konami-close" style="
      margin-top:12px;padding:10px 28px;
      background:transparent;border:1px solid rgba(77,124,255,0.4);
      border-radius:8px;color:#4d7cff;
      font-family:'JetBrains Mono',monospace;font-size:12px;
      letter-spacing:0.1em;cursor:none;
      transition:all 0.2s;animation:fade-up 0.5s ease 0.5s both;opacity:0;
    ">[ dismiss ]</button>
  `;
  document.body.appendChild(overlay);
  document.getElementById("konami-close")?.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}

function triggerLogoEgg() {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; inset:0; z-index:99990;
    background:rgba(5,7,15,0.97);
    display:flex; align-items:center; justify-content:center;
    flex-direction:column; gap:16px;
    animation:fade-up 0.3s ease;
  `;
  overlay.innerHTML = `
    <div style="font-family:'JetBrains Mono',monospace;color:#06d6a0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">// hidden message unlocked</div>
    <div style="font-size:clamp(18px,3vw,28px);color:#eef2ff;text-align:center;max-width:560px;line-height:1.6;font-family:'DM Serif Display',Georgia,serif;font-style:italic;padding:0 24px;">
      &ldquo;What if you designed something people actually <em>wanted</em> to use every day? What happens on their third visit? Their eighth? Their 126th?&rdquo;
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#5a6489;letter-spacing:0.1em;">— Ryan Fedyk</div>
    <button id="logo-egg-close" style="
      margin-top:16px;padding:8px 24px;
      background:transparent;border:1px solid rgba(6,214,160,0.3);
      border-radius:8px;color:#06d6a0;
      font-family:'JetBrains Mono',monospace;font-size:11px;
      letter-spacing:0.08em;cursor:none;
    ">[ close ]</button>
  `;
  document.body.appendChild(overlay);
  document.getElementById("logo-egg-close")?.addEventListener("click", () => overlay.remove());
  overlay.addEventListener("click", (e) => { if (e.target === overlay) overlay.remove(); });
}
