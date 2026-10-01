import React, { useState } from 'react';
import { Upload, PlayCircle, ChevronDown, ChevronUp, ShieldCheck, Sparkles, Wrench, DollarSign, HeartHandshake, Recycle } from 'lucide-react';

interface PresentationLandingProps {
  onStartDemo: () => void;
  onSelectOptionA: () => void;
  onSelectOptionB: () => void;
}

export const PresentationLanding: React.FC<PresentationLandingProps> = ({
  onStartDemo,
  onSelectOptionA,
  onSelectOptionB,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="homepage-hero" className="space-y-4">
      {/* 8. VERY SIMPLE HOMEPAGE HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-stone-900 via-stone-850 to-emerald-950 text-white p-7 sm:p-10 md:p-12 border border-stone-800 shadow-sm text-center">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-serif">
            SecondLife AI
          </h1>

          {/* Subtitle verbatim from requirement */}
          <p className="text-lg sm:text-xl md:text-2xl font-medium text-emerald-300">
            “Give unwanted objects a second life.”
          </p>

          {/* Short 1-sentence description */}
          <p className="text-xs sm:text-sm text-stone-300 max-w-lg mx-auto">
            Multimodal AI circular guidance for everyday objects in Ghana.
          </p>

          {/* 2 Prominent Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <button
              id="hero-upload-object-btn"
              type="button"
              onClick={onSelectOptionA}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-sm sm:text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-emerald-950/40"
            >
              <Upload className="w-5 h-5 text-stone-950" />
              <span>Upload an Object</span>
            </button>

            <button
              id="hero-try-demo-btn"
              type="button"
              onClick={() => {
                onSelectOptionB();
                onStartDemo();
              }}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold text-sm sm:text-base border border-stone-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlayCircle className="w-5 h-5 text-emerald-400" />
              <span>Try a Demo</span>
            </button>
          </div>

          {/* Pathway Line: Repair • Reuse • Resell • Donate • Recycle */}
          <div className="pt-4 border-t border-stone-800/80">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-stone-300">
              <span className="flex items-center gap-1.5 text-blue-300">
                <Wrench className="w-3.5 h-3.5" /> Repair
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1.5 text-purple-300">
                <Sparkles className="w-3.5 h-3.5" /> Reuse
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <DollarSign className="w-3.5 h-3.5" /> Resell
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1.5 text-rose-300">
                <HeartHandshake className="w-3.5 h-3.5" /> Donate
              </span>
              <span className="text-stone-600">•</span>
              <span className="flex items-center gap-1.5 text-teal-300">
                <Recycle className="w-3.5 h-3.5" /> Recycle
              </span>
            </div>
          </div>

          {/* Optional Expandable Details: Keeps homepage clean while retaining full depth */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-400 hover:text-stone-200 transition-colors"
            >
              <span>{showDetails ? 'Hide details' : 'How it works & safety notice'}</span>
              {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Section: How it Works & Safety Notice */}
      {showDetails && (
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3.5 text-xs text-stone-600 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <strong className="text-stone-900 font-bold block text-sm">1. Snap</strong>
              <p>Upload a photo or take a picture of any unwanted household object.</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <strong className="text-stone-900 font-bold block text-sm">2. Analyze</strong>
              <p>AI scans materials, condition, safety hazards, and local reuse potential.</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
              <strong className="text-stone-900 font-bold block text-sm">3. Second Life</strong>
              <p>Get instant practical plans to repair, upcycle, resell, donate or recycle.</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              <strong>Safety Screening:</strong> AI recommendations include automated screening for chemical residue, structural cracks, and food contact warnings. Always verify safety before cutting or load-bearing.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
