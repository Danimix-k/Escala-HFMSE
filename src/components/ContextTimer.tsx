import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Timer as TimerIcon, Check } from 'lucide-react';

export interface ContextTimerProps {
  targetSeconds: 3 | 10;
  className?: string;
}

export const ContextTimer: React.FC<ContextTimerProps> = ({
  targetSeconds,
  className = ''
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setSeconds((prev) => prev + 0.1);
      }, 100);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  const isTargetReached = seconds >= targetSeconds;

  return (
    <div className={`p-4 bg-surface-container-low border border-surface-container rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
          isTargetReached ? 'bg-emerald-500 text-white' : 'bg-primary/10 text-primary'
        }`}>
          {isTargetReached ? <Check className="w-6 h-6" /> : <TimerIcon className="w-5 h-5" />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary">
              Cronômetro Auxiliar
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-surface-container font-semibold text-primary">
              Meta: {targetSeconds}s
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            {isTargetReached ? 'Tempo meta atingido com sucesso!' : `Mantenha a contagem até ${targetSeconds} segundos.`}
          </p>
        </div>
      </div>

      {/* Digital readout & controls */}
      <div className="flex items-center gap-3">
        <div className={`px-3 py-1 rounded-lg font-mono font-bold text-2xl tracking-wider min-w-[75px] text-center ${
          isTargetReached ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-white text-on-surface border border-surface-container'
        }`}>
          {seconds.toFixed(1)}s
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-primary hover:bg-primary-container text-white'
            }`}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isRunning ? 'Pausar' : 'Iniciar'}</span>
          </button>

          <button
            type="button"
            onClick={resetTimer}
            disabled={seconds === 0}
            className="p-2 text-secondary hover:text-on-surface hover:bg-surface-container rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            title="Reiniciar cronômetro"
            aria-label="Reiniciar cronômetro"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
