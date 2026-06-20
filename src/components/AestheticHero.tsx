import React, { useState } from "react";
import { PortfolioData } from "../types";
import { ChevronRight, FileCode, Cpu, Shield, ArrowRight, Layers, User, GraduationCap, Calendar, Network, MapPin, Coins, Globe, FileDown } from "lucide-react";
import { motion } from "motion/react";

interface AestheticHeroProps {
  portfolioData: PortfolioData;
}

const FILES = [
  {
    name: "ThreadPool.hpp",
    language: "cpp",
    code: `// Multi-threaded Task Scheduler Node
#pragma once
#include <vector>
#include <queue>
#include <thread>
#include <future>

class ThreadPool {
public:
    ThreadPool(size_t threads) {
        for(size_t i = 0; i<threads; ++i)
            workers.emplace_back([this] {
                while(true) {
                    std::function<void()> task;
                    {
                        std::unique_lock<std::mutex> lock(this->queue_mutex);
                        this->condition.wait(lock, [this]{ 
                            return this->stop || !this->tasks.empty(); 
                        });
                        if(this->stop && this->tasks.empty()) return;
                        task = std::move(this->tasks.front());
                        this->tasks.pop();
                    }
                    task();
                }
            });
    }
private:
    std::vector<std::thread> workers;
    std::queue<std::function<void()>> tasks;
};`
  },
  {
    name: "PacketSniffer.cpp",
    language: "cpp",
    code: `// High-Performance Network Ring Buffer
#include <iostream>
#include <pcap.h>

void packet_handler(u_char *args, const struct pcap_pkthdr *header, const u_char *packet) {
    std::cout << "[Packet Ingress] Size: " << header->len << " bytes" << std::endl;
    
    // Extract IP Header securely under boundary validation
    const struct ip_header *ip = (struct ip_header*)(packet + 14); 
    if (ip->ip_v == 4) {
        char src_ip[16], dst_ip[16];
        std::sprintf(src_ip, "%s", inet_ntoa(ip->ip_src));
        std::sprintf(dst_ip, "%s", inet_ntoa(ip->ip_dst));
        std::cout << "  Src IP: " << src_ip << " -> Dst IP: " << dst_ip << std::endl;
    }
}

int main() {
    char errbuf[PCAP_ERRBUF_SIZE];
    pcap_t *handle = pcap_open_live("eth0", BUFSIZ, 1, 1000, errbuf);
    if (handle == nullptr) {
        std::cerr << "Device binding failure: " << errbuf << std::endl;
        return 1;
    }
    pcap_loop(handle, 0, packet_handler, nullptr);
    return 0;
}`
  },
  {
    name: "ECGModel.py",
    language: "python",
    code: `# Quantized 1D CNN heart rate monitor classification
import torch
import torch.nn as nn

class ECGClassifier(nn.Module):
    def __init__(self, num_classes=2):
        super(ECGClassifier, self).__init__()
        self.features = nn.Sequential(
            nn.Conv1d(1, 32, kernel_size=15, stride=2, padding=7),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.MaxPool1d(2),
            nn.Conv1d(32, 64, kernel_size=7, stride=1, padding=3),
            nn.ReLU(),
            nn.AdaptiveAvgPool1d(1)
        )
        self.classifier = nn.Linear(64, num_classes)

    def forward(self, x):
        x = self.features(x)
        x = torch.squeeze(x, di=2)
        return self.classifier(x)`
  }
];

export default function AestheticHero({ portfolioData }: AestheticHeroProps) {
  const [activeFileIdx, setActiveFileIdx] = useState(0);
  const [activeTab, setActiveTab] = useState<"profile" | "code" | "web3">("profile");

  // Soft Premium Gradients & Styling Colors Map
  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return {
        text: "text-sky-400",
        bg: "bg-sky-500",
        border: "border-sky-500",
        textGrad: "from-sky-400 to-cyan-400",
        badge: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        glow: "rgba(14,165,233,0.15)",
        btnHover: "hover:bg-sky-600"
      };
      case "violet": return {
        text: "text-indigo-400",
        bg: "bg-indigo-600",
        border: "border-indigo-500",
        textGrad: "from-indigo-400 to-violet-400",
        badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        glow: "rgba(99,102,241,0.15)",
        btnHover: "hover:bg-indigo-700"
      };
      case "emerald": return {
        text: "text-emerald-400",
        bg: "bg-emerald-500",
        border: "border-emerald-500",
        textGrad: "from-emerald-400 to-teal-400",
        badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        glow: "rgba(16,185,129,0.15)",
        btnHover: "hover:bg-emerald-600"
      };
      case "rose": return {
        text: "text-rose-400",
        bg: "bg-rose-500",
        border: "border-rose-500",
        textGrad: "from-rose-400 to-pink-400",
        badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        glow: "rgba(244,63,94,0.15)",
        btnHover: "hover:bg-rose-600"
      };
      case "orange": return {
        text: "text-orange-500",
        bg: "bg-[#F97316]",
        border: "border-orange-500",
        textGrad: "from-orange-500 to-amber-400",
        badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        glow: "rgba(249,115,22,0.15)",
        btnHover: "hover:bg-orange-600"
      };
      default: return {
        text: "text-orange-500",
        bg: "bg-[#F97316]",
        border: "border-orange-500",
        textGrad: "from-orange-500 to-amber-400",
        badge: "bg-orange-500/10 text-orange-400 border-orange-500/20",
        glow: "rgba(249,115,22,0.15)",
        btnHover: "hover:bg-orange-600"
      };
    }
  };

  const themeColors = getThemeColorClass();

  const getGlowColor = (opacity: number) => {
    switch (portfolioData.themeColor) {
      case "cyan": return `rgba(14, 165, 233, ${opacity})`;
      case "violet": return `rgba(99, 102, 241, ${opacity})`;
      case "emerald": return `rgba(16, 185, 129, ${opacity})`;
      case "rose": return `rgba(244, 63, 94, ${opacity})`;
      case "orange":
      default:
        return `rgba(249, 115, 22, ${opacity})`;
    }
  };

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-20 border-b border-slate-200 dark:border-white/5">
      {/* Main Grid Wrapper */}
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Premium Bio */}
        <div className="md:col-span-7 space-y-8 flex flex-col justify-center">
          
          {/* Subtle Work Status Badge */}
          <div className="inline-flex items-start sm:items-center gap-2 px-3.5 py-1.5 sm:py-1 bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.05] rounded-2xl sm:rounded-full w-auto sm:w-fit max-w-full">
            <span className="relative flex h-2 w-2 shrink-0 mt-[4.5px] sm:mt-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-medium tracking-wide text-slate-600 dark:text-slate-300 leading-normal">
              Open to technical internships & open-source projects
            </span>
          </div>

          {/* Premium Headline & Paragraphs */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white font-display leading-[1.08] uppercase">
              Designing systems<br />
              <span className="text-slate-900 dark:text-white font-black">that scale,</span><br />
              <span className={`bg-gradient-to-r ${themeColors.textGrad} bg-clip-text text-transparent`}>
                engineered for precision.
              </span>
            </h1>
            
            <p className="text-slate-650 dark:text-slate-400 text-sm sm:text-base leading-relaxed font-sans font-light max-w-xl">
              Hi, I’m <strong className="text-slate-900 dark:text-white font-semibold">{portfolioData.name}</strong>, an undergraduate student pursuing a B.Sc. in Computer Science and Engineering at the University of Asia Pacific (UAP). Passionate about building robust backends with Python & Django, automating testing with Selenium, and conducting data communications and Web3 research.
            </p>
          </div>          {/* Luxury Rounded Bento Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
            <motion.div 
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05 }}
              className="premium-card p-4 rounded-xl flex items-center gap-3 bg-white/50 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/[0.03] shadow-sm cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-slate-200/40 dark:bg-white/5 text-sky-500 dark:text-sky-400 shrink-0">
                <Cpu className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-500 dark:text-slate-500 font-mono block tracking-wider">CORE</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wide truncate block">Py / Django</span>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="premium-card p-4 rounded-xl flex items-center gap-3 bg-white/50 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/[0.03] shadow-sm cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-slate-200/40 dark:bg-white/5 text-purple-600 dark:text-purple-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-500 dark:text-slate-500 font-mono block tracking-wider">TOOLS & DB</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wide truncate block">Git & Supabase</span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25 }}
              className="premium-card p-4 rounded-xl flex items-center gap-3 bg-white/50 dark:bg-white/[0.01] border border-slate-200/50 dark:border-white/[0.03] shadow-sm cursor-pointer"
            >
              <div className="p-2 rounded-lg bg-slate-200/40 dark:bg-white/5 text-emerald-600 dark:text-emerald-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-500 dark:text-slate-500 font-mono block tracking-wider">QA & TEST</span>
                <span className="text-[11px] font-bold text-slate-900 dark:text-white uppercase tracking-wide truncate block">Selenium</span>
              </div>
            </motion.div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
            <a
              id="hero-view-projects"
              href="#projects"
              className={`glow-btn px-6 py-3 rounded-xl ${themeColors.bg} text-white dark:text-[#030303] font-sans font-bold text-sm tracking-wide transition-all shadow-lg shadow-sky-500/10 flex items-center gap-2 cursor-pointer ${themeColors.btnHover}`}
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              id="hero-download-cv"
              href="/Hemal_Resume.pdf"
              download="Hemal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-orange-500/10 dark:bg-orange-500/10 border border-orange-500/20 dark:border-orange-500/35 hover:bg-[#F97316] hover:text-white dark:hover:text-[#030303] dark:hover:bg-[#F97316] text-[#F97316] dark:text-orange-400 font-sans font-bold text-sm transition-all flex items-center gap-2 shadow-sm"
            >
              <FileDown className="w-4 h-4 cursor-pointer" />
              <span>Download CV</span>
            </a>
            <a
              id="hero-handshake"
              href="#contact"
              className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-white font-sans font-semibold text-sm transition-all flex items-center gap-1.5"
            >
              Contact Me
            </a>
          </div>

        </div>

        {/* Right Column: Interactive Profile & Code Hub */}
        <div className="md:col-span-5 relative w-full flex flex-col justify-center px-1.5 sm:px-0">
          
          {/* Aesthetic Segmented Selector for the Hub */}
          <div className="flex max-w-full overflow-x-auto no-scrollbar whitespace-nowrap gap-1 mb-4 p-1 bg-slate-100/90 dark:bg-[#070a13] border border-slate-200/60 dark:border-white/10 rounded-xl w-fit self-center z-20 shadow-sm animate-fade-in">
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-3 sm:px-4 py-1.5 font-sans font-bold text-[10px] sm:text-[11px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                activeTab === "profile"
                  ? "bg-[#F97316] text-white shadow-md shadow-orange-500/20 font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Identity Pass</span>
            </button>
            <button
              onClick={() => setActiveTab("web3")}
              className={`px-3 sm:px-4 py-1.5 font-sans font-bold text-[10px] sm:text-[11px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                activeTab === "web3"
                  ? "bg-[#F97316] text-white shadow-md shadow-orange-500/20 font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              <span>Web3 Node</span>
            </button>
            <button
              onClick={() => setActiveTab("code")}
              className={`px-3 sm:px-4 py-1.5 font-sans font-bold text-[10px] sm:text-[11px] rounded-lg transition-all flex items-center gap-1.5 cursor-pointer flex-shrink-0 ${
                activeTab === "code"
                  ? "bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white shadow-sm font-extrabold"
                  : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Systems Code</span>
            </button>
          </div>

          {/* Interactive Core Display Platform */}
          <div className="relative min-h-[520px]">
            {activeTab === "profile" ? (
              <motion.div
                key="profile"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* Stunning Ambient Flow Glow behind avatar card (Using a soft blurred circle that matches screen scale and naturally dissolves to preserve layout bounds and eliminate cutoffs) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full ${
                  portfolioData.themeColor === "cyan" ? "bg-sky-500/20 dark:bg-sky-500/25" :
                  portfolioData.themeColor === "violet" ? "bg-indigo-500/20 dark:bg-indigo-500/25" :
                  portfolioData.themeColor === "emerald" ? "bg-emerald-500/20 dark:bg-emerald-500/25" :
                  portfolioData.themeColor === "rose" ? "bg-rose-500/20 dark:bg-rose-500/25" :
                  "bg-orange-500/20 dark:bg-[#F97316]/25"
                } filter blur-[40px] sm:blur-[75px] md:blur-[100px] pointer-events-none z-0`} />
                
                {/* Custom 3D-Interactive Style Pass card (Raw, premium, absolute confidence) */}
                <motion.div 
                  whileHover={{ y: -6, zIndex: 10, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(249,115,22,0.15)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative bg-white dark:bg-[#070912] p-5 rounded-2xl border border-slate-200 dark:border-white/15 shadow-xl select-none group"
                >
                  
                  {/* Holographic Dev Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />

                  {/* Header Authentication Ribbon */}
                  <div className="pb-3 mb-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-450">
                      <Network className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
                      <span className="font-bold tracking-wider text-[9px] uppercase">DEV CORE_AUTH STATUS</span>
                    </div>
                    {/* Active Live indicator dot */}
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">LIVE_SYS</span>
                    </div>
                  </div>

                  {/* HIGHLY PROMINENT FACE FRAME (A true masterpiece frame) */}
                  <div className="relative w-full aspect-[4/4.8] rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0c101d] border border-slate-200/80 dark:border-white/10 flex items-center justify-center shadow-inner">
                    <img
                      src="/hemal_avatar.png.jpg"
                      alt="Hemal Farouqe"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[center_20%] transform transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "flex";
                      }}
                    />
                    
                    {/* Fallback frame */}
                    <div className="hidden absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center text-center p-4">
                      <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-3">
                        <span className="font-mono font-bold text-orange-500 text-3xl">HF</span>
                      </div>
                      <span className="text-sm font-mono text-slate-400 uppercase tracking-widest font-bold">Hemal Farouqe</span>
                      <span className="text-xs font-sans text-slate-500 mt-1">UAP CSE Student</span>
                    </div>

                    {/* Edge-pinned Glowing Passing Year Watermark inside image frame */}
                    <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#030303]/75 backdrop-blur-md rounded-lg border border-white/15 text-[9px] font-mono font-bold uppercase tracking-wider text-white">
                      CLASS OF 2027
                    </div>
                  </div>

                  {/* Profile Details & Academic Specs Row */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-white/5 space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider font-sans leading-none">
                          Hemal Farouqe
                        </h3>
                        <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 tracking-wider">SEC: B • ID: VERIFIED</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] font-mono leading-none tracking-wider font-bold px-2.5 py-1 bg-orange-500/10 text-[#F97316] dark:text-orange-400 border border-orange-500/20 rounded-lg uppercase">
                        Active Internships
                      </span>
                    </div>

                    {/* Identity Metadata Block */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[11px] font-mono border-t border-slate-50 dark:border-white/[0.02] pt-3">
                      <div className="space-y-0.5">
                        <p className="text-slate-400 dark:text-slate-500 uppercase text-[8px] font-bold tracking-widest">Institution</p>
                        <p className="text-slate-800 dark:text-slate-300 font-bold truncate">Univ. of Asia Pacific</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-slate-400 dark:text-slate-500 uppercase text-[8px] font-bold tracking-widest">Discipline</p>
                        <p className="text-slate-800 dark:text-slate-300 font-bold">B.Sc. in CSE</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-slate-400 dark:text-slate-500 uppercase text-[8px] font-bold tracking-widest">Academic Status</p>
                        <p className="text-slate-800 dark:text-slate-300 font-bold">3rd Year, 2nd Sem</p>
                      </div>
                      <div className="space-y-0.5">
                        <p className="text-slate-400 dark:text-slate-500 uppercase text-[8px] font-bold tracking-widest">Graduation (Insh'Allah)</p>
                        <p className="text-slate-800 dark:text-emerald-500 dark:text-emerald-400 font-extrabold flex items-center gap-1">
                          June/July 2027
                        </p>
                      </div>
                    </div>

                    {/* Tactical footer details inside card */}
                    <div className="flex items-center gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-white/5 text-[10px] font-mono text-slate-500 dark:text-slate-450 justify-between">
                      <span className="flex items-center gap-1 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" /> Dhaka, Bangladesh
                      </span>
                      <span className="inline-flex items-center justify-center h-5 px-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-md font-bold text-slate-700 dark:text-slate-300 text-[9px] tracking-wide leading-none">
                        DEPT: COMPUTER SCIENCE
                      </span>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ) : activeTab === "web3" ? (
              <motion.div
                key="web3"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* Stunning Ambient Flow Glow behind Web3 card (Using a soft blurred circle that matches screen scale and naturally dissolves to preserve layout bounds and eliminate cutoffs) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full ${
                  portfolioData.themeColor === "cyan" ? "bg-sky-500/20 dark:bg-sky-500/25" :
                  portfolioData.themeColor === "violet" ? "bg-indigo-500/20 dark:bg-indigo-500/25" :
                  portfolioData.themeColor === "emerald" ? "bg-emerald-500/20 dark:bg-emerald-500/25" :
                  portfolioData.themeColor === "rose" ? "bg-rose-500/20 dark:bg-rose-500/25" :
                  "bg-orange-500/20 dark:bg-[#F97316]/25"
                } filter blur-[40px] sm:blur-[75px] md:blur-[100px] pointer-events-none z-0`} />
                
                {/* Beautiful active Web3 Ledger Card */}
                <motion.div 
                  whileHover={{ y: -6, zIndex: 10, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(249,115,22,0.15)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative bg-white dark:bg-[#070912] p-5 rounded-2xl border border-slate-200 dark:border-white/15 shadow-xl select-none group"
                >
                  {/* Holographic Dev Corner Brackets */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-500/40 rounded-tl-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-orange-500/40 rounded-tr-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-orange-500/40 rounded-bl-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-500/40 rounded-br-2xl opacity-80 group-hover:border-orange-500 transition-colors duration-300" />

                  {/* Header Authentication Ribbon */}
                  <div className="pb-3 mb-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-450">
                      <Network className="w-3.5 h-3.5 text-[#F97316] animate-pulse" />
                      <span className="font-bold tracking-wider text-[9px] uppercase">WEB3 DECENTRALIZATION NODE</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                      <span className="text-[9px] font-bold text-[#F97316] uppercase tracking-widest">RPC_ACTIVE</span>
                    </div>
                  </div>

                  {/* Title Description */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-orange-500/10 rounded-lg text-[#F97316] dark:text-orange-400 border border-orange-500/25">
                        <Globe className="w-5 h-5 animate-spin-slow" />
                      </div>
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-widest text-[#F97316] dark:text-orange-400 font-bold">Consensus Ecosystem & Operations</h4>
                        <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider font-sans leading-tight">Crypto Portfolio & Audits</h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-sans mt-2">
                      Experienced collaborator with international decentralized teams, securing consensus pipelines, and engineering automated messaging middleware.
                    </p>

                    {/* Timeline elements */}
                    <div className="space-y-2.5 pt-2 text-[11px] font-mono select-text">
                      <div className="p-2.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-150 dark:border-white/5 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-900 dark:text-white uppercase">IGSE Dev Lead / Automated Loops</span>
                          <span className="text-orange-500">2025 - 2026</span>
                        </div>
                        <p className="text-slate-500 leading-normal text-[10px]">
                          Led crypto token loops. Programmed automated notification bots & secure blockchain structures for optimized state validations.
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-150 dark:border-white/5 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-900 dark:text-white uppercase">Omega Community Manager</span>
                          <span className="text-orange-500 font-bold">2021 - 2022</span>
                        </div>
                        <p className="text-slate-500 leading-normal text-[10px]">
                          Managed full subscriber engagement, custom data forms collections, and scalability channels for Omega Crypto.
                        </p>
                      </div>

                      <div className="p-2.5 bg-slate-50 dark:bg-white/[0.02] border border-slate-150 dark:border-white/5 rounded-xl space-y-1">
                        <div className="flex items-center justify-between text-[10px] font-bold">
                          <span className="text-slate-900 dark:text-white uppercase">Sovereign Web3 & Blockchain Audit</span>
                          <span className="text-emerald-500 font-extrabold font-mono">COMPLETE</span>
                        </div>
                        <p className="text-slate-500 leading-normal text-[10px]">
                          Analyzed consensus validation and designed peer-to-peer ledger migration maps.
                        </p>
                      </div>
                    </div>

                    {/* Live Ticker Area */}
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-400">
                      <div className="flex justify-between p-1 px-2.5 bg-slate-100/50 dark:bg-slate-900/60 rounded border border-slate-200/40 dark:border-white/[0.02]">
                        <span>BLOCK</span>
                        <span className="text-slate-800 dark:text-slate-200 font-bold">#20174092</span>
                      </div>
                      <div className="flex justify-between p-1 px-2.5 bg-slate-100/50 dark:bg-slate-900/60 rounded border border-slate-200/40 dark:border-white/[0.02]">
                        <span>GAS RATE</span>
                        <span className="text-[#F97316] font-bold">12 Gwei</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="w-full relative"
              >
                {/* Stunning Ambient Flow Glow behind code card (Using a soft blurred circle that matches screen scale and naturally dissolves to preserve layout bounds and eliminate cutoffs) */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full ${
                  portfolioData.themeColor === "cyan" ? "bg-sky-500/20 dark:bg-sky-500/25" :
                  portfolioData.themeColor === "violet" ? "bg-indigo-500/20 dark:bg-indigo-500/25" :
                  portfolioData.themeColor === "emerald" ? "bg-emerald-500/20 dark:bg-emerald-500/25" :
                  portfolioData.themeColor === "rose" ? "bg-rose-500/20 dark:bg-rose-500/25" :
                  "bg-orange-500/20 dark:bg-[#F97316]/25"
                } filter blur-[40px] sm:blur-[75px] md:blur-[100px] pointer-events-none z-0`} />
                
                {/* SOURCE CODE CONTAINER */}
                <motion.div 
                  whileHover={{ y: -6, zIndex: 10, scale: 1.01, boxShadow: "0 25px 50px -12px rgba(14,165,233,0.15)" }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative bg-white dark:bg-[#090b14] overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl dark:shadow-2xl"
                >
                  
                  {/* Top Bar (Mock Editor Title) */}
                  <div className="px-5 py-3.5 border-b border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-[#0b0e1a] flex items-center justify-between">
                    <div className="flex space-x-1.5">
                      <span className="w-3 h-3 rounded-full bg-rose-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-amber-500/60 block"></span>
                      <span className="w-3 h-3 rounded-full bg-emerald-500/60 block"></span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-widest font-normal flex items-center gap-1">
                      <FileCode className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
                      <span>Source Codes</span>
                    </div>
                    <div className="w-8"></div>
                  </div>

                  {/* File Switcher Tabs */}
                  <div className="flex bg-slate-50/50 dark:bg-[#070a13] border-b border-slate-200 dark:border-white/5 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {FILES.map((file, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveFileIdx(idx)}
                        className={`px-4 py-2 border-r border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 ${
                          activeFileIdx === idx
                            ? "bg-white dark:bg-[#090d18] text-slate-900 dark:text-white font-semibold border-b-2 border-sky-500 dark:border-sky-450"
                            : "hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${idx === 0 ? "bg-amber-400" : idx === 1 ? "bg-sky-400" : "bg-emerald-400"}`} />
                        <span>{file.name}</span>
                      </button>
                    ))}
                  </div>

                  {/* Real Code Body with Beautiful Token colors */}
                  <div className="p-5 text-xs font-mono h-[340px] bg-white dark:bg-[#090d18] overflow-y-auto leading-relaxed text-slate-705 dark:text-slate-300 select-text">
                    {activeFileIdx === 0 && (
                      <pre>
                        <code>
                          <span className="text-slate-400 dark:text-sky-450 font-medium">// Multi-threaded Task Scheduler Node</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#pragma once</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;vector&gt;</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;queue&gt;</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;thread&gt;</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;future&gt;</span><br /><br />
                          
                          <span className="text-indigo-600 dark:text-indigo-400">class</span> <span className="text-amber-600 dark:text-amber-400">ThreadPool</span> &#123;<br />
                          <span className="text-indigo-600 dark:text-indigo-400">public</span>:<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-600 dark:text-emerald-400">ThreadPool</span>(<span className="text-pink-650 dark:text-pink-400">size_t</span> threads) &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">for</span>(<span className="text-pink-650 dark:text-pink-400">size_t</span> i = <span className="text-amber-600 dark:text-amber-500">0</span>; i &lt; threads; ++i)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;workers.<span className="text-sky-600 dark:text-sky-300">emplace_back</span>([<span className="text-indigo-600 dark:text-indigo-400">this</span>] &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">while</span>(<span className="text-amber-600 dark:text-amber-500">true</span>) &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;std::<span className="text-pink-605 dark:text-pink-400">function</span>&lt;<span className="text-pink-650 dark:text-pink-400">void</span>()&gt; task;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;std::<span className="text-sky-600 dark:text-sky-300">unique_lock</span>&lt;std::mutex&gt; lock(<span className="text-indigo-600 dark:text-indigo-400">this</span>-&gt;queue_mutex);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-605 dark:text-indigo-405">this</span>-&gt;condition.<span className="text-sky-600 dark:text-sky-300">wait</span>(lock, [<span className="text-indigo-650 dark:text-indigo-400">this</span>]&#123; <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">return</span> <span className="text-indigo-605 dark:text-indigo-405">this</span>-&gt;stop || !<span className="text-indigo-605 dark:text-indigo-405">this</span>-&gt;tasks.<span className="text-sky-600 dark:text-sky-300">empty</span>(); <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">if</span>(<span className="text-indigo-650 dark:text-indigo-405">this</span>-&gt;stop && <span className="text-indigo-650 dark:text-indigo-405">this</span>-&gt;tasks.<span className="text-sky-600 dark:text-sky-300">empty</span>()) <span className="text-pink-620 dark:text-pink-400">return</span>;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;task = std::<span className="text-sky-600 dark:text-sky-300">move</span>(<span className="text-indigo-650 dark:text-indigo-405">this</span>-&gt;tasks.<span className="text-sky-600 dark:text-sky-300">front</span>());<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-650 dark:text-indigo-455">this</span>-&gt;tasks.<span className="text-sky-600 dark:text-sky-300">pop</span>();<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-sky-600 dark:text-sky-300">task</span>();<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                          &#125;;
                        </code>
                      </pre>
                    )}

                    {activeFileIdx === 1 && (
                      <pre>
                        <code>
                          <span className="text-slate-400 dark:text-sky-450 font-medium">// High-Performance Network Ring Buffer</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;iostream&gt;</span><br />
                          <span className="text-pink-600 dark:text-pink-400">#include</span> <span className="text-emerald-600 dark:text-emerald-300">&lt;pcap.h&gt;</span><br /><br />
                          
                          <span className="text-pink-600 dark:text-pink-400">void</span> <span className="text-emerald-600 dark:text-emerald-300">packet_handler</span>(<span className="text-pink-600 dark:text-pink-400">u_char</span> *args, <span className="text-indigo-600 dark:text-indigo-400">const struct</span> pcap_pkthdr *hdr, <span className="text-indigo-600 dark:text-indigo-400">const u_char</span> *packet) &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span className="text-emerald-600 dark:text-emerald-300">"[Packet] Size: "</span> &lt;&lt; hdr-&gt;len &lt;&lt; <span className="text-emerald-600 dark:text-emerald-300">" bytes"</span> &lt;&lt; std::endl;<br /><br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-400 dark:text-sky-450 font-semibold">// boundary validation</span><br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-600 dark:text-indigo-400">const struct</span> ip_header *ip = (<span className="text-indigo-600 dark:text-indigo-400">struct</span> ip_header*)(packet + <span className="text-amber-600 dark:text-amber-500">14</span>);<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">if</span> (ip-&gt;ip_v == <span className="text-amber-600 dark:text-amber-500">4</span>) &#123;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-620 dark:text-pink-400">char</span> src[<span className="text-amber-500">16</span>], dst[<span className="text-amber-500">16</span>];<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;std::<span className="text-sky-600 dark:text-sky-300">sprintf</span>(src, <span className="text-emerald-400 dark:text-emerald-300">"%s"</span>, inet_ntoa(ip-&gt;ip_src));<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;std::<span className="text-sky-600 dark:text-sky-300">sprintf</span>(dst, <span className="text-emerald-400 dark:text-emerald-300">"%s"</span>, inet_ntoa(ip-&gt;ip_dst));<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;std::cout &lt;&lt; <span className="text-emerald-650 dark:text-emerald-300">"  IP Layer: "</span> &lt;&lt; src &lt;&lt; <span className="text-emerald-400 dark:text-emerald-300">" -&gt; "</span> &lt;&lt; dst &lt;&lt; std::endl;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                        </code>
                      </pre>
                    )}

                    {activeFileIdx === 2 && (
                      <pre>
                        <code>
                          <span className="text-slate-400 dark:text-sky-455 font-medium"># Quantized 1D CNN Classifier</span><br />
                          <span className="text-pink-600 dark:text-pink-400">import</span> torch<br />
                          <span className="text-pink-600 dark:text-pink-400">import</span> torch.nn <span className="text-pink-600 dark:text-pink-400">as</span> nn<br /><br />
                          
                          <span className="text-indigo-650 dark:text-indigo-405">class</span> <span className="text-amber-600 dark:text-amber-400">ECGClassifier</span>(nn.Module):<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-600 dark:text-indigo-400">def</span> <span className="text-emerald-605 dark:text-emerald-400">__init__</span>(self, num_classes=2):<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;super().__init__()<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.features = nn.Sequential(<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nn.Conv1d(<span className="text-amber-[#F97316] dark:text-amber-500">1</span>, <span className="text-amber-[#F97316] dark:text-amber-500">32</span>, kernel_size=<span className="text-amber-[#F97316] dark:text-amber-500">15</span>, stride=<span className="text-amber-[#F97316] dark:text-amber-500">2</span>),<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nn.BatchNorm1d(<span className="text-amber-600 dark:text-amber-505">32</span>),<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nn.ReLU(),<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;nn.MaxPool1d(<span className="text-amber-600 dark:text-amber-505">2</span>)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.classifier = nn.Linear(<span className="text-amber-[#F97316] dark:text-amber-500">32</span>, num_classes)<br /><br />
                          
                          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-indigo-650 dark:text-indigo-455">def</span> <span className="text-emerald-650 dark:text-emerald-400">forward</span>(self, x):<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x = self.features(x)<br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-605 dark:text-pink-400 font-bold">return</span> self.classifier(x)<br />
                        </code>
                      </pre>
                    )}
                  </div>

                  {/* Bottom Status Ribbon */}
                  <div className="px-5 py-2.5 bg-slate-50 dark:bg-[#070a13] border-t border-slate-200 dark:border-white/5 font-mono text-[10px] text-slate-505 dark:text-slate-400 flex justify-between items-center select-none">
                    <span>Encoding: UTF-8</span>
                    <span className={`font-semibold ${themeColors.text}`}>Tabs Synced</span>
                  </div>

                </motion.div>
              </motion.div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
