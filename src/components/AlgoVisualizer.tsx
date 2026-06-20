import React, { useState, useEffect } from "react";
import { PortfolioData } from "../types";
import { Play, RotateCcw, BarChart2, ShieldCheck, Info, Sparkles } from "lucide-react";

interface AlgoVisualizerProps {
  portfolioData: PortfolioData;
}

export default function AlgoVisualizer({ portfolioData }: AlgoVisualizerProps) {
  const [activeTab, setActiveTab] = useState<"sort" | "search">("sort");

  // Sorting Visualizer State
  const [array, setArray] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [compareIndices, setCompareIndices] = useState<number[]>([]);
  const [swapIndices, setSwapIndices] = useState<number[]>([]);
  const [sortedIndices, setSortedIndices] = useState<number[]>([]);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0, elapsedSteps: 0 });
  const [delay, setDelay] = useState(120);

  // Binary Search State
  const [searchArray, setSearchArray] = useState<number[]>([]);
  const [searchTarget, setSearchTarget] = useState<number | null>(null);
  const [leftPointer, setLeftPointer] = useState<number>(-1);
  const [rightPointer, setRightPointer] = useState<number>(-1);
  const [midPointer, setMidPointer] = useState<number>(-1);
  const [searchFound, setSearchFound] = useState<boolean | null>(null);
  const [searching, setSearching] = useState(false);
  const [searchSteps, setSearchSteps] = useState<string[]>([]);

  // Generate random arrays on mount
  useEffect(() => {
    generateRandomArray();
    generateSearchArray();
  }, []);

  const generateRandomArray = () => {
    if (sorting) return;
    const newArray = Array.from({ length: 18 }, () => Math.floor(Math.random() * 85) + 15);
    setArray(newArray);
    setCompareIndices([]);
    setSwapIndices([]);
    setSortedIndices([]);
    setStats({ comparisons: 0, swaps: 0, elapsedSteps: 0 });
  };

  const generateSearchArray = () => {
    if (searching) return;
    const base = Array.from({ length: 16 }, () => Math.floor(Math.random() * 90) + 10);
    const sorted = [...base].sort((a, b) => a - b);
    setSearchArray(sorted);
    setSearchTarget(sorted[Math.floor(Math.random() * sorted.length)]);
    setLeftPointer(-1);
    setRightPointer(-1);
    setMidPointer(-1);
    setSearchFound(null);
    setSearchSteps([]);
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Bubble Sort algorithm with step visualizer
  const runBubbleSort = async () => {
    if (sorting) return;
    setSorting(true);
    setSortedIndices([]);
    const arr = [...array];
    const n = arr.length;
    let comparisons = 0;
    let swaps = 0;
    let elapsedSteps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setCompareIndices([j, j + 1]);
        setSwapIndices([]);
        comparisons++;
        elapsedSteps++;
        setStats({ comparisons, swaps, elapsedSteps });
        await sleep(delay);

        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swaps++;
          setStats({ comparisons, swaps, elapsedSteps });
          setSwapIndices([j, j + 1]);
          setArray([...arr]);
          await sleep(delay);
        }
      }
      setSortedIndices((prev) => [...prev, n - i - 1]);
    }
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setCompareIndices([]);
    setSwapIndices([]);
    setSorting(false);
  };

  // Step-by-step Binary Search visualizer
  const runBinarySearch = async () => {
    if (searching || searchTarget === null) return;
    setSearching(true);
    setSearchFound(null);
    setSearchSteps([]);

    let left = 0;
    let right = searchArray.length - 1;
    let steps: string[] = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setLeftPointer(left);
      setRightPointer(right);
      setMidPointer(mid);
      
      steps.push(`Pivot scan: checking index ${mid} [Value: ${searchArray[mid]}]`);
      setSearchSteps([...steps]);
      await sleep(700);

      if (searchArray[mid] === searchTarget) {
        steps.push(`Success: Value ${searchTarget} matched at index ${mid}!`);
        setSearchSteps([...steps]);
        setSearchFound(true);
        setSearching(false);
        return;
      }

      if (searchArray[mid] < searchTarget) {
        steps.push(`${searchArray[mid]} < ${searchTarget} -> Pruned left bounds`);
        left = mid + 1;
      } else {
        steps.push(`${searchArray[mid]} > ${searchTarget} -> Pruned right bounds`);
        right = mid - 1;
      }
      setSearchSteps([...steps]);
      await sleep(700);
    }

    setSearchFound(false);
    steps.push(`Unlisted: target element missing from structure.`);
    setSearchSteps([...steps]);
    setSearching(false);
  };

  const getThemeColorClass = () => {
    switch (portfolioData.themeColor) {
      case "cyan": return { text: "text-sky-600 dark:text-sky-400", bg: "bg-sky-500 font-semibold", border: "border-sky-500", fill: "bg-sky-500", textHover: "group-hover:text-sky-600 dark:group-hover:text-sky-400" };
      case "violet": return { text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 font-semibold", border: "border-indigo-500", fill: "bg-indigo-500", textHover: "group-hover:text-indigo-600 dark:group-hover:text-indigo-400" };
      case "emerald": return { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-500 font-semibold", border: "border-emerald-500", fill: "bg-emerald-500", textHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400" };
      case "amber": return { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-500 font-semibold", border: "border-amber-500", fill: "bg-amber-500", textHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400" };
      case "rose": return { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-500 font-semibold", border: "border-rose-500", fill: "bg-rose-500", textHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400" };
      case "orange": return { text: "text-orange-600 dark:text-orange-400", bg: "bg-orange-500 font-semibold", border: "border-orange-500", fill: "bg-orange-500" , textHover: "group-hover:text-orange-600 dark:group-hover:text-orange-400" };
    }
  };

  const colors = getThemeColorClass();

  return (
    <section id="algorithms-sandbox" className="max-w-4xl mx-auto px-4 py-24 border-b border-slate-200 dark:border-white/5 relative">
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header section */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <span className={`text-xs font-semibold tracking-widest ${colors.text} uppercase block`}>Interactive</span>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-2 font-display tracking-tight leading-tight">
          Algorithms Playground
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 leading-relaxed font-light font-sans">
          Witness algorithmic trade-offs interactively. Trace complex bubble divisions or logarithmic tree prunings visually.
        </p>

        {/* Tab switcher menu with rounded pills */}
        <div className="flex justify-center space-x-1.5 mt-8 max-w-[260px] mx-auto bg-slate-150/80 dark:bg-slate-900/40 p-1.5 border border-slate-200 dark:border-white/5 rounded-full backdrop-blur-md relative z-10">
          <button
            id="algo-tab-sort"
            onClick={() => { if (!sorting && !searching) setActiveTab("sort"); }}
            className={`flex-1 py-1.5 px-3.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "sort"
                ? `${colors.bg} text-white dark:text-[#030303] font-bold`
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Sort
          </button>
          <button
            id="algo-tab-search"
            onClick={() => { if (!sorting && !searching) setActiveTab("search"); }}
            className={`flex-1 py-1.5 px-3.5 rounded-full text-xs font-sans font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "search"
                ? `${colors.bg} text-white dark:text-[#030303] font-bold`
                : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Sandbox Box */}
      <div className="premium-card rounded-2xl p-4 sm:p-8 relative z-10 overflow-hidden">
        
        {/* Premium console header with proper negative space and title separation */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-widest font-bold text-slate-800 dark:text-white">Workspace Console Shell</span>
          </div>
          <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500">
            <BarChart2 className={`w-4 h-4 ${colors.text}`} />
            <span>Interactive-Sandbox</span>
          </div>
        </div>

        {activeTab === "sort" ? (
          <div className="space-y-6">
            {/* Array Bars (rounded elegant styling) */}
            <div className="h-[200px] w-full flex items-end justify-center gap-1 sm:gap-1.5 bg-slate-50 dark:bg-slate-950/60 p-3 sm:p-5 rounded-xl border border-slate-200 dark:border-white/5 relative overflow-hidden">
              {array.map((value, idx) => {
                let barColor = "bg-slate-300 dark:bg-slate-800/80 border-slate-400/50 dark:border-slate-700/50";
                
                if (compareIndices.includes(idx)) {
                  barColor = "bg-amber-500/90 border-amber-400/50 shadow-[0_0_10px_rgba(245,158,11,0.25)]";
                } else if (swapIndices.includes(idx)) {
                  barColor = "bg-rose-500/95 border-rose-400/50 shadow-[0_0_12px_rgba(244,63,94,0.4)]";
                } else if (sortedIndices.includes(idx)) {
                  barColor = `${colors.fill} border-transparent opacity-95 shadow-[0_0_8px_rgba(255,255,255,0.02)]`;
                }

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-slate-500 mb-1.5 hidden sm:block font-medium">{value}</span>
                    <div
                      className={`w-full rounded-t-md border transition-all duration-150 ${barColor}`}
                      style={{ height: `${value * 1.5}px` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Sorting controls panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center pt-2">
              <div className="md:col-span-5 flex flex-col sm:flex-row gap-2.5 w-full">
                <button
                  id="sort-trigger-run"
                  onClick={runBubbleSort}
                  disabled={sorting}
                  className={`glow-btn w-full sm:w-auto px-5 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    sorting
                      ? "bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/5 text-slate-500 dark:text-slate-600 cursor-not-allowed"
                      : `${colors.bg} text-white dark:text-[#030303]`
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{sorting ? "Processing Run..." : "Run Bubble Sort"}</span>
                </button>
                <button
                  id="sort-trigger-reset"
                  onClick={generateRandomArray}
                  disabled={sorting}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-sans text-xs font-semibold rounded-xl transition-colors flex items-center justify-center cursor-pointer select-none"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>Randomize</span>
                </button>
              </div>

              {/* Slider for delay control */}
              <div className="md:col-span-3 flex items-center space-x-2.5 font-sans text-xs text-slate-505 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-400">Delay:</span>
                <input
                  id="sort-speed-slider"
                  type="range"
                  min="30"
                  max="400"
                  value={430 - delay}
                  onChange={(e) => setDelay(430 - parseInt(e.target.value))}
                  disabled={sorting}
                  className={`w-full h-1 bg-slate-200 dark:bg-slate-900 border-none appearance-none cursor-pointer rounded-full ${
                    portfolioData.themeColor === "orange" ? "accent-orange-500" : "accent-sky-500"
                  }`}
                />
              </div>

              {/* Refined clean metrics indicators */}
              <div className="md:col-span-4 bg-slate-50 dark:bg-[#070912] p-2.5 border border-slate-200 dark:border-white/5 rounded-xl grid grid-cols-3 gap-1.5 text-center font-sans text-xs text-slate-605 dark:text-slate-450 w-full">
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Steps</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{stats.elapsedSteps}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Compares</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{stats.comparisons}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Swaps</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{stats.swaps}</span>
                </div>
              </div>
            </div>

            {/* Conceptual box */}
            <div className="p-5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl flex items-start gap-3.5">
              <Info className="w-4 h-4 text-slate-500 dark:text-slate-450 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-xs font-sans">
                <p className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                  <span>Complexity Analysis & Operational Profile</span>
                </p>
                <p className="text-slate-650 dark:text-slate-455 leading-relaxed font-light font-sans text-[12px] pt-1">
                  Average performance measures at <code className="text-slate-900 dark:text-white bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded">O(N²)</code> with static scaling constraints of <code className="text-slate-900 dark:text-white bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded">O(1)</code> space. Yellow elements indicate scan limits, while rose cards illustrate active data swaps.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Sorted Array Nodes (curvaceous round pills) */}
            <div className="w-full bg-slate-50 dark:bg-slate-950/60 p-4 sm:p-6 flex flex-wrap gap-1.5 sm:gap-2 justify-center items-center shadow-inner min-h-[145px] relative rounded-xl border border-slate-200 dark:border-white/5">
              {searchArray.map((value, idx) => {
                let nodeStyle = "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5";
                
                if (idx === midPointer) {
                  nodeStyle = "bg-rose-500 text-white border-rose-400 font-bold scale-110 shadow-[0_0_12px_rgba(244,63,94,0.35)]";
                } else if (idx === leftPointer) {
                  nodeStyle = "bg-amber-500 text-slate-950 border-amber-400 font-bold";
                } else if (idx === rightPointer) {
                  nodeStyle = "bg-indigo-600 text-white border-indigo-400 font-bold";
                } else if (leftPointer !== -1 && rightPointer !== -1 && (idx < leftPointer || idx > rightPointer)) {
                  nodeStyle = "bg-slate-200/50 dark:bg-white/2 text-slate-400 dark:text-slate-705 opacity-20 border-transparent";
                }

                return (
                  <button
                    key={idx}
                    id={`search-node-${idx}`}
                    onClick={() => { if (!searching) setSearchTarget(value); }}
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center font-mono text-[11px] sm:text-xs transition-transform cursor-pointer ${nodeStyle}`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>

            {/* Search inputs panel */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
              <div className="md:col-span-6 flex flex-col sm:flex-row gap-2.5 w-full">
                <button
                  id="search-trigger-run"
                  onClick={runBinarySearch}
                  disabled={searching || searchTarget === null}
                  className={`glow-btn w-full sm:w-auto px-5 py-2.5 rounded-xl font-sans font-bold text-xs tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    searching
                      ? "bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-white/5 text-slate-500 dark:text-slate-655 cursor-not-allowed"
                      : `${colors.bg} text-white dark:text-[#030303]`
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span>{searching ? "Searching Array..." : "Run Binary Search"}</span>
                </button>
                <button
                  id="search-trigger-reset"
                  onClick={generateSearchArray}
                  disabled={searching}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-sans text-xs font-semibold rounded-xl flex items-center justify-center transition-colors cursor-pointer select-none"
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1.5" />
                  <span>Regenerate</span>
                </button>
              </div>

              {/* Target Tracker */}
              <div className="md:col-span-3 font-sans text-xs text-slate-550 dark:text-slate-400 flex items-center justify-between sm:justify-start gap-2 w-full">
                <span className="font-semibold text-slate-600 dark:text-slate-550 font-sans">Target Value:</span>
                <span className={`px-3 py-1 bg-slate-100 dark:bg-[#070912] border border-slate-200 dark:border-white/5 rounded-lg font-bold text-sm ${colors.text}`}>
                  {searchTarget !== null ? searchTarget : "Null"}
                </span>
              </div>

              {/* Verification Badges */}
              <div className="md:col-span-3 flex justify-start sm:justify-end w-full">
                {searchFound === true && (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold flex items-center gap-1.5 animate-bounce-short">
                    <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                    <span>Element Found</span>
                  </div>
                )}
                {searchFound === false && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-450 px-3.5 py-1.5 rounded-xl font-sans text-xs font-bold flex items-center gap-1.5">
                    <Info className="w-4 h-4" />
                    <span>Not Found</span>
                  </div>
                )}
              </div>
            </div>

            {/* Run trace step-by-step logger */}
            <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-white/5 p-5 min-h-[110px] rounded-xl font-mono text-[11px] leading-relaxed relative">
              <span className="hidden xs:inline absolute top-3.5 right-4 text-[9px] text-slate-500 dark:text-slate-600 tracking-widest uppercase font-semibold font-sans">Runtime Execution Stack</span>
              <p className="text-slate-500 dark:text-slate-650 font-semibold mb-2">// Pivot search trace stream</p>
              <div className="space-y-1.5 text-slate-600 dark:text-slate-400 pl-3 border-l border-slate-200 dark:border-white/5 font-mono">
                {searchSteps.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-600 italic">Initiate search run to sample pivot splits...</p>
                ) : (
                  searchSteps.map((step, idx) => (
                    <p key={idx} className="flex items-center gap-1.5 font-mono text-slate-700 dark:text-slate-350">
                      <span className="text-emerald-500">&gt;</span>
                      <span>{step}</span>
                    </p>
                  ))
                )}
              </div>
            </div>

            {/* Educational Info */}
            <div className="p-5 bg-slate-50 dark:bg-white/3 border border-slate-200 dark:border-white/5 rounded-xl flex items-start gap-3.5">
              <Info className="w-4 h-4 text-slate-500 dark:text-slate-455 mt-0.5 flex-shrink-0" />
              <div className="space-y-1 text-xs font-sans">
                <p className="text-slate-900 dark:text-white font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Complexity Analysis & Pointer Mapping</span>
                </p>
                <p className="text-slate-650 dark:text-slate-455 leading-relaxed font-light font-sans text-[12px] pt-1">
                  Logarithmic binary search operates at worst-case <code className="text-slate-900 dark:text-white bg-slate-200 dark:bg-white/5 px-1.5 py-0.5 rounded">O(log N)</code> complexity. Yellow circles define the left active bound, indigo denotes the right active bound, and rose selects the midpoints.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
