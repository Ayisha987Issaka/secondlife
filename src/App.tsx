import React, { useState } from 'react';
import { Header } from './components/Header';
import { UploadSection } from './components/UploadSection';
import { AnalysisResults } from './components/AnalysisResults';
import { GoalSelector } from './components/GoalSelector';
import { PresentationLanding } from './components/PresentationLanding';
import { ChooseDemoMethod } from './components/ChooseDemoMethod';
import { GHANA_PRESETS } from './data/ghanaPresets';
import { GhanaPresetItem, ObjectAnalysis, UserGoal } from './types';
import { RefreshCw, AlertTriangle, Camera } from 'lucide-react';

export function App() {
  const [currentAnalysis, setCurrentAnalysis] = useState<ObjectAnalysis | null>(null);
  const [currentGoal, setCurrentGoal] = useState<UserGoal>('home');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAnalysisFailed, setIsAnalysisFailed] = useState<boolean>(false);
  const [lastPayload, setLastPayload] = useState<{
    imageBase64: string | null;
    mimeType: string;
    textPrompt: string;
  } | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('');
  const [isAskingQuestion, setIsAskingQuestion] = useState<boolean>(false);
  const [adviceAnswer, setAdviceAnswer] = useState<string | null>(null);

  // Active method selection: 'real' (Option A: upload/photo) or 'demo' (Option B: presets)
  const [activeMethod, setActiveMethod] = useState<'real' | 'demo'>('real');

  // Trigger counters for direct camera or file browse
  const [openCameraTrigger, setOpenCameraTrigger] = useState(0);
  const [openFileTrigger, setOpenFileTrigger] = useState(0);

  // Reset counter to clear inputs across the entire application
  const [resetKey, setResetKey] = useState(0);

  // Cumulative circular metrics
  const [stats, setStats] = useState({
    divertedKg: 24.8,
    co2Kg: 46.2,
    pathwaysCount: 84,
  });

  // Start demo handler: smooth scroll to demo objects
  const handleStartDemo = () => {
    setActiveMethod('demo');
    setTimeout(() => {
      const demoSection = document.getElementById('choose-demo-method');
      if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Scroll to real object upload
  const handleScrollToUpload = () => {
    setActiveMethod('real');
    setTimeout(() => {
      const uploadSection = document.getElementById('real-object-upload-container');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Reset analysis handler
  const handleResetAnalysis = () => {
    setCurrentAnalysis(null);
    setSelectedPresetId('');
    setErrorMessage(null);
    setIsAnalysisFailed(false);
    setAdviceAnswer(null);
    setResetKey((prev) => prev + 1);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyzeAnother = () => {
    setCurrentAnalysis(null);
    setSelectedPresetId('');
    setErrorMessage(null);
    setIsAnalysisFailed(false);
    setAdviceAnswer(null);
    setActiveMethod('real');
    setResetKey((prev) => prev + 1);

    setTimeout(() => {
      const uploadSection = document.getElementById('real-object-upload-container');
      if (uploadSection) {
        uploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
  };

  // Handle choosing a curated Ghana demo item
  const handleSelectPreset = (preset: GhanaPresetItem) => {
    setSelectedPresetId(preset.id);
    setErrorMessage(null);
    setIsAnalysisFailed(false);
    setAdviceAnswer(null);
    setActiveMethod('demo');

    // Build complete analysis object from preset data
    const presetAnalysis: ObjectAnalysis = {
      ...preset.sampleAnalysis,
      sourceType: 'demo',
    };

    setCurrentAnalysis(presetAnalysis);

    // Smooth scroll to live AI results
    setTimeout(() => {
      const resultsEl = document.getElementById('live-ai-result-section');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleSelectGoal = (goal: UserGoal) => {
    setCurrentGoal(goal);
  };

  // Real multimodal AI image analysis
  const handleAnalyze = async (payload: {
    imageBase64: string | null;
    mimeType: string;
    textPrompt: string;
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setIsAnalysisFailed(false);
    setAdviceAnswer(null);
    setSelectedPresetId('');
    setActiveMethod('real');
    setLastPayload(payload);

    // 1. Add maximum analysis timeout of 30 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 30000);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          imageBase64: payload.imageBase64,
          mimeType: payload.mimeType,
          userGoal: currentGoal,
          textPrompt: payload.textPrompt,
        }),
      });

      clearTimeout(timeoutId);

      const data = await res.json();
      if (!res.ok || !data.success || !data.analysis) {
        setIsAnalysisFailed(true);
        setErrorMessage(data?.error || "Analysis temporarily unavailable.");
        return;
      }

      const freshAnalysis: ObjectAnalysis = {
        ...data.analysis,
        sourceType: payload.imageBase64 ? 'user_upload' : 'text_prompt',
        imageUrl: payload.imageBase64 || data.analysis.imageUrl,
        isHighDemandFallback: Boolean(data.isHighDemandFallback || data.analysis.isHighDemandFallback),
        highDemandNotice: data.highDemandNotice || data.analysis.highDemandNotice,
      };

      setCurrentAnalysis(freshAnalysis);
      setIsAnalysisFailed(false);

      // Update cumulative stats
      setStats((prev) => ({
        divertedKg: prev.divertedKg + 1.2,
        co2Kg: prev.co2Kg + 2.5,
        pathwaysCount: prev.pathwaysCount + 5,
      }));

      setTimeout(() => {
        const target = document.getElementById('live-ai-result-section');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } catch (err) {
      clearTimeout(timeoutId);
      console.error('Analysis request error:', err);
      setIsAnalysisFailed(true);
      setErrorMessage("Analysis temporarily unavailable.");
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleTryAgain = () => {
    if (lastPayload) {
      handleAnalyze(lastPayload);
    } else {
      handleAnalyzeAnother();
    }
  };

  const handleAskQuestion = async (question: string) => {
    if (!currentAnalysis) return;
    setIsAskingQuestion(true);
    try {
      const res = await fetch('/api/ask-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemName: currentAnalysis.itemName,
          currentGoal,
          question,
        }),
      });
      const data = await res.json();
      setAdviceAnswer(data.answer);
    } catch (err) {
      console.error('Advisor request error:', err);
      setAdviceAnswer('Keep the item clean and dry. Check for structural cracks and use protective gloves before cutting.');
    } finally {
      setIsAskingQuestion(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 font-sans flex flex-col selection:bg-emerald-200">
      {/* Sleek Minimal Header */}
      <Header
        stats={stats}
        onReset={handleResetAnalysis}
        hasActiveAnalysis={Boolean(currentAnalysis)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* 1. SIMPLE HOMEPAGE HERO (Requirement 8) */}
        <PresentationLanding
          onStartDemo={handleStartDemo}
          onSelectOptionA={handleScrollToUpload}
          onSelectOptionB={handleStartDemo}
        />

        {/* 2. UPLOAD AN OBJECT SECTION */}
        <div id="real-object-upload-container">
          <UploadSection
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
            resetKey={resetKey}
            openCameraTrigger={openCameraTrigger}
            openFileTrigger={openFileTrigger}
          />
        </div>

        {/* 3. CURATED GHANA DEMO OBJECTS */}
        <ChooseDemoMethod
          selectedPresetId={selectedPresetId}
          onSelectPreset={handleSelectPreset}
          onTriggerCamera={() => {
            setActiveMethod('real');
            setOpenCameraTrigger((prev) => prev + 1);
          }}
          onTriggerUpload={() => {
            setActiveMethod('real');
            setOpenFileTrigger((prev) => prev + 1);
          }}
          activeMethod={activeMethod}
          onSelectMethod={(method) => setActiveMethod(method)}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <div id="ai-loading-state" className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-6 text-center space-y-2 shadow-xs animate-pulse">
            <RefreshCw className="w-8 h-8 text-emerald-600 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-emerald-950">
              SecondLife AI is analyzing your object...
            </h3>
            <p className="text-xs text-emerald-800 max-w-sm mx-auto">
              Scanning material composition, condition, hazards, and generating circular blueprints.
            </p>
          </div>
        )}

        {/* Error State if Image Analysis Fails */}
        {isAnalysisFailed && !isLoading && (
          <div id="ai-error-state" className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-6 text-center space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-rose-950">
              Analysis temporarily unavailable.
            </h3>
            <p className="text-xs text-rose-800 max-w-sm mx-auto">
              Please try again, or use a Demo Object.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2.5 flex-wrap">
              <button
                id="try-again-btn"
                type="button"
                onClick={handleTryAgain}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Try Again</span>
              </button>
              <button
                id="try-demo-btn"
                type="button"
                onClick={handleStartDemo}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
              >
                <span>Try Demo</span>
              </button>
            </div>
          </div>
        )}

        {/* 4. LIVE AI RESULT SECTION */}
        {currentAnalysis && !isLoading && (
          <div id="live-ai-result-section" className="space-y-4 pt-2">
            {/* Optional Goal Filter Ribbon */}
            <GoalSelector
              currentGoal={currentGoal}
              onSelectGoal={handleSelectGoal}
              recommendation={currentAnalysis.goalRecommendations?.[currentGoal]}
              itemName={currentAnalysis.itemName}
            />

            {/* Main Results + 5 Compact Circular Pathway Cards */}
            <AnalysisResults
              analysis={currentAnalysis}
              currentGoal={currentGoal}
              onAskQuestion={handleAskQuestion}
              isAskingQuestion={isAskingQuestion}
              adviceAnswer={adviceAnswer}
              onAnalyzeAnother={handleAnalyzeAnother}
              onResetAnalysis={handleResetAnalysis}
            />
          </div>
        )}
      </main>

      {/* Clean Minimal Footer */}
      <footer className="bg-white border-t border-stone-200 mt-10 py-6 text-center text-xs text-stone-500 space-y-1.5">
        <div className="flex items-center justify-center gap-2 font-bold text-stone-700">
          <span>🇬🇭 SecondLife AI</span>
          <span>•</span>
          <span>Repair • Reuse • Resell • Donate • Recycle</span>
        </div>
        <p className="max-w-md mx-auto px-4 text-stone-400 text-[11px]">
          Inspect structural stability and wear before starting DIY repairs.
        </p>
      </footer>
    </div>
  );
}
export default App;
