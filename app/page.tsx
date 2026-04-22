import ControlRoom from "./components/ControlRoom";
import FutureBrief from "./components/FutureBrief";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950">
      {/* Top bar */}
      <header className="border-b border-slate-800 px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <span className="font-bold text-white tracking-tight">RoleModel</span>
          <span className="text-slate-500 text-sm font-medium">AI</span>
        </div>
        <div className="h-4 w-px bg-slate-700" />
        <span className="text-sm text-slate-400">UX Designer · AI Futures Simulator</span>
      </header>

      {/* Split view */}
      <main className="flex flex-1 overflow-hidden">
        {/* Left: Control Room */}
        <aside className="w-[360px] flex-shrink-0 border-r border-slate-800 overflow-y-auto p-5">
          <ControlRoom />
        </aside>

        {/* Right: Future Brief */}
        <section className="flex-1 overflow-y-auto p-6 flex flex-col">
          <FutureBrief />
        </section>
      </main>
    </div>
  );
}
