"use client";

import { useRoleStore, SliderConfig, AutomationDepth } from "../store/useRoleStore";
import dynamic from "next/dynamic";

const RoleRadarChart = dynamic(() => import("./RadarChart"), { ssr: false });

interface SliderDef {
  key: keyof SliderConfig;
  label: string;
  leftLabel: string;
  rightLabel: string;
  description: string;
}

const SLIDERS: SliderDef[] = [
  {
    key: "aestheticDirection",
    label: "Aesthetic Direction & Taste",
    leftLabel: "Follows patterns",
    rightLabel: "Defines visual languages",
    description: "The human as the final arbiter of 'Good'",
  },
  {
    key: "systemsArchitecture",
    label: "Systems Architecture",
    leftLabel: "Designing screens",
    rightLabel: "Designing UI DNA",
    description: "Logic, constraints, and self-generating UI systems",
  },
  {
    key: "agentOrchestration",
    label: "Agent Orchestration",
    leftLabel: "Doing the work",
    rightLabel: "Managing AI fleets",
    description: "Directing agents that execute research, UI, and QA",
  },
  {
    key: "ethicalGovernance",
    label: "Ethical & Algorithmic Governance",
    leftLabel: "Ignores model behavior",
    rightLabel: "Auditing AI outputs",
    description: "Bias, accessibility, and dark pattern review",
  },
  {
    key: "technicalSynthesis",
    label: "Technical Synthesis",
    leftLabel: "No-code / Visual",
    rightLabel: "LLM & front-end depth",
    description: "Prompt engineering, inference, and architecture",
  },
  {
    key: "strategicStorytelling",
    label: "Strategic Storytelling",
    leftLabel: "Showing mocks",
    rightLabel: "Influencing C-suite",
    description: "Modeling business outcomes through design",
  },
];

export default function ControlRoom() {
  const { sliders, automationDepth, setSlider, setAutomationDepth } =
    useRoleStore();

  return (
    <aside className="flex flex-col gap-6">
      {/* Radar Chart */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Competency Profile
        </h2>
        <RoleRadarChart sliders={sliders} />
      </div>

      {/* Automation Depth Toggle */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Automation Depth
        </h2>
        <div className="grid grid-cols-2 gap-2">
          {(["copilot", "autopilot"] as AutomationDepth[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setAutomationDepth(mode)}
              className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                automationDepth === mode
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
              }`}
            >
              {mode === "copilot" ? "🤝 Co-Pilot Era" : "🚀 Autopilot Era"}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {automationDepth === "copilot"
            ? "AI assists the human — you drive."
            : "Human supervises AI fleets — agents drive."}
        </p>
      </div>

      {/* Sliders */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
          Meta-Competency Weights
        </h2>
        <div className="flex flex-col gap-5">
          {SLIDERS.map(({ key, label, leftLabel, rightLabel, description }) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-slate-200">
                  {label}
                </span>
                <span className="text-sm font-bold text-indigo-400 tabular-nums w-8 text-right">
                  {sliders[key]}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{description}</p>
              <input
                type="range"
                min={0}
                max={100}
                value={sliders[key]}
                onChange={(e) => setSlider(key, Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer
                  bg-slate-700
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-4
                  [&::-webkit-slider-thumb]:h-4
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-indigo-500
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:shadow-indigo-500/40
                  [&::-webkit-slider-thumb]:cursor-pointer
                  [&::-moz-range-thumb]:w-4
                  [&::-moz-range-thumb]:h-4
                  [&::-moz-range-thumb]:rounded-full
                  [&::-moz-range-thumb]:bg-indigo-500
                  [&::-moz-range-thumb]:border-0
                  [&::-moz-range-thumb]:cursor-pointer"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-slate-600">{leftLabel}</span>
                <span className="text-xs text-slate-600">{rightLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
