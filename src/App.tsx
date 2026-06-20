import React, { useState } from "react";
import {
  PortfolioData,
  INITIAL_PORTFOLIO_DATA,
  Skill,
  INITIAL_SKILLS,
  Project,
  INITIAL_PROJECTS,
  Experience,
  INITIAL_EXPERIENCES,
} from "./types";
import AestheticHero from "./components/AestheticHero";
import SkillsBento from "./components/SkillsBento";
import ProjectsGrid from "./components/ProjectsGrid";
import InteractiveTerminal from "./components/InteractiveTerminal";
import TimelineJourney from "./components/TimelineJourney";
import AlgoVisualizer from "./components/AlgoVisualizer";
import ContactSection from "./components/ContactSection";
import CustomCursor from "./components/CustomCursor";
import HLogo from "./components/HLogo";
import { Shield, Menu, X, ArrowUp, GraduationCap, Cpu, Layers, Sun, Moon } from "lucide-react";

export default function App() {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(INITIAL_PORTFOLIO_DATA);
  const [skills] = useState<Skill[]>(INITIAL_SKILLS);
  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [experiences] = useState<Experience[]>(INITIAL_EXPERIENCES);

  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync isDark with document element class
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Monitor scroll for top button
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-400", bg: "bg-sky-500 font-semibold", border: "border-sky-500", progress: "from-sky-500 to-blue-600", activeNav: "border-sky-400" };
      case "violet": return { text: "text-indigo-400", bg: "bg-indigo-600 font-semibold", border: "border-indigo-500", progress: "from-indigo-600 to-indigo-800", activeNav: "border-indigo-400" };
      case "emerald": return { text: "text-emerald-400", bg: "bg-emerald-500 font-semibold", border: "border-emerald-500", progress: "from-emerald-500 to-teal-600", activeNav: "border-emerald-400" };
      case "amber": return { text: "text-amber-400", bg: "bg-amber-500 font-semibold", border: "border-amber-500", progress: "from-amber-500 to-orange-600", activeNav: "border-amber-400" };
      case "rose": return { text: "text-rose-400", bg: "bg-rose-500 font-semibold", border: "border-rose-500", progress: "from-rose-500 to-red-600", activeNav: "border-rose-400" };
      case "orange": return { text: "text-orange-500", bg: "bg-[#F97316] font-semibold", border: "border-orange-500", progress: "from-orange-500 to-amber-600", activeNav: "border-orange-500" };
    }
  };

  const currentColors = getThemeColorClass();

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-[#030303] text-slate-900 dark:text-slate-100 selection:bg-slate-200 dark:selection:bg-slate-800 selection:text-slate-900 dark:selection:text-white overflow-x-hidden font-sans">
      {/* Premium Desktop Mouse tracking accent cursor */}
      <CustomCursor />

      {/* HEADER NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-slate-50/80 dark:bg-[#030303]/80 border-b border-slate-200 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4.5 flex items-center justify-between">
          
          {/* Logo element */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(249,93,2,0.25)] hover:scale-105 active:scale-95 transition-transform duration-300">
              <HLogo className="w-full h-full" />
            </div>
            <div>
              <span className="font-display font-bold text-base tracking-tight text-slate-900 dark:text-white block uppercase">
                {portfolioData.name}
              </span>
              <span className="text-[10px] font-sans text-slate-500 uppercase tracking-widest block -mt-1 font-semibold">
                CSE Engineer
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 whitespace-nowrap text-xs font-sans font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">
            <a href="#about" className="hover:text-slate-900 dark:hover:text-white transition-colors relative group">
              <span>About</span>
              <span className={`absolute bottom-[-18px] left-0 right-0 h-0.5 ${currentColors.bg} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </a>
            <a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors relative group">
              <span>Expertise</span>
              <span className={`absolute bottom-[-18px] left-0 right-0 h-0.5 ${currentColors.bg} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </a>
            <a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors relative group">
              <span>Pipelines</span>
              <span className={`absolute bottom-[-18px] left-0 right-0 h-0.5 ${currentColors.bg} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </a>
            <a href="#algorithms-sandbox" className="hover:text-slate-900 dark:hover:text-white transition-colors relative group">
              <span>Playground</span>
              <span className={`absolute bottom-[-18px] left-0 right-0 h-0.5 ${currentColors.bg} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </a>
            <a href="#journey" className="hover:text-slate-900 dark:hover:text-white transition-colors relative group">
              <span>Journey</span>
              <span className={`absolute bottom-[-18px] left-0 right-0 h-0.5 ${currentColors.bg} scale-x-0 group-hover:scale-x-100 transition-transform origin-left`} />
            </a>
          </nav>

          {/* Action Header Button */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-sm dark:shadow-none"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-505 dark:text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            </button>
            <a
              id="header-ping-handshake"
              href="#contact"
              className={`glow-btn px-5 py-2.5 bg-gradient-to-r ${currentColors.progress} hover:opacity-95 text-white dark:text-[#05070e] font-sans font-bold text-xs rounded-xl transition-all shadow-md tracking-wide`}
            >
              Get in Touch
            </a>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-sm dark:shadow-none"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? <Sun className="w-4.5 h-4.5 text-amber-505 dark:text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-indigo-600 dark:text-indigo-400" />}
            </button>
            <button
              id="mobile-hamburguer-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-450 hover:text-slate-900 dark:hover:text-white rounded-xl cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-50/95 dark:bg-[#030303]/95 border-b border-slate-200 dark:border-white/5 px-6 py-6 space-y-4 font-sans text-xs flex flex-col uppercase tracking-wider font-semibold shadow-xl">
            <a
              id="mobile-nav-about"
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • ABOUT
            </a>
            <a
              id="mobile-nav-skills"
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • EXPERTISE
            </a>
            <a
              id="mobile-nav-projects"
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • PIPELINES
            </a>
            <a
              id="mobile-nav-algo-lab"
              href="#algorithms-sandbox"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • PLAYGROUND
            </a>
            <a
              id="mobile-nav-journey"
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • JOURNEY TIMELINE
            </a>
            <a
              id="mobile-nav-contact"
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors py-1"
            >
              • SEND A MESSAGE
            </a>
          </div>
        )}
      </header>

      {/* CORE PORTFOLIO SECTIONS */}
      <main className="max-w-6xl mx-auto">
        {/* HERO SECTION */}
        <AestheticHero portfolioData={portfolioData} />

        {/* CORE ABOUT MISSION SUMMARY BLOCK */}
        <section id="about" className="max-w-5xl mx-auto px-4 py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-center border-b border-slate-200 dark:border-white/5 relative">
          <div className="md:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className={`text-xs font-semibold tracking-widest ${currentColors.text} uppercase block`}>Mission</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-tight">
                Engineering Objectives
              </h2>
            </div>
            <div className={`h-1 w-14 bg-gradient-to-r ${currentColors.progress} rounded-full`} />
            <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed font-sans font-light">
              {portfolioData.aboutText}
            </p>
          </div>

          {/* Refined Academics Highlights Bento Card */}
          <div className="md:col-span-5">
            <div className="premium-card p-6 sm:p-8 rounded-2xl relative overflow-hidden">
              
              <h3 className={`text-xs font-semibold mb-6 flex items-center gap-2 uppercase tracking-wider ${currentColors.text}`}>
                <GraduationCap className="w-5 h-5 text-sky-505 dark:text-sky-400" />
                <span>Academic &amp; Research Highlights</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-white/5">
                  <div className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 shrink-0">
                    <GraduationCap className="w-4.5 h-4.5 text-sky-605 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Academics</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-0.5">B.Sc. in Computer Science & Engineering</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start pb-4 border-b border-slate-200 dark:border-white/5">
                  <div className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 shrink-0">
                    <Cpu className="w-4.5 h-4.5 text-indigo-605 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Focus &amp; ML Models</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-0.5">Classification layers and 1D CNN heart signal quantizations</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="p-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 shrink-0">
                    <Layers className="w-4.5 h-4.5 text-emerald-605 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Deployments</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-light mt-0.5">Systems optimization with low-latency network bindings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPONENT RENDER SECTIONS */}
        <SkillsBento skills={skills} portfolioData={portfolioData} />

        <ProjectsGrid projects={projects} portfolioData={portfolioData} />

        <AlgoVisualizer portfolioData={portfolioData} />

        <InteractiveTerminal portfolioData={portfolioData} skills={skills} projects={projects} />

        <TimelineJourney experiences={experiences} portfolioData={portfolioData} />

        <ContactSection portfolioData={portfolioData} />
      </main>

      {/* CORE FOOTER COMPILATION SYSTEMS */}
      <footer className="border-t border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#030303] py-12">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 text-center md:text-left gap-4 font-sans">
          <div className="space-y-1">
            <p className="text-slate-600 dark:text-slate-400 font-semibold tracking-tight">&copy; 2026 {portfolioData.name}. All systems nominal.</p>
            <p className="text-slate-400 dark:text-slate-650 font-light text-[11px]">Designed dynamically under strict clean engineering specifications.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-slate-500">
            <a href={portfolioData.github} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</a>
            <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="hover:text-slate-900 dark:hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* SCROLL BACK TO HEAD FLOATER */}
      {showScrollTop && (
        <button
          id="scroll-to-top-anchor"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-45 p-3.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-600 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 animate-fade-in"
        >
          <ArrowUp className="w-5 h-5 text-sky-505 dark:text-sky-450" />
        </button>
      )}
    </div>
  );
}
