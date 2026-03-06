import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Briefcase,
  Sparkles,
  Mail,
  Printer,
  Sun,
  Moon,
  Smile,
  Zap,
  Coffee,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Rocket,
  GraduationCap,
  Book,
  RefreshCw,
  Palette,
} from "lucide-react";

const TABS = [
  { id: "home", label: "Profile", icon: User },
  { id: "work", label: "Resume", icon: Briefcase },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "tech", label: "Skills", icon: Sparkles },
  { id: "comm", label: "Contact", icon: Mail },
];

const Sticker = ({ children, rotate, className, constraintsRef }: any) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    whileHover={{ scale: 1.05, zIndex: 100 }}
    whileDrag={{ scale: 1.1, rotate: 0, zIndex: 100 }}
    className={`absolute z-[60] cursor-grab active:cursor-grabbing ${className}`}
    style={{ rotate: `${rotate}deg`, touchAction: "none" }}
  >
    {children}
  </motion.div>
);

const SocialSticker = ({
  path,
  color,
  rotate,
  className,
  constraintsRef,
}: any) => (
  <motion.div
    drag
    dragConstraints={constraintsRef}
    whileHover={{ scale: 1.1, zIndex: 100 }}
    whileDrag={{ scale: 1.2, rotate: 0, zIndex: 100 }}
    className={`absolute z-[60] cursor-grab active:cursor-grabbing ${className}`}
    style={{ rotate: `${rotate}deg`, touchAction: "none" }}
  >
    <svg
      viewBox="0 0 24 24"
      width="48"
      height="48"
      overflow="visible"
      filter="url(#sticker-outline)"
      style={{ fill: color }}
    >
      <path d={path} />
    </svg>
  </motion.div>
);

const SOCIAL_PATHS = {
  github:
    "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
};

const PerforatedLine = () => (
  <div className="w-full relative h-3 flex items-center justify-between px-2 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.04] to-transparent dark:from-white/[0.04] pointer-events-none"></div>
    {Array.from({ length: 40 }).map((_, i) => (
      <div
        key={i}
        className="w-1.5 h-[1.5px] bg-black/30 dark:bg-black/90 rounded-full shadow-[0_1px_0_rgba(255,255,255,1)] dark:shadow-[0_1px_0_rgba(255,255,255,0.1)] relative z-10"
      ></div>
    ))}
  </div>
);

const RotatingThemeToggle = ({
  isDark,
  toggle,
}: {
  isDark: boolean;
  toggle: () => void;
}) => {
  return (
    <motion.button
      onClick={toggle}
      className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-white dark:bg-[#1a1a1a] border border-black/5 dark:border-white/10 shadow-sm cursor-pointer text-zinc-800 dark:text-zinc-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path
            id="circlePath"
            d="M 50, 50 m -30, 0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0"
            fill="transparent"
          />
          <text
            fontSize="9.5"
            fontWeight="600"
            letterSpacing="2.5"
            className="font-mono uppercase fill-current opacity-40"
          >
            <textPath href="#circlePath" startOffset="0%">
              TOGGLE THEME • TOGGLE THEME •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="relative z-10">
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </div>
    </motion.button>
  );
};

const InteractiveBrandToggle = ({ mode, onChange, isPrinting }: { mode: "portfolio" | "journal", onChange: (m: "portfolio" | "journal") => void, isPrinting: boolean }) => (
  <button
    onClick={() => onChange(mode === "portfolio" ? "journal" : "portfolio")}
    className="group flex items-center gap-3 sm:gap-4 text-left p-1.5 sm:p-2 -ml-1.5 sm:-ml-2 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative"
  >
    <div className="relative w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-[#1a1a1a] rounded-[1.25rem] shadow-sm border border-black/5 dark:border-white/10 flex items-center justify-center text-zinc-800 dark:text-zinc-200 shrink-0 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={mode}
          initial={{ y: 20, opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, scale: 0.8, rotate: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute"
        >
          {mode === "portfolio" ? <Printer className="w-6 h-6 md:w-7 md:h-7" /> : <Book className="w-6 h-6 md:w-7 md:h-7" />}
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="flex flex-col justify-center gap-1">
      <div className="flex items-center gap-2 relative">
        <div className="relative h-6 md:h-8 overflow-hidden w-[100px] md:w-[110px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mode}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute inset-0 font-display font-bold text-xl md:text-2xl tracking-tight text-zinc-900 dark:text-white flex items-center"
            >
              {mode === "portfolio" ? "Printfolio" : "Blog"}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-2 text-[11px] md:text-xs font-medium text-zinc-500">
        <div
          className={`w-2 h-2 rounded-full ${isPrinting ? "bg-amber-400 animate-pulse" : "bg-emerald-400"}`}
        ></div>
        {isPrinting ? "Printing..." : mode === "portfolio" ? "Ready" : "Reading Mode"}
      </div>
    </div>

    {/* Hand-drawn arrow and text */}
    <div className="absolute -top-12 left-8 md:-top-14 md:left-12 pointer-events-none flex flex-col items-center z-50">
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="flex flex-col items-center"
      >
        <span className="font-['Caveat',cursive] text-blue-500 dark:text-blue-400 text-xl md:text-2xl font-bold -rotate-6 mb-1 whitespace-nowrap ml-16">
          {mode === "portfolio" ? "Click for Blog!" : "Back to Portfolio"}
        </span>
        <svg width="60" height="50" viewBox="0 0 100 100" className="text-blue-500 dark:text-blue-400 ml-8">
          <path d="M80,10 Q50,10 20,70" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
          <path d="M20,70 L40,60 M20,70 L25,45" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  </button>
);

function PaperHeader({ activeTab, mode }: { activeTab: string, mode: "portfolio" | "journal" }) {
  if (mode === "journal") {
    return (
      <div className="w-full border-b border-black/10 dark:border-white/10 pb-6 mb-8 flex justify-between items-end">
        <div className="font-display font-bold text-3xl tracking-tight text-zinc-900 dark:text-white">
          Blog
        </div>
        <div className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
          VOL: 01
        </div>
      </div>
    );
  }

  const tab = TABS.find((t) => t.id === activeTab);
  return (
    <div className="w-full border-b border-black/10 dark:border-white/10 pb-6 mb-8 flex justify-between items-end">
      <div className="font-display font-bold text-3xl tracking-tight text-zinc-900 dark:text-white">
        {tab?.label}
      </div>
      <div className="font-mono text-xs font-medium text-zinc-400 dark:text-zinc-500">
        SEQ: 00{TABS.findIndex((t) => t.id === activeTab) + 1}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState<"portfolio" | "journal">("portfolio");
  const [activeTab, setActiveTab] = useState(TABS[0].id);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const containerRef = useRef(null);
  const constraintsRef = useRef(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const handleTabChange = (id: string) => {
    if (id === activeTab || isPrinting) return;
    setIsPrinting(true);
    setActiveTab(id);
    setTimeout(() => setIsPrinting(false), 600);
  };

  const handleModeChange = (newMode: "portfolio" | "journal") => {
    if (newMode === mode || isPrinting) return;
    setIsPrinting(true);
    setMode(newMode);
    setTimeout(() => setIsPrinting(false), 600);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#f0f0f0] dark:bg-[#0f0f0f] text-zinc-900 dark:text-zinc-100 font-sans flex flex-col items-center pt-4 md:pt-8 px-4 relative overflow-hidden transition-colors duration-300"
    >
      {/* Fixed Constraints Container for Stickers */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-0"
      ></div>

      {/* SVG Filter for Stickers */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter
            id="sticker-outline"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="1.5"
              result="OUTLINE"
            />
            <feFlood floodColor="white" floodOpacity="1" result="COLOR" />
            <feComposite
              in="COLOR"
              in2="OUTLINE"
              operator="in"
              result="COLORED_OUTLINE"
            />
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.5"
              floodColor="rgba(0,0,0,0.15)"
              result="SHADOW"
            />
            <feMerge>
              <feMergeNode in="SHADOW" />
              <feMergeNode in="COLORED_OUTLINE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      <SocialSticker
        path={SOCIAL_PATHS.github}
        color="#181717"
        rotate={12}
        className="top-6 left-[20%] hidden md:block"
        constraintsRef={constraintsRef}
      />
      <SocialSticker
        path={SOCIAL_PATHS.x}
        color="#000000"
        rotate={-8}
        className="top-4 left-[35%] hidden md:block"
        constraintsRef={constraintsRef}
      />
      <SocialSticker
        path={SOCIAL_PATHS.instagram}
        color="#E4405F"
        rotate={15}
        className="top-6 right-[28%] hidden md:block"
        constraintsRef={constraintsRef}
      />
      <SocialSticker
        path={SOCIAL_PATHS.linkedin}
        color="#0A66C2"
        rotate={-15}
        className="top-36 right-[6%] hidden md:block"
        constraintsRef={constraintsRef}
      />

      {/* Typewriter/Printer Machine Body */}
      <div className="w-full max-w-4xl relative flex flex-col items-center">
        {/* Machine Top Bevel (Stepped Design) */}
        <div className="w-[92%] md:w-[88%] h-8 bg-gradient-to-b from-zinc-300 to-zinc-200 dark:from-zinc-700 dark:to-zinc-800 rounded-t-3xl shadow-inner border-x border-t border-black/10 dark:border-white/10 relative z-30 -mb-2"></div>

        {/* Machine Main Body */}
        <div className="w-full bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900 rounded-t-[2rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.6)] border-x border-t border-black/5 dark:border-white/10 relative z-40 flex flex-col pt-8 pb-6 px-4 md:px-8">
          {/* Top Control Panel */}
          <div className="flex flex-col gap-6 relative z-10">
            {/* Top Row: Brand & Theme Toggle */}
            <div className="flex justify-between items-start sm:items-center gap-4 relative">
              {/* Left: Interactive Brand & Mode Switch */}
              <InteractiveBrandToggle mode={mode} onChange={handleModeChange} isPrinting={isPrinting} />

              {/* Center: Stickers */}
              <div className="absolute inset-0 pointer-events-none hidden md:block z-50">
                <Sticker rotate={-12} className="top-1 left-[32%] pointer-events-auto" constraintsRef={constraintsRef}>
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                    <Smile size={16} /> Hello!
                  </div>
                </Sticker>
                <Sticker rotate={15} className="-top-1 left-[48%] pointer-events-auto" constraintsRef={constraintsRef}>
                  <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                    <Zap size={16} /> Fast
                  </div>
                </Sticker>
                <Sticker rotate={-8} className="top-2 left-[64%] pointer-events-auto" constraintsRef={constraintsRef}>
                  <div className="bg-amber-400 text-black px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                    <Coffee size={16} /> Code
                  </div>
                </Sticker>
                <Sticker rotate={10} className="-top-2 left-[80%] pointer-events-auto" constraintsRef={constraintsRef}>
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-xl shadow-sm border-[3px] border-white dark:border-[#1a1a1a] font-display font-bold flex items-center gap-2 text-sm">
                    <Palette size={16} /> Design
                  </div>
                </Sticker>
              </div>

              {/* Right: Theme Toggle */}
              <div className="flex justify-end scale-75 sm:scale-100 origin-right shrink-0">
                <RotatingThemeToggle
                  isDark={isDark}
                  toggle={() => setIsDark(!isDark)}
                />
              </div>
            </div>

            {/* Bottom Row: Tabs */}
            <div className="w-full overflow-x-auto scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0 flex justify-center h-12">
              <AnimatePresence mode="wait">
                {mode === "portfolio" && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center bg-white/60 dark:bg-[#1a1a1a]/60 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-black/5 dark:border-white/10 w-max mx-auto"
                  >
                    {TABS.map((tab) => {
                      const isActive = activeTab === tab.id;
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleTabChange(tab.id)}
                          disabled={isPrinting}
                          className={`
                          relative flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap
                          ${isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}
                          ${isPrinting ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
                        `}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-black/5 dark:border-white/5"
                              transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                              }}
                            />
                          )}
                          <span className="relative z-10 flex items-center gap-1.5">
                            <Icon size={16} />
                            <span className="hidden sm:block">{tab.label}</span>
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Printer Slot (The hole) */}
        <div className="h-8 w-[96%] mx-auto bg-zinc-800 dark:bg-black rounded-b-2xl shadow-inner border-b-2 border-white/20 dark:border-white/5 flex items-center justify-center relative z-20 -mt-3">
          <div className="h-3 w-[98%] bg-zinc-900 dark:bg-zinc-950 rounded-full shadow-inner"></div>
        </div>
      </div>

      {/* Machine Bottom Half (Behind Paper) */}
      <div className="w-full max-w-4xl h-20 bg-gradient-to-b from-zinc-300 to-zinc-400 dark:from-zinc-800 dark:to-zinc-950 rounded-b-[2rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border-x border-b border-black/5 dark:border-white/5 relative z-10 -mt-4 flex flex-col items-center justify-end pb-3">
        {/* Bottom Bevel */}
        <div className="w-[92%] md:w-[88%] h-4 bg-gradient-to-b from-zinc-400 to-zinc-500 dark:from-zinc-900 dark:to-black rounded-b-xl opacity-50"></div>
      </div>

      {/* Paper Area */}
      <div
        className="w-[92%] md:w-full max-w-3xl flex-1 relative z-30 -mt-[90px]"
        style={{ clipPath: "inset(0 -100px -100px -100px)" }}
      >
        {/* Permanent Paper Stub (Stays in printer) */}
        <div
          className={`absolute top-0 left-0 w-full z-0 border-x border-black/5 dark:border-white/10 transition-colors duration-300 flex flex-col justify-end ${
            mode === "journal" 
              ? "bg-[#fdfbf7] dark:bg-[#1e1d1a]" 
              : "bg-white dark:bg-[#1a1a1a]"
          }`}
          style={{ height: "36px" }}
        >
          <PerforatedLine />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode === "journal" ? "journal" : activeTab}
            initial={{ y: "-100%", opacity: 0.5, rotateZ: 0 }}
            animate={{ y: 0, opacity: 1, rotateZ: 0 }}
            exit={{
              y: [0, 40, 1000],
              x: [0, 30, 200],
              rotateZ: [0, -15, -45],
              scale: [1, 1, 0.8],
              opacity: [1, 1, 0],
              transition: {
                duration: 0.6,
                times: [0, 0.2, 1],
                ease: "easeInOut",
              },
            }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{ 
              transformOrigin: "100% 6px", 
              marginTop: "24px",
              ...(mode === "journal" ? {
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 31px, ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 32px)`,
                backgroundAttachment: 'local',
                backgroundPosition: '0 2rem',
              } : {})
            }}
            className={`w-full shadow-xl dark:shadow-2xl rounded-b-3xl min-h-[45vh] flex flex-col relative border-x border-b border-black/5 dark:border-white/10 mb-16 transition-colors duration-300 z-10 ${
              mode === "journal" 
                ? "bg-[#fdfbf7] dark:bg-[#1e1d1a]" 
                : "bg-white dark:bg-[#1a1a1a]"
            }`}
          >
            {/* Perforated Tear Line (Top edge of the falling paper) */}
            <div className="absolute top-0 left-0 w-full rotate-180">
              <PerforatedLine />
            </div>

            {/* Paper Content */}
            <div className="flex-1 px-5 sm:px-8 md:px-12 pb-4 md:pb-6 pt-6 md:pt-8 paper-scroll overflow-y-auto overflow-x-hidden">
              <PaperHeader activeTab={activeTab} mode={mode} />
              {mode === "journal" ? (
                <BlogContent />
              ) : (
                <>
                  {activeTab === "home" && <HomeContent />}
                  {activeTab === "work" && <WorkContent />}
                  {activeTab === "projects" && <ProjectsContent />}
                  {activeTab === "tech" && <TechContent />}
                  {activeTab === "comm" && <CommContent />}
                </>
              )}
            </div>

            {/* Paper Bottom Edge */}
            <div className="h-8 w-full flex justify-center items-end pb-4 opacity-30">
              <div className="w-16 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeContent() {
  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-zinc-100 dark:bg-zinc-800 rounded-full border-4 border-white dark:border-[#1a1a1a] shadow-md flex items-center justify-center overflow-hidden">
        <img
          src="https://avatars.githubusercontent.com/u/71915211?v=4"
          alt="Avatar"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
          Hi, I'm Yifan. <br />
          <span className="text-zinc-400 dark:text-zinc-500">
            I build practical web and AI-assisted tools.
          </span>
        </h2>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-xl">
          Developer focused on product-minded engineering. I enjoy building
          useful software, from polished UI projects to small tools that solve
          specific real-world problems.
        </p>
      </div>

      <div className="pt-4">
        <div className="inline-flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2 rounded-full border border-black/5 dark:border-white/5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Open to collaboration and new opportunities
          </span>
        </div>
      </div>
    </div>
  );
}

function WorkContent() {
  const work = [
    {
      period: "2025 — Present",
      role: "Independent Developer",
      company: "Open Source Projects",
      desc: "Built and maintained projects such as Lumina, myPortfolio, and utility-focused tools with emphasis on usability, fast iteration, and clean implementation.",
    },
    {
      period: "2023 — 2025",
      role: "Frontend & Full-Stack Builder",
      company: "Personal and Community Projects",
      desc: "Delivered TypeScript and JavaScript apps, experimented with AI integrations, and improved developer workflows through automation and tooling.",
    },
  ];

  const education = [
    {
      period: "Academic + Self-Driven",
      role: "Computer Science Foundation",
      company: "Coursework and Independent Practice",
      desc: "Strengthened fundamentals through university-style assignments and open-source practice, with ongoing focus on software engineering and product delivery.",
    },
  ];

  return (
    <div className="relative space-y-10 animate-in fade-in duration-700">
      {/* Work Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-black/5 dark:border-white/5">
            <Briefcase size={18} />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Experience</h3>
        </div>
        <div className="space-y-4">
          {work.map((item, i) => (
            <div key={i} className="group block border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 sm:mb-3 gap-1 sm:gap-4">
                <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {item.role}
                </h4>
                <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md w-fit">
                  {item.period}
                </span>
              </div>
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {item.company}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education Section */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-black/5 dark:border-white/5">
            <GraduationCap size={18} />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">Education</h3>
        </div>
        <div className="space-y-4">
          {education.map((item, i) => (
            <div key={i} className="group block border border-black/10 dark:border-white/10 rounded-2xl p-5 sm:p-6 bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2 sm:mb-3 gap-1 sm:gap-4">
                <h4 className="text-lg sm:text-xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {item.role}
                </h4>
                <span className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 shrink-0 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md w-fit">
                  {item.period}
                </span>
              </div>
              <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                {item.company}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function TechContent() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Vite",
    "Tailwind CSS",
    "Motion",
    "Node.js",
    "SQLite",
    "GitHub Actions",
    "Chrome Extensions",
    "AI API Integration",
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
        Technologies I use across frontend-heavy products and utility tools,
        balancing developer speed with maintainability.
      </p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-4 py-2 bg-zinc-100 dark:bg-zinc-800/50 border border-black/5 dark:border-white/5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);

  const posts = [
    {
      title: "Building Lumina: AI-Powered Bookmark Search",
      date: "Jan 18, 2026",
      excerpt:
        "How I approached turning messy browser bookmarks into a searchable knowledge base with AI summaries and tags.",
      tags: ["AI", "Product"],
      content:
        "Lumina came from a simple pain point: bookmarks grow quickly, but finding what matters later is hard. I wanted a workflow where saved pages become useful context instead of clutter.\n\nI focused on three capabilities: concise summaries, meaningful tags, and semantic search. The project pushed me to think beyond basic keyword matching and design for intent-based retrieval.\n\nThe biggest lesson was product framing: users care less about the model and more about getting a useful answer fast.",
    },
    {
      title: "Designing a Portfolio That Feels Like a Product",
      date: "Dec 04, 2025",
      excerpt:
        "Notes on building this portfolio as a deliberate user experience, not just a static showcase page.",
      tags: ["Frontend", "Design"],
      content:
        "I treated this portfolio like a product interface. The printer metaphor gave me a strong interaction model, but I still prioritized legibility and quick scanning for hiring contexts.\n\nMotion is used to guide attention during tab transitions and content reveals. I kept animation scoped so performance stays stable and interaction remains clear.\n\nThis process reinforced a recurring principle: memorable visual language works best when paired with predictable structure.",
    },
    {
      title: "Small Tools, Real Utility: Side Project Strategy",
      date: "Nov 09, 2025",
      excerpt:
        "Why I keep building focused utility projects and what they taught me about engineering trade-offs.",
      tags: ["Engineering", "Learning"],
      content:
        "Not every project has to be huge. Focused tools like calculators, quality-of-life fixes, or workflow helpers are great environments to practice clear problem framing and shipping discipline.\n\nThese projects force practical decisions: what to automate, what to postpone, and how to keep scope under control while still delivering value.\n\nOver time, small wins compound into stronger engineering judgment and better product intuition.",
    },
  ];

  if (selectedPost !== null) {
    const post = posts[selectedPost];
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
      >
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-10">
          <button
            onClick={() => setSelectedPost(null)}
            className="group flex items-center gap-3 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:bg-zinc-100 dark:group-hover:bg-zinc-800 transition-colors">
              <ArrowLeft size={14} />
            </div>
            <span>Back to posts</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-3 py-1.5 rounded-full">
            <Coffee size={12} />
            <span>5 min read</span>
          </div>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
              {post.date}
            </span>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 leading-[1.1] pb-2">
            {post.title}
          </h2>
        </div>

        {/* Article Content */}
        <div className="space-y-6 sm:space-y-8">
          {post.content.split("\n\n").map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`text-zinc-700 dark:text-zinc-300 leading-relaxed text-base sm:text-lg md:text-xl font-serif tracking-wide ${
                i === 0
                  ? "first-letter:text-5xl sm:first-letter:text-7xl first-letter:font-display first-letter:font-black first-letter:text-zinc-900 dark:first-letter:text-white first-letter:mr-3 sm:first-letter:mr-4 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1"
                  : ""
              }`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* End of article marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 pt-8 border-t border-zinc-100 dark:border-zinc-800/50 flex justify-center gap-3"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-8">
        <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl font-serif italic">
          Thoughts, tutorials, and explorations on design, development, and the
          creative process.
        </p>
      </div>

      <div className="space-y-2">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            onClick={() => setSelectedPost(i)}
            className="group cursor-pointer py-6 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 relative"
          >
            {/* Hover background effect */}
            <div className="absolute inset-0 -mx-6 px-6 bg-zinc-50 dark:bg-zinc-800/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl -z-10"></div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 mb-3">
              <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500 shrink-0 md:w-24">
                {post.date}
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-zinc-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {post.title}
              </h3>
            </div>

            <div className="flex flex-col md:flex-row gap-2 md:gap-6">
              <div className="hidden md:block md:w-24 shrink-0"></div>
              <div className="flex-1">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4 font-serif text-base sm:text-lg">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-medium text-blue-500 flex items-center gap-1 transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    Read <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

function CommContent() {
  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-xl">
        Best way to reach me is through GitHub. I am open to discussions around
        frontend engineering, product UX, and practical AI applications.
      </p>

      <div className="space-y-4 max-w-xl">
        <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            GitHub
          </p>
          <a
            href="https://github.com/yifany-github"
            target="_blank"
            rel="noreferrer"
            className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            github.com/yifany-github
          </a>
        </div>
        <div className="p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/40">
          <p className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1">
            Email
          </p>
          <a
            href="mailto:71915211+yifany-github@users.noreply.github.com"
            className="text-sm sm:text-base font-medium text-blue-600 dark:text-blue-400 hover:underline break-all"
          >
            71915211+yifany-github@users.noreply.github.com
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsContent() {
  const projects = [
    {
      title: "myPortfolio",
      description: "A printer/typewriter-inspired personal portfolio built with React, Vite, TypeScript, and Motion.",
      image: "https://picsum.photos/seed/project1/600/400",
      tags: ["React", "TypeScript", "Vite"],
      link: "https://github.com/yifany-github/myPortfolio",
    },
    {
      title: "Lumina",
      description: "Transforms bookmarks into an AI-assisted, searchable knowledge base with summaries and semantic retrieval.",
      image: "https://picsum.photos/seed/project2/600/400",
      tags: ["JavaScript", "AI", "Search"],
      link: "https://github.com/yifany-github/Lumina",
    },
    {
      title: "intelliSpark_ui",
      description: "TypeScript-based UI project focused on structured frontend architecture and maintainable component patterns.",
      image: "https://picsum.photos/seed/project3/600/400",
      tags: ["TypeScript", "React", "UI"],
      link: "https://github.com/yifany-github/intelliSpark_ui",
    },
    {
      title: "sichuan-mahjong-scorer",
      description: "A polished Mahjong score calculator with GUI and persistent records, built for practical gameplay use.",
      image: "https://picsum.photos/seed/project4/600/400",
      tags: ["Python", "Desktop Tool", "GUI"],
      link: "https://github.com/yifany-github/sichuan-mahjong-scorer",
    },
  ];

  return (
    <div className="relative space-y-8 animate-in fade-in duration-700">
      <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed max-w-xl">
        Selected projects that represent my approach to frontend engineering and
        product experience.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group flex flex-col border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a1a] shadow-sm hover:shadow-md transition-all"
          >
            <div className="h-40 sm:h-48 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-xl font-display font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 flex-1">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Repo <ArrowRight size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
