import React, { useState, useRef, useEffect } from "react";
import { PortfolioData, Skill, Project } from "../types";
import { Terminal, Code, ChevronRight, FileJson, Check, Copy } from "lucide-react";

interface InteractiveTerminalProps {
  portfolioData: PortfolioData;
  skills: Skill[];
  projects: Project[];
}

interface CommandHistory {
  input: string;
  output: React.ReactNode;
}

export default function InteractiveTerminal({ portfolioData, skills, projects }: InteractiveTerminalProps) {
  const [activeTab, setActiveTab] = useState<"cli" | "api">("cli");
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      input: "",
      output: (
        <div className="space-y-1 font-mono text-slate-400 text-[12px] leading-relaxed">
          <p className="text-sky-400 font-bold">--- PORTFOLIO DEVELOPER SHELL v2.0 ---</p>
          <p>Logged in visitor: <span className="text-white">guest@portfolio</span></p>
          <p>Type <span className="text-indigo-400 font-semibold underline">help</span> to view available queries and routes.</p>
        </div>
      ),
    },
  ]);

  const consoleEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const command = inputValue.trim();
    if (!command) return;

    const query = command.toLowerCase().split(" ")[0];
    let outputNode: React.ReactNode = null;

    switch (query) {
      case "help":
        outputNode = (
          <div className="space-y-1 text-slate-400 font-mono text-[12px] leading-relaxed">
            <p className="text-white font-bold">Available Commands:</p>
            <p> &gt; <span className="text-sky-400 font-semibold">about</span>: Print objective specialization summary</p>
            <p> &gt; <span className="text-sky-400 font-semibold">skills</span>: Render core technical competencies list</p>
            <p> &gt; <span className="text-sky-400 font-semibold">projects</span>: Display descriptions for active pipelines</p>
            <p> &gt; <span className="text-sky-400 font-semibold">contact</span>: List verified email and profile endpoints</p>
            <p> &gt; <span className="text-indigo-400 font-semibold">clear</span>: Clear log history</p>
          </div>
        );
        break;

      case "about":
        outputNode = (
          <div className="space-y-1.5 text-slate-400 font-mono text-[12px] leading-relaxed">
            <p className="text-white font-semibold">Profile metadata:</p>
            <p className="text-slate-350">{portfolioData.name} — {portfolioData.headline}</p>
            <p className="text-slate-500 italic max-w-lg">"{portfolioData.bio}"</p>
          </div>
        );
        break;

      case "skills":
        outputNode = (
          <div className="space-y-1 text-slate-400 font-mono text-[12px]">
            <p className="text-white font-semibold">Core Proficiencies:</p>
            <div className="grid grid-cols-2 gap-2 mt-1 max-w-md">
              {skills.slice(0, 8).map((s) => (
                <div key={s.id} className="flex justify-between border-b border-white/5 pb-0.5">
                  <span>{s.name}</span>
                  <span className="text-sky-400">[{s.level}%]</span>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="space-y-2 text-slate-400 font-mono text-[12px]">
            <p className="text-white font-semibold font-mono">Active Projects:</p>
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="border-l-2 border-[#1e293b] pl-3.5 space-y-0.5">
                <p className="text-sky-400 font-medium">{p.title}</p>
                <p className="text-slate-550 text-[11px] font-sans">{p.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        outputNode = (
          <div className="space-y-1 text-slate-400 font-mono text-[12px]">
            <p className="text-white font-semibold">Endpoints:</p>
            <p>Email: <a href={`mailto:${portfolioData.email}`} className="text-sky-400 hover:underline">{portfolioData.email}</a></p>
            <p>GitHub: <a href={portfolioData.github} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{portfolioData.github}</a></p>
            <p>LinkedIn: <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{portfolioData.linkedin}</a></p>
            {portfolioData.twitter && <p>X (Twitter): <a href={portfolioData.twitter} target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">{portfolioData.twitter}</a></p>}
            {portfolioData.phone && <p>Phone: <a href={`tel:${portfolioData.phone}`} className="text-sky-400 hover:underline">{portfolioData.phone}</a></p>}
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputValue("");
        return;

      default:
        outputNode = (
          <p className="font-mono text-[12px] text-rose-450 font-medium">
            Command "{query}" not recognized. Type "help" for a list of valid commands.
          </p>
        );
    }

    setHistory((prev) => [...prev, { input: command, output: outputNode }]);
    setInputValue("");
  };

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return "text-sky-400";
      case "violet": return "text-indigo-400";
      case "emerald": return "text-emerald-400";
      case "amber": return "text-amber-400";
      case "rose": return "text-rose-400";
      case "orange": return "text-orange-400";
    }
  };

  const themeTextColor = getThemeColorClass();

  // Create clean, realistic mock API JSON
  const apiResponse = {
    status: 200,
    message: "Data payload retrieved",
    payload: {
      engineer: {
        name: portfolioData.name,
        specialization: portfolioData.headline,
        location: portfolioData.location,
        bio: portfolioData.bio,
        endpoints: {
          email: portfolioData.email,
          github: portfolioData.github,
          linkedin: portfolioData.linkedin,
          x_feed: portfolioData.twitter,
          phone: portfolioData.phone
        }
      },
      skills: skills.slice(0, 6).map(s => ({ name: s.name, category: s.category, level: s.level })),
      projects: projects.slice(0, 2).map(p => ({ title: p.title, tags: p.tags, status: p.status }))
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(apiResponse, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-24 border-b border-slate-200 dark:border-white/5 relative">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className={`text-xs font-semibold tracking-widest ${themeTextColor} uppercase block`}>Console</span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 font-display tracking-tight leading-tight">
          Developer Dashboard
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-light font-sans">
          Interact with my portfolio structure in real-time. Use the command line or preview the JSON API response.
        </p>
      </div>

      {/* Terminal Board Container */}
      <div className="premium-card rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Tab Headers */}
        <div className="bg-slate-150/90 dark:bg-[#0b0e1a]/95 px-5 py-4.5 border-b border-slate-200 dark:border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 select-none">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5 mr-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
            </div>
            <span className="text-xs font-sans text-slate-500 dark:text-slate-450 font-medium">developer-console</span>
          </div>

          <div className="flex bg-slate-200 dark:bg-[#070a13] border border-slate-250 dark:border-white/5 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("cli")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-sans font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "cli"
                  ? "bg-white dark:bg-white/5 text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>CLI Emulator</span>
            </button>
            <button
              onClick={() => setActiveTab("api")}
              className={`px-3.5 py-1.5 rounded-md text-xs font-sans font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === "api"
                  ? "bg-white dark:bg-white/5 text-slate-900 dark:text-white"
                  : "text-slate-500 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              }`}
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON API</span>
            </button>
          </div>
        </div>

        {/* Dynamic Inner body content */}
        {activeTab === "cli" ? (
          <div>
            <div className="p-6 bg-slate-50 dark:bg-[#090d18]/95 max-h-[280px] min-h-[220px] overflow-y-auto space-y-4">
              {history.map((record, index) => (
                <div key={index} className="space-y-1.5">
                  {record.input && (
                    <div className="flex items-center space-x-1.5 text-[12px] font-mono font-medium">
                      <span className="text-slate-400 dark:text-slate-500 select-none">$</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{record.input}</span>
                    </div>
                  )}
                  {record.output && (
                    <div className="pl-3.5 border-l border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 font-mono text-[11px] sm:text-xs">{record.output}</div>
                  )}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Input Panel */}
            <form onSubmit={handleCommandSubmit} className="bg-slate-100 dark:bg-[#070912] px-5 py-3 border-t border-slate-200 dark:border-white/5 flex items-center space-x-2">
              <span className="text-[12px] font-mono text-slate-500 dark:text-slate-400 font-semibold">guest@portfolio:~$</span>
              <input
                id="terminal-input"
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder='Type "help" to start...'
                className="flex-1 bg-transparent border-none text-[12px] font-mono text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-700 placeholder:italic"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
              />
            </form>
          </div>
        ) : (
          /* JSON API schema view */
          <div className="relative">
            <button
              onClick={copyJson}
              className="absolute top-4 right-4 p-2 bg-slate-200/50 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-300 dark:border-white/5 hover:border-slate-400 dark:hover:border-white/10 transition-colors rounded-lg text-slate-650 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer flex items-center gap-1.5 text-[11px] font-sans"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <div className="p-6 bg-slate-50 dark:bg-[#090d18]/95 overflow-auto text-[11px] sm:text-xs font-mono h-[328px] text-slate-600 dark:text-slate-400 select-text leading-relaxed">
              <pre>
                <code>
                  <span className="text-amber-600 dark:text-amber-400">GET</span> <span className="text-sky-600 dark:text-sky-350">/api/v1/profile</span><br /><br />
                  &#123;<br />
                  &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"status"</span>: <span className="text-amber-600 dark:text-amber-500">200</span>,<br />
                  &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"message"</span>: <span className="text-emerald-600 dark:text-emerald-300">"Data payload retrieved"</span>,<br />
                  &nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"payload"</span>: &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"engineer"</span>: &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"name"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{portfolioData.name}"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"specialization"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{portfolioData.headline}"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"location"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{portfolioData.location}"</span>,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"bio"</span>: <span className="text-emerald-600 dark:text-emerald-200">"Architecting scalable digital products..."</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;,<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"skills"</span>: [<br />
                  {skills.slice(0, 3).map((s, idx) => (
                    <span key={s.id}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="text-pink-600 dark:text-pink-400">"name"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{s.name}"</span>, <span className="text-pink-600 dark:text-pink-400">"category"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{s.category}"</span>, <span className="text-pink-600 dark:text-pink-400">"level"</span>: <span className="text-amber-600 dark:text-amber-500">{s.level}</span> &#125;{idx < 2 ? "," : ""}<br />
                    </span>
                  ))}
                  &nbsp;&nbsp;&nbsp;&nbsp;],<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-600 dark:text-pink-400">"projects"</span>: [<br />
                  {projects.slice(0, 2).map((p, idx) => (
                    <span key={p.id}>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123; <span className="text-pink-600 dark:text-pink-400">"title"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{p.title}"</span>, <span className="text-pink-600 dark:text-pink-400">"status"</span>: <span className="text-emerald-600 dark:text-emerald-300">"{p.status}"</span> &#125;{idx < 1 ? "," : ""}<br />
                    </span>
                  ))}
                  &nbsp;&nbsp;&nbsp;&nbsp;]<br />
                  &nbsp;&nbsp;&#125;<br />
                  &#125;
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
