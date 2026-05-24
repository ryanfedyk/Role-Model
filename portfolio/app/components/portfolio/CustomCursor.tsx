"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -200, y: -200 });
  const ring = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>(0);
  const isHover = useRef(false);
  const isClick = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      const hoverable = target.closest("a, button, [data-cursor]");
      const label = hoverable?.getAttribute("data-cursor-label") ?? null;

      isHover.current = !!hoverable;

      if (dotRef.current) {
        dotRef.current.style.width = isHover.current ? "14px" : "8px";
        dotRef.current.style.height = isHover.current ? "14px" : "8px";
        dotRef.current.style.marginLeft = isHover.current ? "-7px" : "-4px";
        dotRef.current.style.marginTop = isHover.current ? "-7px" : "-4px";
        dotRef.current.style.background = isHover.current
          ? "rgba(77,124,255,0.2)"
          : "#4d7cff";
        dotRef.current.style.border = isHover.current
          ? "1.5px solid #4d7cff"
          : "none";
      }
      if (ringRef.current) {
        ringRef.current.style.width = isHover.current ? "56px" : "36px";
        ringRef.current.style.height = isHover.current ? "56px" : "36px";
        ringRef.current.style.marginLeft = isHover.current ? "-28px" : "-18px";
        ringRef.current.style.marginTop = isHover.current ? "-28px" : "-18px";
        ringRef.current.style.borderColor = isHover.current
          ? "rgba(77,124,255,0.8)"
          : "rgba(77,124,255,0.5)";
      }
      if (labelRef.current) {
        labelRef.current.style.opacity = label ? "1" : "0";
        if (label) labelRef.current.textContent = label;
      }
    };

    const onDown = () => {
      isClick.current = true;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(0.7)`;
      }
      const burst = document.createElement("div");
      burst.style.cssText = `
        position:fixed; top:0; left:0; width:36px; height:36px;
        border-radius:50%; border:1px solid rgba(77,124,255,0.7);
        pointer-events:none; z-index:99997;
        margin-left:-18px; margin-top:-18px;
        transform:translate(${pos.current.x}px,${pos.current.y}px);
        animation: cursor-click 0.5s ease-out forwards;
      `;
      document.body.appendChild(burst);
      setTimeout(() => burst.remove(), 500);
    };

    const onUp = () => {
      isClick.current = false;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
      }
    };

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    function animate() {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1;
      ring.current.y += (pos.current.y - ring.current.y) * 0.1;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      if (labelRef.current) {
        labelRef.current.style.transform = `translate(${ring.current.x + 22}px, ${ring.current.y - 22}px)`;
      }
      if (dotRef.current && !isClick.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const base: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    pointerEvents: "none",
    zIndex: 99999,
    transition: "width 0.15s, height 0.15s, margin 0.15s, background 0.15s, border-color 0.15s",
  };

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...base,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#4d7cff",
          marginLeft: -4,
          marginTop: -4,
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(77,124,255,0.5)",
          marginLeft: -18,
          marginTop: -18,
          transition: "width 0.2s, height 0.2s, margin 0.2s, border-color 0.15s",
        }}
      />
      <div
        ref={labelRef}
        style={{
          ...base,
          opacity: 0,
          fontFamily: "var(--font-mono), monospace",
          fontSize: 10,
          color: "#4d7cff",
          letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          transition: "opacity 0.15s",
        }}
      />
    </>
  );
}
