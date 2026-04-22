# RoleModel AI — UX Designer Futures Simulator

Model how the UX Designer role evolves as AI takes over more production work. Configure 6 competency sliders, set your automation depth, and generate a full role profile powered by Claude.

## Prerequisites

- Node.js 18+
- An [Anthropic API key](https://console.anthropic.com/)

## Setup

**1. Install dependencies**

```bash
npm install
```

**2. Add your API key**

Create a `.env.local` file in the project root:

```bash
echo "ANTHROPIC_API_KEY=sk-ant-..." > .env.local
```

Replace `sk-ant-...` with your actual key from [console.anthropic.com](https://console.anthropic.com/).

**3. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Using the app

**Left panel — Control Room**

- Drag the 6 sliders to set your competency weights (0–100 each):
  - **Aesthetic Direction & Taste** — how much you define the visual language vs. follow patterns
  - **Systems Architecture** — designing screens vs. designing the logic of self-generating UI systems
  - **Agent Orchestration** — doing the work yourself vs. managing fleets of AI agents
  - **Ethical & Algorithmic Governance** — auditing AI outputs for bias, accessibility, and dark patterns
  - **Technical Synthesis** — no-code/visual tools vs. deep LLM and front-end integration
  - **Strategic Storytelling** — showing mocks vs. influencing business strategy through design
- Toggle between **Co-Pilot Era** (AI assists you) and **Autopilot Era** (you supervise AI fleets)
- The radar chart updates live as you move sliders

**Right panel — Future Brief**

Hit **Generate Role** to produce a role profile that covers:

- Role archetype and purpose statement
- A timestamped day-in-the-life schedule
- Career ladder from entry level to executive
- Collaboration matrix with adjacent functions
- Ownership model (what you own vs. what's delegated to AI)
- Human Leverage Score — how many traditional roles one person replaces at your configuration

Each generation calls Claude fresh, so you can tweak sliders and regenerate as many times as you like to compare configurations.

## Deployment

Set `ANTHROPIC_API_KEY` as an environment variable in your hosting platform, then:

```bash
npm run build
npm start
```
