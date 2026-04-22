"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";
import { SliderConfig } from "../store/useRoleStore";

interface Props {
  sliders: SliderConfig;
}

const LABELS: Record<keyof SliderConfig, string> = {
  aestheticDirection: "Taste",
  systemsArchitecture: "Systems",
  agentOrchestration: "Orchestration",
  ethicalGovernance: "Governance",
  technicalSynthesis: "Technical",
  strategicStorytelling: "Strategy",
};

export default function RoleRadarChart({ sliders }: Props) {
  const data = (Object.keys(sliders) as Array<keyof SliderConfig>).map(
    (key) => ({
      subject: LABELS[key],
      value: sliders[key],
      fullMark: 100,
    })
  );

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
        <PolarGrid stroke="#334155" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={false}
          axisLine={false}
        />
        <Radar
          name="Competencies"
          dataKey="value"
          stroke="#6366f1"
          fill="#6366f1"
          fillOpacity={0.25}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
