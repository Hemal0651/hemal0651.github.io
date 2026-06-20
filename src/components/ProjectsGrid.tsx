import React, { useState, useRef } from "react";
import { Project, PortfolioData } from "../types";
import { Github, ExternalLink, Code, Layers, Cpu, Server, X, ArrowUpRight } from "lucide-react";

interface ProjectsGridProps {
  projects: Project[];
  portfolioData: PortfolioData;
}

interface InteractiveProjectCardProps {
  key?: string | number;
  project: Project;
  colors: any;
  getStatusClasses: (status: Project["status"]) => string;
  setSelectedProject: (project: Project) => void;
}

function InteractiveProjectCard({ project, colors, getStatusClasses, setSelectedProject }: InteractiveProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Smooth, responsive subtle physics tilt (max 8-10 degrees rotation limit)
    const rotX = -(y - yc) / 15;
    const rotY = (x - xc) / 15;
    
    setRotate({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      id={`project-card-${project.id}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`premium-card p-6 sm:p-8 rounded-2xl flex flex-col justify-between group relative transition-all`}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.018 : 1}, ${isHovered ? 1.018 : 1}, 1)`,
        boxShadow: isHovered 
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(100, 116, 139, 0.1)" 
          : "0 4px 20px -2px rgba(0, 0, 0, 0.05)",
        transformStyle: "preserve-3d",
        transition: isHovered ? "transform 0.05s linear, box-shadow 0.2s ease" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease",
      }}
    >
      {/* Interactive Glare overlay effect */}
      {isHovered && (
        <div 
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-[0.06] dark:opacity-[0.04] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 260px at ${rotate.y * 15 + 180}px ${-rotate.x * 15 + 180}px, rgba(255,255,255,1), transparent)`,
          }}
        />
      )}

      <div style={{ transform: "translateZ(15px)" }} className="transition-transform duration-200">
        {/* Ribbon Tag Status */}
        <div className="flex items-center justify-between mb-5">
          <span className="text-[11px] font-sans font-medium text-slate-650 dark:text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-md border border-slate-205 dark:border-white/5 uppercase tracking-wide">
            {project.category}
          </span>
          <span className={`text-[10px] font-sans font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border ${getStatusClasses(project.status)}`}>
            {project.status}
          </span>
        </div>

        {/* Info Block */}
        <h3 className={`text-xl font-bold font-display text-slate-900 dark:text-white transition-colors mb-3 ${colors.textHover}`}>
          {project.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-sans font-light">
          {project.description}
        </p>

        {/* Tech chip lists with rounded corners */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="bg-slate-100 dark:bg-white/5 text-slate-605 dark:text-slate-400 border border-slate-200 dark:border-white/5 px-2.5 py-1 text-xs rounded-lg font-sans transition-all duration-300 group-hover:bg-slate-200/50 dark:group-hover:bg-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="flex items-center justify-between pt-5 border-t border-slate-200 dark:border-white/5 mt-auto"
        style={{ transform: "translateZ(10px)" }}
      >
        <button
          id={`project-details-btn-${project.id}`}
          onClick={() => setSelectedProject(project)}
          className={`text-xs font-sans font-semibold tracking-wide text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer hover:underline`}
        >
          <span>Review Architecture Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
        
        {/* External Links */}
        <div className="flex items-center space-x-2">
          {project.githubUrl && (
            <a
              id={`project-github-link-${project.id}`}
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.demoUrl && (
            <a
              id={`project-demo-link-${project.id}`}
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors rounded-lg"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsGrid({ projects, portfolioData }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<"All" | Project["category"]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories: ("All" | Project["category"])[] = ["All", "AI/ML", "Web Dev", "Systems & Security", "Data Science"];

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500 font-semibold", border: "border-sky-500", textHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400" };
      case "violet": return { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 font-semibold", border: "border-indigo-500", textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" };
      case "emerald": return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500 font-semibold", border: "border-emerald-500", textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" };
      case "amber": return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500 font-semibold", border: "border-amber-500", textHover: "group-hover:text-amber-600 group-hover:text-amber-400" };
      case "rose": return { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500 font-semibold", border: "border-rose-500", textHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400" };
      case "orange": return { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500 font-semibold", border: "border-orange-500", textHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400" };
    }
  };

  const colors = getThemeColorClass();

  const getStatusClasses = (status: Project["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20";
      case "In Progress":
        return "bg-amber-50 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-500/20";
      case "Alpha Release":
        return "bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 border-sky-200 dark:border-sky-500/20";
      case "Concept":
        return "bg-pink-50 dark:bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-200 dark:border-pink-500/20";
    }
  };

  return (
    <section id="projects" className="bg-slate-100/50 dark:bg-[#030303]/30 border-y border-slate-200 dark:border-white/5 py-24 relative">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        {/* Header Block with filter menu centered and beautifully structured like SkillsBento */}
        <div className="text-center max-w-2xl mx-auto mb-16 relative">
          <span className={`text-xs font-semibold tracking-widest ${colors.text} uppercase block mb-2`}>Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-tight">
            Featured Pipelines
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-light font-sans max-w-xl mx-auto">
            Explore my curated portfolio showcasing multi-threaded systems architecture, embedded edge neural models, and secure cloud pipelines.
          </p>

          {/* Filter Pill List styled exactly like Engineering Toolbox */}
          <div className="flex flex-wrap justify-center gap-1.5 mt-8 max-w-2xl mx-auto bg-slate-150/80 dark:bg-slate-900/40 p-1.5 border border-slate-200 dark:border-white/5 rounded-2xl sm:rounded-full backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`project-cat-${cat.replace(/\s+/g, "_")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-sans tracking-wide font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? `${colors.bg} text-white dark:text-[#030303] font-bold shadow-lg`
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Clean, Premium Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <InteractiveProjectCard
              key={project.id}
              project={project}
              colors={colors}
              getStatusClasses={getStatusClasses}
              setSelectedProject={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* System Design Detail Drawer (Slide Modal) */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop wrapper */}
          <div className="absolute inset-0 bg-[#030303]/85 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

          {/* Modal box */}
          <div className="relative w-full max-w-2xl bg-white dark:bg-[#090b14] border border-slate-200 dark:border-white/10 shadow-2xl flex flex-col max-h-[90vh] z-10 text-slate-800 dark:text-slate-200 overflow-hidden rounded-2xl">
            
            {/* Header top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0b0e1a]">
              <div className="flex items-center space-x-2 font-sans text-xs text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <Code className={`w-4 h-4 ${colors.text}`} />
                <span>Technical Specifications</span>
              </div>
              <button
                id="close-project-details-modal"
                onClick={() => setSelectedProject(null)}
                className="p-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white rounded-lg cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Domain Metadata */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-white/5 pb-5 gap-3">
                <div>
                  <h3 className="text-2xl font-display font-medium text-slate-900 dark:text-white mb-2">{selectedProject.title}</h3>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>{selectedProject.category} Infrastructure</p>
                </div>
                <div className="flex items-center">
                  <span className={`text-xs font-sans font-semibold uppercase tracking-wide px-3 py-1 bg-slate-100 dark:bg-white/5 border rounded-lg ${getStatusClasses(selectedProject.status)}`}>
                    {selectedProject.status}
                  </span>
                </div>
              </div>

              {/* Technical Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans uppercase">Abstract & Documentation</h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-sans font-light">{selectedProject.details}</p>
              </div>

              {/* System Architecture Detail Block */}
              {selectedProject.architectureDetails && (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans uppercase flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-sky-500 dark:text-sky-400" />
                    <span>Deployment Pipeline & Data Flow</span>
                  </h4>
                  <div className="bg-slate-50 dark:bg-slate-950/60 rounded-xl p-5 border border-slate-200 dark:border-white/5 font-mono text-xs leading-relaxed relative">
                    <div className="text-slate-500 font-bold mb-3">// Architecture Design Parameters</div>
                    <div className="text-slate-700 dark:text-slate-300 pl-3 border-l border-slate-200 dark:border-white/5 space-y-3 font-sans">
                      <p className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-sky-500 dark:text-sky-400 shrink-0" />
                        <span><strong>Execution Pipeline:</strong> {selectedProject.architectureDetails}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                        <span><strong>Infrastructure:</strong> Dockerized Container Microservices</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                        <span><strong>Hosting Model:</strong> AWS EC2 Clusters / Elastic Load Balancers</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Technologies List */}
              <div className="space-y-3 pb-2">
                <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 font-sans uppercase">Technology Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 rounded-lg text-xs font-sans">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal actions footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-[#0a0d18] border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs font-sans">
              <span className="text-slate-500 font-light font-sans">Handshake verified</span>
              <div className="flex gap-2">
                <a
                  id="modal-github"
                  href={selectedProject.githubUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-350 dark:hover:border-white/20 text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
                <a
                  id="modal-demo"
                  href={selectedProject.demoUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center space-x-1.5 px-4 py-2 ${colors.bg} text-white dark:text-[#030303] font-bold rounded-lg hover:opacity-90 transition-all`}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Sandbox</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
