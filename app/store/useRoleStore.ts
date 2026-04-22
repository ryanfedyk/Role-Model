import { create } from "zustand";

export type AutomationDepth = "copilot" | "autopilot";

export interface SliderConfig {
  aestheticDirection: number;
  systemsArchitecture: number;
  agentOrchestration: number;
  ethicalGovernance: number;
  technicalSynthesis: number;
  strategicStorytelling: number;
}

export interface RoleOutput {
  archetype: string;
  purposeStatement: string;
  dayInTheLife: string;
  careerLadder: string;
  collaborationMatrix: string;
  ownershipModel: string;
  humanLeverageScore: number;
  humanLeverageFormula: string;
}

interface RoleStore {
  sliders: SliderConfig;
  automationDepth: AutomationDepth;
  output: RoleOutput | null;
  isGenerating: boolean;
  error: string | null;
  setSlider: (key: keyof SliderConfig, value: number) => void;
  setAutomationDepth: (depth: AutomationDepth) => void;
  setOutput: (output: RoleOutput | null) => void;
  setIsGenerating: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useRoleStore = create<RoleStore>((set) => ({
  sliders: {
    aestheticDirection: 50,
    systemsArchitecture: 50,
    agentOrchestration: 50,
    ethicalGovernance: 50,
    technicalSynthesis: 50,
    strategicStorytelling: 50,
  },
  automationDepth: "copilot",
  output: null,
  isGenerating: false,
  error: null,
  setSlider: (key, value) =>
    set((s) => ({ sliders: { ...s.sliders, [key]: value } })),
  setAutomationDepth: (depth) => set({ automationDepth: depth }),
  setOutput: (output) => set({ output }),
  setIsGenerating: (v) => set({ isGenerating: v }),
  setError: (e) => set({ error: e }),
}));
