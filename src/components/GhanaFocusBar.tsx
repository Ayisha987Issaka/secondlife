import React from 'react';
import { GHANA_PRESETS } from '../data/ghanaPresets';
import { GhanaPresetItem } from '../types';
import { Sparkles, PlayCircle, CheckCircle2 } from 'lucide-react';

interface GhanaFocusBarProps {
  selectedPresetId?: string;
  onSelectPreset: (preset: GhanaPresetItem) => void;
}

export const GhanaFocusBar: React.FC<GhanaFocusBarProps> = ({ selectedPresetId, onSelectPreset }) => {
  // Highlights requested by user: plastic chair, tyre, t-shirt, glass bottle, electronics
  const keyDemoIds = ['plastic-chair', 'used-tyre', 'old-clothes', 'glass-bottle', 'broken-electronics'];

  return (
    <div id="try-a-demo-section" className="bg-white border-2 border-emerald-600/30 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
            <PlayCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Try a Demo — Sample Objects
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Instant Test (No Upload Needed)
              </span>
            </div>
            <p className="text-xs text-stone-600 mt-0.5">
              Select any sample object below to test the full 7-pathway circular analysis, safety screening, and repair blueprints instantly.
            </p>
          </div>
        </div>

        <div className="text-xs text-stone-500 flex items-center gap-1.5 self-start sm:self-auto bg-stone-50 px-3 py-1.5 rounded-lg border border-stone-200">
          <span>🇬🇭</span>
          <span className="font-medium text-stone-700">Real Ghanaian Everyday Items</span>
        </div>
      </div>

      {/* Grid of Preset Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {GHANA_PRESETS.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          const isPriorityDemo = keyDemoIds.includes(preset.id);
          return (
            <button
              key={preset.id}
              id={`preset-btn-${preset.id}`}
              type="button"
              onClick={() => onSelectPreset(preset)}
              className={`text-left p-3 rounded-xl border transition-all duration-150 flex flex-col justify-between group relative ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-600 shadow-xs ring-2 ring-emerald-500/30'
                  : isPriorityDemo
                  ? 'bg-stone-50/80 hover:bg-emerald-50/50 border-stone-200 hover:border-emerald-300'
                  : 'bg-white hover:bg-stone-100/80 border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-2xl mb-1.5 block group-hover:scale-110 transition-transform">
                  {preset.thumbnail}
                </span>
                {isSelected ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                ) : isPriorityDemo ? (
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                    Demo
                  </span>
                ) : null}
              </div>
              <div>
                <p className="text-xs font-bold text-stone-900 line-clamp-1 leading-tight">
                  {preset.name}
                </p>
                {preset.localNickname && (
                  <p className="text-[10px] text-stone-500 line-clamp-1 mt-0.5 italic">
                    {preset.localNickname}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
