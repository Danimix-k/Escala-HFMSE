import React from 'react';
import { Score, ScaleItem } from '../types/hfmse';
import { Edit2, AlertCircle } from 'lucide-react';

export interface AssessmentSummaryRowProps {
  item: ScaleItem;
  score?: Score;
  onEdit: (itemNumber: number) => void;
  isReadOnly?: boolean;
}

export const AssessmentSummaryRow: React.FC<AssessmentSummaryRowProps> = ({
  item,
  score,
  onEdit,
  isReadOnly = false
}) => {
  const isAnswered = score !== undefined && score !== null;
  const selectedOption = isAnswered ? item.options.find(o => o.score === score) : null;

  const getBadgeStyle = () => {
    if (!isAnswered) return 'bg-red-100 text-error-red border-red-300';
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
    <div className={`p-4 rounded-2xl border transition-all ${
      !isAnswered
        ? 'bg-red-50/50 border-red-200'
        : 'bg-surface-white border-surface-container hover:border-outline-variant'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Item Info */}
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <span className="w-7 h-7 rounded-lg bg-surface-container font-bold text-xs text-primary flex items-center justify-center shrink-0 mt-0.5">
            {item.number}
          </span>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-on-surface leading-snug">
              {item.title}
            </h4>
            {isAnswered && selectedOption ? (
              <p className="text-xs text-on-surface-variant line-clamp-2 mt-1 leading-relaxed">
                {selectedOption.description}
              </p>
            ) : (
              <p className="text-xs font-semibold text-error-red flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                Resposta pendente
              </p>
            )}
          </div>
        </div>

        {/* Score and Action */}
        <div className="flex items-center justify-between sm:justify-end gap-3 self-end sm:self-center shrink-0">
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getBadgeStyle()}`}>
            {isAnswered ? `${score} ${score === 1 ? 'pt' : 'pts'}` : 'Pendente'}
          </span>

          {!isReadOnly && (
            <button
              type="button"
              onClick={() => onEdit(item.number)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-surface-container rounded-lg border border-surface-container transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
