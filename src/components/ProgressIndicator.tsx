import React from 'react';

export interface ProgressIndicatorProps {
  current: number;
  total: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total = 33,
  className = ''
}) => {
  const percentage = Math.min(Math.max((current / total) * 100, 0), 100);

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold text-secondary mb-2">
        <span className="text-primary font-bold">Item {current} de {total}</span>
        <span>{Math.round(percentage)}% concluído</span>
      </div>
      <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>
    </div>
  );
};
