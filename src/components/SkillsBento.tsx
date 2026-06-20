import React, { useState } from "react";
import { Skill, PortfolioData } from "../types";
import * as Icons from "lucide-react";

interface SkillsBentoProps {
  skills: Skill[];
  portfolioData: PortfolioData;
}

// Dynamic Icon resolver for lucide-react icons
export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return <Icons.Cpu className={className} />;
  return <IconComponent className={className} />;
}

export default function SkillsBento({ skills, portfolioData }: SkillsBentoProps) {
  const [selectedCategory, setSelectedCategory] = useState<"All" | Skill["category"]>("All");

  const categories: ("All" | Skill["category"])[] = ["All", "Languages", "Development", "Tools / Cloud", "CS Core"];

  const filteredSkills = selectedCategory === "All"
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500 font-semibold", fill: "bg-sky-500", textHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400", activePill: "bg-sky-500/10 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 border-sky-400/25" };
      case "violet": return { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 font-semibold", fill: "bg-indigo-500", textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400", activePill: "bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-700 dark:text-indigo-400 border-indigo-400/25" };
      case "emerald": return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500 font-semibold", fill: "bg-emerald-500", textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400", activePill: "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-400/25" };
      case "amber": return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500 font-semibold", fill: "bg-amber-500", textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400", activePill: "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-400/25" };
      case "rose": return { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500 font-semibold", fill: "bg-rose-500", textHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400", activePill: "bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-400/25" };
      case "orange": return { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500 font-semibold", fill: "bg-orange-500", textHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400", activePill: "bg-orange-500/10 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-450/25" };
    }
  };

  const colors = getThemeColorClass();

  return (
    <section id="skills" className="max-w-6xl mx-auto px-4 py-24 border-b border-slate-200 dark:border-white/5 relative">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative">
        <span className={`text-xs font-semibold tracking-widest ${colors.text} uppercase block mb-2`}>Expertise</span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-tight">
          Engineering Toolbox
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-light font-sans max-w-xl mx-auto">
          Distributing complex software configurations across frontend runtime layers, multithreaded backend pipelines, and low-level algorithmic efficiency.
        </p>

        {/* Beautiful Rounded Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-8 max-w-2xl mx-auto bg-slate-150/80 dark:bg-slate-900/40 p-1.5 border border-slate-200 dark:border-white/5 rounded-2xl sm:rounded-full backdrop-blur-md">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`skill-cat-${cat.replace(/\s+/g, "_")}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-sans tracking-wide font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? `${colors.bg} text-white dark:text-[#030303] font-bold shadow-lg shadow-sky-500/5`
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Premium Bento Grid of Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredSkills.map((skill) => {
          return (
            <div
              key={skill.id}
              id={`skill-card-${skill.id}`}
              className="premium-card p-6 rounded-2xl flex flex-col justify-between group cursor-default"
            >
              <div className="flex items-start justify-between gap-3 mb-6">
                {/* Custom Glassy Rounded Icon container */}
                <div className={`p-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-500 dark:text-slate-400 transition-all duration-300 ${colors.textHover} group-hover:scale-105 group-hover:bg-slate-200 dark:group-hover:bg-white/10`}>
                  <DynamicIcon name={skill.icon} className="w-5 h-5" />
                </div>
                
                {/* Metric Status label */}
                <span className="text-[10px] font-sans font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/5 uppercase tracking-wide">
                  {skill.category}
                </span>
              </div>

              {/* Title & Progress parameters */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-sans text-sm font-semibold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                    {skill.name}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] font-sans text-slate-500 dark:text-slate-500 mt-2 font-normal">
                    <span>Performance Rating</span>
                    <span className={`font-semibold ${colors.text}`}>{skill.level}%</span>
                  </div>
                </div>

                {/* Progress bar container (curvaceous and soft) */}
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-full overflow-hidden relative">
                  <div
                    className={`h-full ${colors.fill} transition-all duration-700 ease-out rounded-full`}
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium minimal footer statement */}
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between p-5 bg-slate-100/50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-2xl text-center sm:text-left gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-sans">
          <Icons.Cpu className={`w-4 h-4 ${colors.text}`} />
          <span>Core software proficiencies built through real-world simulations and research benchmarks.</span>
        </div>
        <div className="text-[11px] font-mono text-slate-500 dark:text-slate-500">
          Parameters: {skills.length} Evaluated
        </div>
      </div>
    </section>
  );
}
