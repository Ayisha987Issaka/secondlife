import React, { useState } from 'react';
import { GHANA_PRESETS } from '../data/ghanaPresets';
import { GhanaPresetItem } from '../types';
import { Sparkles, ArrowRight, ChevronRight } from 'lucide-react';

interface ChooseDemoMethodProps {
  selectedPresetId?: string;
  onSelectPreset: (preset: GhanaPresetItem) => void;
  onTriggerCamera: () => void;
  onTriggerUpload: () => void;
  activeMethod: 'real' | 'demo';
  onSelectMethod: (method: 'real' | 'demo') => void;
}

export const ChooseDemoMethod: React.FC<ChooseDemoMethodProps> = ({
  selectedPresetId,
  onSelectPreset,
  activeMethod,
  onSelectMethod,
}) => {
  // 6 core items requested for Ghana presentation
  const requestedPresetIds = [
    'plastic-chair',       // Used plastic chair
    'used-tyre',           // Used tyre
    'old-clothes',         // Old T-shirt
    'sachet-bottles',      // Plastic bottle
    'wooden-furniture',    // Old wooden furniture
    'kufuor-gallon',       // Used cooking-oil container
  ];

  const demoObjects = requestedPresetIds
    .map((id) => GHANA_PRESETS.find((p) => p.id === id))
    .filter((p): p is GhanaPresetItem => Boolean(p));

  const otherPresets = GHANA_PRESETS.filter((p) => !requestedPresetIds.includes(p.id));
  const [showMorePresets, setShowMorePresets] = useState(false);

  return (
    <section id="choose-demo-method" className="space-y-4">
      {/* Section Header: Minimal & Clear */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Try a Demo Object</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
            Select an everyday item from Ghana to preview instant circular pathways.
          </p>
        </div>

        <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1 rounded-full font-medium self-start sm:self-auto">
          Instant Zero-Wait Results
        </span>
      </div>

      {/* 6 Curated Demo Object Cards: Compact, Visual, High Contrast */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {demoObjects.map((preset) => {
          const isSelected = selectedPresetId === preset.id;
          return (
            <button
              key={preset.id}
              id={`demo-object-${preset.id}`}
              type="button"
              onClick={() => {
                onSelectMethod('demo');
                onSelectPreset(preset);
              }}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-150 flex flex-col justify-between group relative ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-600 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-white hover:bg-stone-50 border-stone-200 hover:border-emerald-300 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl block group-hover:scale-110 transition-transform">
                    {preset.thumbnail}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                    Demo Object
                  </span>
                </div>

                <h3 className="text-sm font-bold text-stone-900 group-hover:text-emerald-900 transition-colors">
                  {preset.name}
                </h3>

                {preset.localNickname && (
                  <p className="text-[11px] text-stone-500 italic mt-0.5">
                    {preset.localNickname}
                  </p>
                )}

                {/* 1-sentence short summary */}
                <p className="text-xs text-stone-600 mt-1.5 leading-snug line-clamp-2">
                  {preset.tagline}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  <span>{isSelected ? 'Viewing' : 'View Pathways'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Optional: Show more Ghanaian presets */}
      {otherPresets.length > 0 && (
        <div className="pt-1 flex flex-col items-center">
          <button
            type="button"
            onClick={() => setShowMorePresets(!showMorePresets)}
            className="text-xs text-stone-500 hover:text-stone-800 font-semibold py-1 px-3 rounded-lg hover:bg-stone-200/60 transition-colors"
          >
            {showMorePresets ? '▲ Show Fewer Items' : `▼ Show More Items (${otherPresets.length} more)`}
          </button>

          {showMorePresets && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-3 w-full animate-in fade-in duration-150">
              {otherPresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    onSelectMethod('demo');
                    onSelectPreset(preset);
                  }}
                  className="p-3 rounded-xl border border-stone-200 hover:border-emerald-400 bg-white text-left text-xs transition-colors"
                >
                  <span className="text-xl mb-1 block">{preset.thumbnail}</span>
                  <p className="font-bold text-stone-900 line-clamp-1">{preset.name}</p>
                  <span className="text-[10px] text-emerald-700 font-medium block mt-0.5">
                    View &rarr;
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
