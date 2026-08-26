import React from 'react';
import { Score } from '../types/hfmse';
import { CheckCircle2, Circle } from 'lucide-react';

export interface ScoreOptionCardProps {
  score: Score;
  description: string;
  isSelected: boolean;
  onSelect: (score: Score) => void;
  disabled?: boolean;
}

export const ScoreOptionCard: React.FC<ScoreOptionCardProps> = ({
  score,
  description,
  isSelected,
  onSelect,
  disabled = false
}) => {
  const getBadgeColor = () => {
    switch (score) {
      case 2:
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 1:
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 0:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(score)}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 flex items-start gap-3.5 focus:outline-none focus:ring-2 focus:ring-primary min-h-[56px] ${
        isSelected
          ? 'bg-blue-50/70 border-primary shadow-sm ring-1 ring-primary/30'
          : 'bg-surface-white border-surface-container hover:border-outline-variant hover:bg-surface-container-low/40'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      role="radio"
      aria-checked={isSelected}
    >
      {/* Radio Indicator */}
      <div className="shrink-0 mt-0.5">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-primary" />
        ) : (
          <Circle className="w-5 h-5 text-outline-variant" />
        )}
      </div>

      {/* Description and Score */}
      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p className={`text-sm leading-relaxed ${isSelected ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>
          {description}
        </p>

        {/* Score Badge */}
        <span
          className={`shrink-0 self-start sm:self-center px-2.5 py-1 rounded-full text-xs font-bold border tracking-wide uppercase ${getBadgeColor()}`}
        >
          {score} {score === 1 ? 'Ponto' : 'Pontos'}
        </span>
      </div>
    </button>
  );
};
