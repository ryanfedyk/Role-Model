"use client";

import { useRoleStore, FieldGuideOutput } from "./store/useRoleStore";
import ConfigStrip from "./components/ConfigStrip";
import FieldGuide from "./components/FieldGuide";

const fg = "#1a1208";
const muted = "#7a6a50";
const accent = "#b85228";
const mono = "var(--font-mono), 'JetBrains Mono', monospace";

function EmptyState() {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 16,
      color: muted,
      padding: 40,
      textAlign: "center",
    }}>
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(184,82,40,0.3)" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
      <p style={{ fontSize: 14, fontWeight: 500, color: fg }}>Select an era and archetype, then generate</p>
      <p style={{ fontSize: 13, color: muted, maxWidth: 340 }}>
        Claude will write a full field guide entry — portrait, day-in-the-life, collaboration map, career arc, and an honest look at what survives further automation.
      </p>
    </div>
  );
}

function ErrorState({ message }: { message: string }) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{
        background: "rgba(184,82,40,0.08)",
        border: "1px solid rgba(184,82,40,0.2)",
        borderRadius: 8,
        padding: "20px 24px",
        maxWidth: 440,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: accent, marginBottom: 6 }}>Generation failed</p>
        <p style={{ fontSize: 13, color: muted, lineHeight: 1.6, marginBottom: 8 }}>{message}</p>
        <p style={{ fontSize: 11, fontFamily: mono, color: "rgba(184,82,40,0.6)" }}>
          Make sure ANTHROPIC_API_KEY is set in .env.local
        </p>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      color: muted,
    }}>
      <div style={{ position: "relative", width: 36, height: 36 }}>
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(184,82,40,0.15)",
        }} />
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: accent,
          animation: "spin 0.8s linear infinite",
        }} />
      </div>
      <p style={{ fontSize: 13 }}>Writing your field guide…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function Home() {
  const { era, archetype, output, isGenerating, error, setOutput, setIsGenerating, setError } =
    useRoleStore();

  async function handleGenerate() {
    setIsGenerating(true);
    setError(null);
    setOutput(null);

    try {
      const res = await fetch("/api/generate-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ era, archetype }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data: FieldGuideOutput = await res.json();
      setOutput(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", background: "#f4efe5" }}>
      <ConfigStrip onGenerate={handleGenerate} />
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {isGenerating && <LoadingState />}
        {!isGenerating && error && <ErrorState message={error} />}
        {!isGenerating && !error && !output && <EmptyState />}
        {!isGenerating && !error && output && <FieldGuide output={output} />}
      </div>
    </div>
  );
}
