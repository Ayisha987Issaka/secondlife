import React from 'react';
import { UserGoal, GoalRecommendation } from '../types';
import { DollarSign, Palette, Home, HeartHandshake, Recycle, Sparkles } from 'lucide-react';

interface GoalSelectorProps {
  currentGoal: UserGoal;
  onSelectGoal: (goal: UserGoal) => void;
  recommendation?: GoalRecommendation;
  itemName: string;
}

const GOALS = [
  { id: 'money' as UserGoal, label: 'Make Money', icon: DollarSign },
  { id: 'create' as UserGoal, label: 'Create', icon: Palette },
  { id: 'home' as UserGoal, label: 'Home Use', icon: Home },
  { id: 'donate' as UserGoal, label: 'Donate', icon: HeartHandshake },
  { id: 'recycle' as UserGoal, label: 'Recycle', icon: Recycle },
];

export const GoalSelector: React.FC<GoalSelectorProps> = ({
  currentGoal,
  onSelectGoal,
  recommendation,
  itemName,
}) => {
  return (
    <div id="goal-selector-compact" className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs space-y-3">
      {/* 1-Line Compact Goal Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="text-xs font-bold text-stone-900">What is your goal for this {itemName || 'item'}?</span>
        </div>

        {/* 5 Compact Goal Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {GOALS.map((goal) => {
            const Icon = goal.icon;
            const isSelected = currentGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => onSelectGoal(goal.id)}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all whitespace-nowrap text-xs ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-stone-500'}`} />
                <span>{goal.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Concise 1-sentence recommendation for selected goal */}
      {recommendation && (
        <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs flex items-start gap-2 text-stone-700">
          <strong className="text-stone-900 font-bold shrink-0">{recommendation.headline}:</strong>
          <span className="leading-snug">{recommendation.summary}</span>
        </div>
      )}
    </div>
  );
};
