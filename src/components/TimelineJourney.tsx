import React, { useState } from "react";
import { Experience, PortfolioData } from "../types";
import { GraduationCap, Briefcase, Award, Calendar, MapPin } from "lucide-react";

interface TimelineJourneyProps {
  experiences: Experience[];
  portfolioData: PortfolioData;
}

export default function TimelineJourney({ experiences, portfolioData }: TimelineJourneyProps) {
  const [activeFilter, setActiveFilter] = useState<"All" | Experience["type"]>("All");

  const filters: ("All" | Experience["type"])[] = ["All", "Experience", "Education"];

  const filteredExperiences = activeFilter === "All"
    ? experiences
    : experiences.filter(exp => exp.type === activeFilter);

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500 font-semibold", border: "border-sky-500", indicator: "border-sky-500 text-sky-600 dark:text-sky-400 bg-white dark:bg-[#090b14]" };
      case "violet": return { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 font-semibold", border: "border-indigo-500", indicator: "border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-[#090b14]" };
      case "emerald": return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500 font-semibold", border: "border-emerald-500", indicator: "border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-[#090b14]" };
      case "amber": return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500 font-semibold", border: "border-amber-500", indicator: "border-amber-500 text-amber-600 dark:text-amber-400 bg-white dark:bg-[#090b14]" };
      case "rose": return { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500 font-semibold", border: "border-rose-500", indicator: "border-rose-500 text-rose-600 dark:text-rose-400 bg-white dark:bg-[#090b14]" };
      case "orange": return { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500 font-semibold", border: "border-orange-500", indicator: "border-orange-500 text-orange-600 dark:text-orange-400 bg-white dark:bg-[#090b14]" };
    }
  };

  const colors = getThemeColorClass();

  const getExperienceIcon = (type: Experience["type"]) => {
    switch (type) {
      case "Education":
        return <GraduationCap className="w-4 h-4" />;
      case "Experience":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  return (
    <section id="journey" className="max-w-4xl mx-auto px-4 py-24 border-b border-slate-200 dark:border-white/5">
      
      {/* Header Block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div className="space-y-3">
          <span className={`text-xs font-semibold tracking-widest ${colors.text} uppercase block`}>Timeline</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-tight">
            Professional Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm max-w-lg leading-relaxed font-light font-sans">
            A chronological timeline of my academic milestones, technical internships, and computer engineering research.
          </p>
        </div>

        {/* Dynamic Road Filters */}
        <div className="flex space-x-1.5 self-start sm:self-auto bg-slate-150/80 dark:bg-slate-900/40 p-1.5 border border-slate-200 dark:border-white/5 rounded-full backdrop-blur-md">
          {filters.map((f) => (
            <button
              key={f}
              id={`journey-filter-${f}`}
              onClick={() => setActiveFilter(f)}
              className={`px-4.5 py-2.5 rounded-full text-xs font-sans tracking-wide font-medium transition-all cursor-pointer ${
                activeFilter === f
                  ? `${colors.bg} text-white dark:text-[#030303] font-bold shadow-lg`
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {f === "All" ? "All Checkpoints" : f}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical nodes tracking line */}
      <div className="relative ml-6 sm:ml-auto pl-8 border-l border-slate-200 dark:border-white/5 space-y-12 max-w-2xl mx-auto py-2">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            id={`journey-card-${exp.id}`}
            className="relative group transition-all"
          >
            {/* Timeline Ring indicator */}
            <span className={`absolute left-[-50px] top-1.5 w-9 h-9 rounded-full flex items-center justify-center border-2 ${colors.indicator} shadow-lg group-hover:scale-105 transition-transform duration-300 z-10`}>
              {getExperienceIcon(exp.type)}
            </span>

            {/* Premium Glass Card envelope */}
            <div className="premium-card p-6 sm:p-8 rounded-2xl">
              
              {/* Top metadata row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-1 leading-snug">
                    {exp.role}
                  </h4>
                  <p className={`text-sm font-semibold uppercase tracking-wider ${colors.text}`}>
                    {exp.organization}
                  </p>
                </div>
                
                <div className="space-y-2 sm:text-right mt-1 sm:mt-0 shrink-0">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-xs font-sans text-slate-600 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest font-sans font-medium flex items-center justify-start sm:justify-end gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-600" />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Achievements points */}
              <ul className="space-y-3.5">
                {exp.achievements.map((ach, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light">
                    <span className={`mr-3 font-semibold mt-1 text-xs shrink-0 ${colors.text}`}>•</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>

              {/* Competencies Badges */}
              {exp.skillsAssociated && exp.skillsAssociated.length > 0 && (
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-white/5 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-sans text-slate-500 font-medium mr-1.5">Focus Areas:</span>
                  {exp.skillsAssociated.map((sk) => (
                    <span
                      key={sk}
                      className="text-xs font-sans text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 px-2.5 py-1 rounded-md"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
