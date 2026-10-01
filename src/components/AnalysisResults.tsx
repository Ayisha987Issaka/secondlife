import React, { useState } from 'react';
import {
  Wrench,
  Sparkles,
  DollarSign,
  HeartHandshake,
  Recycle,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Camera,
  Leaf,
  HelpCircle,
  Clock,
  ShieldAlert,
  Info,
} from 'lucide-react';
import { ObjectAnalysis, UpcycleIdea, UserGoal } from '../types';

interface AnalysisResultsProps {
  analysis: ObjectAnalysis;
  currentGoal?: UserGoal;
  onAskQuestion?: (question: string) => void;
  isAskingQuestion?: boolean;
  adviceAnswer?: string | null;
  onAnalyzeAnother?: () => void;
  onResetAnalysis?: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  onAskQuestion,
  isAskingQuestion,
  adviceAnswer,
  onResetAnalysis,
}) => {
  // Track which pathway card is currently expanded ('repair' | 'upcycle' | 'resell' | 'donate' | 'recycle' | null)
  const [expandedPathway, setExpandedPathway] = useState<string | null>('repair');
  const [showImpactDetails, setShowImpactDetails] = useState(false);
  const [expandedIdeaId, setExpandedIdeaId] = useState<string | null>(analysis.upcycleIdeas[0]?.id || null);
  const [copiedListing, setCopiedListing] = useState(false);
  const [completedRepairSteps, setCompletedRepairSteps] = useState<Record<number, boolean>>({});
  const [customQuestion, setCustomQuestion] = useState('');

  const togglePathway = (pathway: string) => {
    setExpandedPathway((prev) => (prev === pathway ? null : pathway));
  };

  const copyListingToClipboard = () => {
    const text = `Title: ${analysis.resell.productTitle}\n\nCondition: ${analysis.resell.conditionGrade}\nIndicative Resale Value: GH₵ ${analysis.resell.suggestedPriceGHS.min} - ${analysis.resell.suggestedPriceGHS.max}\n\nDescription:\n${analysis.resell.marketplaceDescription}\n\nKeywords: ${analysis.resell.keywords.join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedListing(true);
    setTimeout(() => setCopiedListing(false), 2500);
  };

  const toggleRepairStep = (index: number) => {
    setCompletedRepairSteps((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim() || !onAskQuestion) return;
    onAskQuestion(customQuestion);
  };

  // Confidence badge
  const getConfidenceBadge = (confidence?: string) => {
    const level = confidence || 'High';
    if (level === 'High') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Confidence: High
        </span>
      );
    }
    if (level === 'Medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
          Confidence: Medium
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
        Confidence: Low
      </span>
    );
  };

  const safety = analysis.safetyAssessment || {
    overallRisk: 'Caution Required',
    hazardsDetected: ['Surface wear'],
    foodContactWarning: 'Not safe for direct food or drinking water contact without industrial sanitization.',
    safeHandlingAdvice: ['Wear protective gloves', 'Inspect joints before bearing weight'],
  };

  // 1-2 sentence concise condition summary
  const conciseCondition = analysis.conditionAssessment.length > 140
    ? analysis.conditionAssessment.split('.')[0] + '.'
    : analysis.conditionAssessment;

  // Short 1-sentence summaries for the 5 pathways
  const repairSummary = analysis.repair.possibleDamage
    ? `Fix ${analysis.repair.possibleDamage.toLowerCase()} in ~${analysis.repair.estimatedTime}.`
    : `Repairable in ~${analysis.repair.estimatedTime} using basic household tools.`;

  const upcycleSummary = analysis.upcycleIdeas[0]
    ? `Transform into ${analysis.upcycleIdeas[0].title.toLowerCase()} or other useful compound items.`
    : 'Creative DIY blueprints to transform into new functional creations.';

  const resellSummary = `Indicative resale value: GH₵ ${analysis.resell.suggestedPriceGHS.min}–${analysis.resell.suggestedPriceGHS.max} on local marketplaces.`;

  const donateSummary = analysis.donate.targetOrganizations[0]
    ? `Suitable for ${analysis.donate.targetOrganizations[0].type.toLowerCase()} and local apprentice shops.`
    : 'Give to community centers, schools, or apprentice workshops.';

  const recycleSummary = `Material: ${analysis.recycle.materialType} • ${analysis.recycle.recyclabilityRating} recyclability.`;

  return (
    <div id="analysis-results-container" className="space-y-6">
      {/* ========================================================================= */}
      {/* 2. MAIN RESULTS SCREEN: ONLY OBJECT, MATERIAL, CONDITION, CONFIDENCE, SAFETY */}
      {/* ========================================================================= */}
      <section
        id="main-results-card"
        className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-5"
      >
        {/* Top Bar: Live Analysis Status & Reset Button */}
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-stone-100 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                analysis.isHighDemandFallback ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'
              }`}
            />
            <span className="text-xs font-bold text-stone-700 uppercase tracking-wide">
              {analysis.isHighDemandFallback
                ? 'Instant Circular Analysis'
                : analysis.sourceType === 'user_upload'
                ? 'Photo Analysis Result'
                : 'Demo Object Result'}
            </span>
          </div>

          {onResetAnalysis && (
            <button
              id="top-start-new-analysis-btn"
              type="button"
              onClick={onResetAnalysis}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Start New Analysis</span>
            </button>
          )}
        </div>

        {/* High Demand Fallback Banner */}
        {analysis.isHighDemandFallback && (
          <div
            id="high-demand-fallback-banner"
            className="p-3.5 rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-900 flex items-start gap-2.5 text-xs leading-relaxed"
          >
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Instant Circular Pathways Active:</span>{' '}
              <span>
                {analysis.highDemandNotice ||
                  'Gemini AI experienced a temporary server demand spike. Instant circular blueprints were generated so your work is never interrupted.'}
              </span>
            </div>
          </div>
        )}

        {/* 5 Core Items specified by User: Object, Material, Condition, Confidence, Safety */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-4 flex-1">
            {/* 1. OBJECT */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-600 block">
                Object
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-stone-900 font-serif mt-0.5">
                {analysis.itemName}
              </h2>
            </div>

            {/* 2. MATERIAL */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-600 block">
                Material
              </span>
              <div className="flex items-center gap-2 flex-wrap mt-1">
                <span className="px-3 py-1 rounded-lg bg-stone-900 text-white text-xs font-bold">
                  {analysis.primaryMaterial}
                </span>
                {analysis.allMaterials?.filter((m) => m !== analysis.primaryMaterial).map((mat, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-100 border border-stone-200 text-stone-700 text-xs font-medium">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. CONDITION */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-600 block">
                Condition
              </span>
              <p className="text-sm text-stone-700 mt-1 leading-relaxed">
                {conciseCondition}
              </p>
            </div>

            {/* 4. CONFIDENCE */}
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-600 block mb-1">
                Confidence
              </span>
              {getConfidenceBadge(analysis.confidence)}
            </div>
          </div>

          {/* Uploaded or Demo Preview Image (if available) */}
          {analysis.imageUrl && (
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-stone-200 bg-stone-50 shadow-xs shrink-0">
              <img
                src={analysis.imageUrl}
                alt={analysis.itemName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* 5. SAFETY WARNING */}
        <div
          id="safety-warning-banner"
          className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 flex items-start gap-3 shadow-2xs"
        >
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="font-bold text-amber-950 block text-sm">
              Safety Warning
            </strong>
            <p className="text-amber-900 leading-relaxed">
              {safety.foodContactWarning || 'Inspect object for structural stability and sharp edges before reuse. Wear gloves during cutting or repair.'}
            </p>
            {safety.hazardsDetected && safety.hazardsDetected.length > 0 && (
              <p className="text-amber-800 text-[11px] pt-0.5">
                <strong>Hazards:</strong> {safety.hazardsDetected.join(' • ')}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CIRCULAR PATHWAYS AS COMPACT CARDS: REPAIR, UPCYCLE, RESELL, DONATE, RECYCLE */}
      {/* ========================================================================= */}
      <section id="circular-pathways-section" className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-bold text-stone-900 font-serif">
            Circular Pathways
          </h3>
          <span className="text-xs text-stone-600">
            Click View on any card to see full guide
          </span>
        </div>

        {/* --- CARD 1: REPAIR --- */}
        <div
          id="pathway-card-repair"
          className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
            expandedPathway === 'repair'
              ? 'bg-white border-blue-500 shadow-sm ring-2 ring-blue-400/20'
              : 'bg-white border-stone-200 hover:border-blue-300'
          }`}
        >
          {/* Compact Card Header */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Wrench className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-stone-900">Repair</h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800">
                    {analysis.repair.repairFeasibility}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {repairSummary}
                </p>
              </div>
            </div>

            <button
              id="view-repair-btn"
              type="button"
              onClick={() => togglePathway('repair')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-center ${
                expandedPathway === 'repair'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
              }`}
            >
              <span>{expandedPathway === 'repair' ? 'Hide Details' : 'View'}</span>
              {expandedPathway === 'repair' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Section: Detailed Instructions, Tools & Checklist */}
          {expandedPathway === 'repair' && (
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4 animate-in fade-in duration-150">
              {/* Feasibility & Supplies */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Diagnosed Problem</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.repair.possibleDamage}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Time Required</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.repair.estimatedTime}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Estimated Supplies</span>
                  <p className="font-bold text-emerald-700 mt-0.5">{analysis.repair.estimatedCostGHS || 'GH₵ 5 - 15'}</p>
                </div>
              </div>

              {/* Tools & Materials Needed */}
              <div>
                <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Tools & Materials Needed:
                </h5>
                <div className="flex items-center gap-2 flex-wrap">
                  {analysis.repair.toolsAndMaterials.map((tool, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-800 font-medium">
                      🔧 {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Interactive Checklist */}
              <div>
                <h5 className="text-xs font-bold text-stone-800 uppercase tracking-wider mb-2">
                  Step-by-Step Instructions (Check as you go):
                </h5>
                <div className="space-y-1.5">
                  {analysis.repair.repairSteps.map((step, idx) => {
                    const isChecked = completedRepairSteps[idx];
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleRepairStep(idx)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer flex items-start gap-2.5 transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 line-through opacity-80'
                            : 'bg-white border-stone-200 hover:border-blue-300 text-stone-800'
                        }`}
                      >
                        <button
                          type="button"
                          className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3" />}
                        </button>
                        <span><strong>Step {idx + 1}:</strong> {step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Safety Precautions */}
              {analysis.repair.safetyPrecautions && analysis.repair.safetyPrecautions.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Precautions:</strong> {analysis.repair.safetyPrecautions.join(' ')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- CARD 2: UPCYCLE --- */}
        <div
          id="pathway-card-upcycle"
          className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
            expandedPathway === 'upcycle'
              ? 'bg-white border-purple-500 shadow-sm ring-2 ring-purple-400/20'
              : 'bg-white border-stone-200 hover:border-purple-300'
          }`}
        >
          {/* Compact Card Header */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-stone-900">Upcycle</h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-purple-100 text-purple-800">
                    {analysis.upcycleIdeas.length} Projects
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {upcycleSummary}
                </p>
              </div>
            </div>

            <button
              id="view-upcycle-btn"
              type="button"
              onClick={() => togglePathway('upcycle')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-center ${
                expandedPathway === 'upcycle'
                  ? 'bg-purple-600 text-white'
                  : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
              }`}
            >
              <span>{expandedPathway === 'upcycle' ? 'Hide Details' : 'View'}</span>
              {expandedPathway === 'upcycle' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Section: Upcycle Ideas & Step-by-Step Blueprints */}
          {expandedPathway === 'upcycle' && (
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4 animate-in fade-in duration-150">
              <div className="space-y-3">
                {analysis.upcycleIdeas.map((idea: UpcycleIdea, idx: number) => {
                  const isIdeaExpanded = expandedIdeaId === idea.id;
                  return (
                    <div key={idea.id || idx} className="rounded-xl border border-stone-200 bg-white overflow-hidden">
                      <div
                        onClick={() => setExpandedIdeaId(isIdeaExpanded ? null : idea.id)}
                        className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-purple-50/30 transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                              #{idx + 1} {idea.category}
                            </span>
                            <span className="text-[10px] text-stone-600 flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {idea.timeRequired}
                            </span>
                            <span className="text-[10px] text-stone-600">
                              Difficulty: {idea.difficulty}
                            </span>
                            {idea.potentialEarningsGHS && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                                {idea.potentialEarningsGHS}
                              </span>
                            )}
                          </div>
                          <h5 className="text-sm font-bold text-stone-900">{idea.title}</h5>
                          <p className="text-xs text-stone-600 mt-0.5">{idea.description}</p>
                        </div>

                        <span className="text-xs text-purple-700 font-bold shrink-0">
                          {isIdeaExpanded ? 'Hide Steps' : 'View Steps'}
                        </span>
                      </div>

                      {isIdeaExpanded && (
                        <div className="p-4 border-t border-purple-100 bg-purple-50/20 space-y-3 text-xs">
                          <div>
                            <strong className="text-stone-800 block mb-1">Materials Needed:</strong>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              {idea.materialsNeeded.map((mat, mIdx) => (
                                <span key={mIdx} className="px-2 py-0.5 rounded bg-white border border-stone-200 text-stone-700 text-[11px]">
                                  • {mat}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <strong className="text-stone-800 block mb-1.5">Steps:</strong>
                            <ol className="space-y-1.5">
                              {idea.steps.map((step, sIdx) => (
                                <li key={sIdx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-stone-200">
                                  <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                    {sIdx + 1}
                                  </span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* --- CARD 3: RESELL --- */}
        <div
          id="pathway-card-resell"
          className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
            expandedPathway === 'resell'
              ? 'bg-white border-amber-500 shadow-sm ring-2 ring-amber-400/20'
              : 'bg-white border-stone-200 hover:border-amber-300'
          }`}
        >
          {/* Compact Card Header */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-stone-900">Resell</h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800">
                    GH₵ {analysis.resell.suggestedPriceGHS.min}–{analysis.resell.suggestedPriceGHS.max}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {resellSummary}
                </p>
              </div>
            </div>

            <button
              id="view-resell-btn"
              type="button"
              onClick={() => togglePathway('resell')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-center ${
                expandedPathway === 'resell'
                  ? 'bg-amber-600 text-white'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
              }`}
            >
              <span>{expandedPathway === 'resell' ? 'Hide Details' : 'View'}</span>
              {expandedPathway === 'resell' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Section: Marketplace Listing & Details */}
          {expandedPathway === 'resell' && (
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Price Range</span>
                  <p className="font-extrabold text-stone-900 mt-0.5">
                    GH₵ {analysis.resell.suggestedPriceGHS.min} – {analysis.resell.suggestedPriceGHS.max}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Condition Grade</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.resell.conditionGrade}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Platforms</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.resell.recommendedPlatforms.join(', ')}</p>
                </div>
              </div>

              {/* Ready-to-copy listing template */}
              <div className="p-4 rounded-xl bg-white border border-stone-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800">Pre-Written Listing Template:</span>
                  <button
                    type="button"
                    onClick={copyListingToClipboard}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-bold transition-colors"
                  >
                    {copiedListing ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedListing ? 'Copied!' : 'Copy Listing'}</span>
                  </button>
                </div>

                <div className="p-3 rounded-lg bg-stone-50 text-xs text-stone-700 space-y-1">
                  <p><strong>Title:</strong> {analysis.resell.productTitle}</p>
                  <p className="text-stone-600 whitespace-pre-line">{analysis.resell.marketplaceDescription}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- CARD 4: DONATE --- */}
        <div
          id="pathway-card-donate"
          className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
            expandedPathway === 'donate'
              ? 'bg-white border-rose-500 shadow-sm ring-2 ring-rose-400/20'
              : 'bg-white border-stone-200 hover:border-rose-300'
          }`}
        >
          {/* Compact Card Header */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-stone-900">Donate</h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-100 text-rose-800">
                    Community
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {donateSummary}
                </p>
              </div>
            </div>

            <button
              id="view-donate-btn"
              type="button"
              onClick={() => togglePathway('donate')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-center ${
                expandedPathway === 'donate'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100'
              }`}
            >
              <span>{expandedPathway === 'donate' ? 'Hide Details' : 'View'}</span>
              {expandedPathway === 'donate' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Section: Target Organizations & Tips */}
          {expandedPathway === 'donate' && (
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-3 animate-in fade-in duration-150 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {analysis.donate.targetOrganizations.map((org, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-stone-200">
                    <strong className="font-bold text-rose-900 block text-xs mb-1">{org.type}</strong>
                    <p className="text-stone-600 leading-snug">{org.suitability}</p>
                    <p className="text-[11px] text-stone-500 mt-1.5"><strong>Channels:</strong> {org.ghanaExamples}</p>
                  </div>
                ))}
              </div>

              {analysis.donate.preparationTips && analysis.donate.preparationTips.length > 0 && (
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <strong className="text-stone-800 block mb-1">Preparation Tips:</strong>
                  <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                    {analysis.donate.preparationTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* --- CARD 5: RECYCLE --- */}
        <div
          id="pathway-card-recycle"
          className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
            expandedPathway === 'recycle'
              ? 'bg-white border-teal-500 shadow-sm ring-2 ring-teal-400/20'
              : 'bg-white border-stone-200 hover:border-teal-300'
          }`}
        >
          {/* Compact Card Header */}
          <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-bold text-stone-900">Recycle</h4>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-teal-100 text-teal-800">
                    {analysis.recycle.recyclabilityRating}
                  </span>
                </div>
                <p className="text-xs text-stone-600 mt-1 leading-snug">
                  {recycleSummary}
                </p>
              </div>
            </div>

            <button
              id="view-recycle-btn"
              type="button"
              onClick={() => togglePathway('recycle')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors inline-flex items-center justify-center gap-1.5 shrink-0 self-end sm:self-center ${
                expandedPathway === 'recycle'
                  ? 'bg-teal-600 text-white'
                  : 'bg-teal-50 text-teal-800 hover:bg-teal-100'
              }`}
            >
              <span>{expandedPathway === 'recycle' ? 'Hide Details' : 'View'}</span>
              {expandedPathway === 'recycle' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Expandable Section: Recycling Steps & Drop-Off Protocol */}
          {expandedPathway === 'recycle' && (
            <div className="px-5 pb-5 pt-2 border-t border-stone-100 bg-stone-50/50 space-y-3 animate-in fade-in duration-150 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Material</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.recycle.materialType}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Category</span>
                  <p className="font-bold text-stone-900 mt-0.5">{analysis.recycle.recyclingCategory}</p>
                </div>
                <div className="p-3 rounded-xl bg-white border border-stone-200">
                  <span className="text-[11px] text-stone-500 font-semibold block">Recyclability</span>
                  <p className="font-bold text-emerald-700 mt-0.5">{analysis.recycle.recyclabilityRating}</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-stone-200">
                <strong className="text-stone-800 block mb-1">Preparation Steps:</strong>
                <ul className="list-disc list-inside space-y-0.5 text-stone-600">
                  {analysis.recycle.preparationSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-950">
                <strong className="block mb-1">Drop-off & Aggregators:</strong>
                <div className="space-y-1 text-stone-700">
                  {analysis.recycle.disposalAndRecyclingOptions.map((opt, idx) => (
                    <p key={idx}>• {opt}</p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. ENVIRONMENTAL IMPACT (COMPACT CARD WITH EXPANDABLE DETAILS)            */}
      {/* ========================================================================= */}
      <section id="impact-compact-card" className="bg-stone-900 text-white rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-stone-950 flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">Environmental Impact</h4>
              <p className="text-xs text-stone-300">
                {analysis.environmentalImpact.qualitativeImpact || 'Diverts solid waste from gutters and landfills through circular reuse.'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowImpactDetails(!showImpactDetails)}
            className="text-xs font-bold text-emerald-300 hover:text-emerald-200 inline-flex items-center gap-1 self-end sm:self-center"
          >
            <span>{showImpactDetails ? 'Hide' : 'View Details'}</span>
            {showImpactDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {showImpactDetails && (
          <div className="mt-3 pt-3 border-t border-stone-800 text-xs text-stone-300 space-y-2 animate-in fade-in duration-150">
            <p className="leading-relaxed">{analysis.environmentalImpact.impactExplanation}</p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <span>Principle: {analysis.environmentalImpact.circularEconomyPrinciple}</span>
              <span>•</span>
              <span>Waste Hierarchy: Direct Reuse &gt; Repair &gt; Recycling</span>
            </div>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 5. ASK AI FEATURE (CLEAN, CONCISE INPUT & RESPONSE)                       */}
      {/* ========================================================================= */}
      {onAskQuestion && (
        <section id="ask-ai-section" className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-stone-900">
                Ask SecondLife AI
              </h4>
              <p className="text-xs text-stone-500">
                Have a question about tools, safety, or how to fix this object?
              </p>
            </div>
          </div>

          <form onSubmit={handleAskSubmit} className="flex gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              placeholder={`Ask a question about your ${analysis.itemName}...`}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              type="submit"
              disabled={isAskingQuestion || !customQuestion.trim()}
              className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white rounded-xl text-xs font-bold shrink-0 transition-colors"
            >
              {isAskingQuestion ? 'Thinking...' : 'Ask AI'}
            </button>
          </form>

          {adviceAnswer && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-stone-800 leading-relaxed space-y-1">
              <strong className="text-emerald-950 font-bold block flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                AI Guidance:
              </strong>
              <p className="whitespace-pre-line">{adviceAnswer}</p>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* 6. PROMINENT BOTTOM RESET: START NEW ANALYSIS                             */}
      {/* ========================================================================= */}
      {onResetAnalysis && (
        <div className="pt-2 text-center">
          <button
            id="bottom-start-new-analysis-btn"
            type="button"
            onClick={onResetAnalysis}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-2xl text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start New Analysis</span>
          </button>
        </div>
      )}
    </div>
  );
};
