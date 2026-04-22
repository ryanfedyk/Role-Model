"use client";

import { useRoleStore } from "../store/useRoleStore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useState } from "react";

export default function FutureBrief() {
  const { sliders, automationDepth, output, isGenerating, error, setOutput, setIsGenerating, setError } =
    useRoleStore();
  const [markdown, setMarkdown] = useState<string | null>(null);

  async function generate() {
    setIsGenerating(true);
    setError(null);
    setMarkdown(null);
    setOutput(null);

    try {
      const res = await fetch("/api/generate-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sliders, automationDepth }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Generation failed");
      }

      const data = await res.json();
      setMarkdown(data.markdown);
      setOutput({ ...data, markdown: undefined });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <section className="flex flex-col gap-4 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Future Brief</h1>
          <p className="text-sm text-slate-400 mt-0.5">
            AI-generated role profile based on your competency configuration
          </p>
        </div>
        <button
          onClick={generate}
          disabled={isGenerating}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer
            ${isGenerating
              ? "bg-indigo-800 text-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            }`}
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Generating…
            </>
          ) : (
            <>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Generate Role
            </>
          )}
        </button>
      </div>

      {/* Content area */}
      <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-y-auto">
        {error && (
          <div className="p-6">
            <div className="flex items-start gap-3 bg-red-950/50 border border-red-800 rounded-lg p-4">
              <svg className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-red-300">Generation failed</p>
                <p className="text-sm text-red-400 mt-1">{error}</p>
                <p className="text-xs text-red-500 mt-2">Make sure ANTHROPIC_API_KEY is set in your .env.local file.</p>
              </div>
            </div>
          </div>
        )}

        {isGenerating && (
          <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-400">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-slate-700" />
              <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-t-indigo-500 animate-spin" />
            </div>
            <p className="text-sm">Modeling your future role…</p>
          </div>
        )}

        {!isGenerating && !error && !markdown && (
          <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-500 p-8 text-center">
            <svg className="h-10 w-10 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
            </svg>
            <p className="text-sm font-medium">Configure your competency weights, then hit Generate Role</p>
            <p className="text-xs text-slate-600">Claude will model what your future UX role looks like based on your configuration</p>
          </div>
        )}

        {markdown && !isGenerating && (
          <div className="p-6 prose prose-invert prose-sm max-w-none
            prose-headings:font-semibold
            prose-h3:text-base prose-h3:text-slate-100 prose-h3:mt-6 prose-h3:mb-2
            prose-h4:text-sm prose-h4:text-indigo-300 prose-h4:mt-4 prose-h4:mb-1
            prose-p:text-slate-300 prose-p:leading-relaxed
            prose-li:text-slate-300
            prose-strong:text-slate-100
            prose-ul:my-2 prose-ol:my-2
            prose-hr:border-slate-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
          </div>
        )}
      </div>
    </section>
  );
}
