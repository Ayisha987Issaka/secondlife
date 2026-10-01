import React from 'react';
import { Recycle, Sparkles, RotateCcw } from 'lucide-react';

interface HeaderProps {
  stats?: {
    divertedKg: number;
    co2Kg: number;
    pathwaysCount: number;
  };
  onReset?: () => void;
  hasActiveAnalysis?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ stats, onReset, hasActiveAnalysis }) => {
  return (
    <header id="app-header" className="bg-stone-900 text-stone-100 border-b border-stone-800 sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-xs shrink-0">
            <Recycle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-white font-serif">SecondLife AI</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-900/80 text-emerald-300 border border-emerald-700/50">
                🇬🇭 Ghana
              </span>
            </div>
            <p className="text-xs text-stone-400 hidden sm:block">
              Give unwanted objects a second life.
            </p>
          </div>
        </div>

        {/* Right actions: Compact stats or Reset button */}
        <div className="flex items-center gap-2.5">
          {stats && (
            <div className="hidden md:flex items-center gap-3 text-xs text-stone-400 border-r border-stone-800 pr-3 mr-0.5">
              <span><strong className="text-emerald-400 font-semibold">{stats.divertedKg.toFixed(1)} kg</strong> diverted</span>
              <span>•</span>
              <span><strong className="text-teal-400 font-semibold">{stats.co2Kg.toFixed(1)} kg</strong> CO₂ saved</span>
            </div>
          )}

          {hasActiveAnalysis && onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold transition-colors shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Analysis</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
