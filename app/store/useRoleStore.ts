import { create } from "zustand";

export type Era = "2025" | "2027" | "2030" | "2035";
export type Archetype = "maker" | "researcher" | "strategist";

export interface TimelineScene {
  time: string;
  title: string;
  text: string;
}

export interface CollabCard {
  team: string;
  rel: string;
}

export interface CareerLevel {
  title: string;
  desc: string;
}

export interface FieldGuideOutput {
  eyebrow: string;
  headline: string;
  roleTitle: string;
  portrait: string[];
  dayInLife: TimelineScene[];
  collabOverview: string;
  collabCards: CollabCard[];
  pullQuote: string;
  bodyClose: string;
  careerArc: {
    entry: CareerLevel;
    senior: CareerLevel;
    exec: CareerLevel;
  };
  futureProof: string;
}

interface RoleStore {
  era: Era;
  archetype: Archetype;
  output: FieldGuideOutput | null;
  isGenerating: boolean;
  error: string | null;
  setEra: (era: Era) => void;
  setArchetype: (archetype: Archetype) => void;
  setOutput: (output: FieldGuideOutput | null) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  era: "2030",
  archetype: "maker",
  output: null,
  isGenerating: false,
  error: null,
  setEra: (era) => set({ era }),
  setArchetype: (archetype) => set({ archetype }),
  setOutput: (output) => set({ output }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setError: (e) => set({ error: e }),
}));
