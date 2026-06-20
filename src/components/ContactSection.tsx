import React, { useState } from "react";
import { PortfolioData } from "../types";
import { Mail, Github, Linkedin, Twitter, Phone, Send, CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";

interface ContactSectionProps {
  portfolioData: PortfolioData;
}

export default function ContactSection({ portfolioData }: ContactSectionProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/mpqevlww", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setIsSubmitting(false);
        setSubmitStatus("error");
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus("error");
    }
  };

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-400", bg: "bg-sky-500 font-semibold", border: "border-sky-500", focus: "focus:border-sky-500/55 focus:ring-1 focus:ring-sky-500/20" };
      case "violet": return { text: "text-indigo-400", bg: "bg-indigo-600 font-semibold", border: "border-indigo-500", focus: "focus:border-indigo-500/55 focus:ring-1 focus:ring-indigo-500/20" };
      case "emerald": return { text: "text-emerald-400", bg: "bg-emerald-500 font-semibold", border: "border-emerald-500", focus: "focus:border-emerald-500/55 focus:ring-1 focus:ring-emerald-500/20" };
      case "amber": return { text: "text-amber-400", bg: "bg-amber-500 font-semibold", border: "border-amber-500", focus: "focus:border-amber-500/55 focus:ring-1 focus:ring-amber-500/20" };
      case "rose": return { text: "text-rose-400", bg: "bg-rose-500 font-semibold", border: "border-rose-500", focus: "focus:border-rose-500/55 focus:ring-1 focus:ring-rose-500/20" };
      case "orange": return { text: "text-orange-400", bg: "bg-orange-500 font-semibold", border: "border-orange-500", focus: "focus:border-orange-500/55 focus:ring-1 focus:ring-orange-500/20" };
    }
  };

  const colors = getThemeColorClass();

  return (
    <section id="contact" className="max-w-5xl mx-auto px-4 py-24 relative">
      {/* Grid partitioning info vs forms */}
      <div className="grid md:grid-cols-12 gap-12 relative z-10">
        
        {/* Info Column */}
        <div className="md:col-span-5 space-y-8 flex flex-col justify-start md:pt-2">
          <div className="space-y-4">
            <span className={`text-xs font-semibold tracking-widest ${colors.text} uppercase block`}>Get In Touch</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display leading-tight">
              Let's build something remarkable.
            </h2>
            <p className="text-slate-600 dark:text-slate-405 text-sm leading-relaxed font-sans font-light">
              I am currently looking for software engineering internships, research collaborations, or open-source projects. Feel free to shoot me a message or connect via social networks.
            </p>
          </div>

          {/* Social connections */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest font-sans">Direct Connections</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${portfolioData.email}`}
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-310 dark:hover:border-white/10 transition-all group cursor-pointer shadow-sm dark:shadow-none"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${colors.text} shrink-0`}>
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase font-semibold">Email Address</span>
                    <span className="text-sm font-sans font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{portfolioData.email}</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-400 dark:text-slate-500 shrink-0" />
              </a>

              <a
                href={portfolioData.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-310 dark:hover:border-white/10 transition-all group cursor-pointer shadow-sm dark:shadow-none"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${colors.text} shrink-0`}>
                    <Github className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase font-semibold">GitHub Profile</span>
                    <span className="text-sm font-sans font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">github.com/Hemal0651</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-400 dark:text-slate-500 shrink-0" />
              </a>

              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-310 dark:hover:border-white/10 transition-all group cursor-pointer shadow-sm dark:shadow-none"
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${colors.text} shrink-0`}>
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase font-semibold">LinkedIn Network</span>
                    <span className="text-sm font-sans font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">hemal-farouqe</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-400 dark:text-slate-500 shrink-0" />
              </a>

              {portfolioData.phone && (
                <a
                  href={`tel:${portfolioData.phone}`}
                  className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-310 dark:hover:border-white/10 transition-all group cursor-pointer shadow-sm dark:shadow-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${colors.text} shrink-0`}>
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase font-semibold">Phone Connection</span>
                      <span className="text-sm font-sans font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">{portfolioData.phone}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-400 dark:text-slate-500 shrink-0" />
                </a>
              )}

              {portfolioData.twitter && (
                <a
                  href={portfolioData.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hover:border-slate-310 dark:hover:border-white/10 transition-all group cursor-pointer shadow-sm dark:shadow-none"
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 rounded-lg group-hover:text-slate-900 dark:group-hover:text-white transition-colors ${colors.text} shrink-0`}>
                      <Twitter className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-sans tracking-wide uppercase font-semibold">X Feed (Twitter)</span>
                      <span className="text-sm font-sans font-medium text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white">@Hemal82501552</span>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-30 group-hover:opacity-100 transition-all text-slate-400 dark:text-slate-500 shrink-0" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Contact Form Column */}
        <div className="md:col-span-7 flex flex-col">
          <div className="premium-card p-6 sm:p-8 rounded-2xl relative flex-1 flex flex-col justify-between">
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 flex-1 justify-between">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white flex items-center gap-20 shrink-0">
                <div className="flex items-center gap-2">
                  <MessageSquare className={`w-4 h-4 ${colors.text}`} />
                  <span>Send a Message</span>
                </div>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter name"
                    required
                    className={`w-full bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans ${colors.focus}`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-sans text-slate-505 dark:text-slate-400 font-semibold uppercase tracking-wider">Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@domain.com"
                    required
                    className={`w-full bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans ${colors.focus}`}
                  />
                </div>
              </div>

              <div className="space-y-1.5 shrink-0">
                <label className="block text-xs font-sans text-slate-505 dark:text-slate-400 font-semibold uppercase tracking-wider">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Internship / Project Opportunity / General Query"
                  className={`w-full bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans ${colors.focus}`}
                />
              </div>

              <div className="space-y-1.5 flex-grow flex flex-col min-h-[160px] md:min-h-0">
                <label className="block text-xs font-sans text-slate-505 dark:text-slate-400 font-semibold uppercase tracking-wider shrink-0">Message Details</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Describe your project requests or timeline details here..."
                  required
                  className={`w-full flex-grow bg-slate-100/80 dark:bg-black/40 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white focus:outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 font-sans leading-relaxed resize-none ${colors.focus}`}
                />
              </div>

              <div className="flex items-center justify-between shrink-0">
                <div className="w-1/2">
                  {submitStatus === "success" && (
                    <div className="flex items-center space-x-2 text-xs text-emerald-600 dark:text-emerald-400 font-sans font-bold uppercase tracking-wider animate-pulse">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Message Sent!</span>
                    </div>
                  )}
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className={`glow-btn px-6 py-3 rounded-xl font-sans font-bold text-sm tracking-wide transition-all select-none flex items-center space-x-1.5 shadow-md cursor-pointer ${
                    isSubmitting
                      ? "bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/5 text-slate-500 dark:text-slate-650 cursor-not-allowed"
                      : `${colors.bg} text-white dark:text-[#030303]`
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
