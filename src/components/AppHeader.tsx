import React from 'react';
import { Activity, History, ArrowLeft } from 'lucide-react';

export interface AppHeaderProps {
  title?: string;
  patientInitials?: string;
  attendanceDate?: string;
  onNavigateHome?: () => void;
  onNavigateHistory?: () => void;
  onBack?: () => void;
  showBackButton?: boolean;
  showHistoryButton?: boolean;
  rightAction?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Avaliação HFMSE',
  patientInitials,
  attendanceDate,
  onNavigateHome,
  onNavigateHistory,
  onBack,
  showBackButton = false,
  showHistoryButton = true,
  rightAction
}) => {
  return (
    <header className="sticky top-0 z-40 bg-surface-white/95 backdrop-blur-sm border-b border-surface-container shadow-sm">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Left side: Back or Logo */}
        <div className="flex items-center gap-3">
          {showBackButton && onBack ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onBack}
                className="p-2 -ml-2 rounded-lg text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Voltar"
              >
                <ArrowLeft className="w-5 h-5 text-primary" />
                <span className="hidden sm:inline">Voltar</span>
              </button>
              <span className="font-headline font-bold text-sm sm:text-base text-on-surface border-l border-surface-container pl-2">
                {title}
              </span>
            </div>
          ) : (
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-primary rounded-lg p-1 -ml-1"
            >
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-sm">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="font-headline font-bold text-base sm:text-lg text-on-surface leading-tight block">
                  HFMSE
                </span>
                <span className="text-[11px] text-secondary font-medium block">
                  Escala Motora
                </span>
              </div>
            </button>
          )}
        </div>

        {/* Center/Info: Patient badge if available */}
        {patientInitials && (
          <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full border border-surface-container text-xs font-medium text-on-surface">
            <span className="font-bold text-primary tracking-wide">{patientInitials}</span>
            {attendanceDate && (
              <>
                <span className="text-outline">·</span>
                <span className="text-secondary">{attendanceDate.split('-').reverse().join('/')}</span>
              </>
            )}
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {rightAction}

          {showHistoryButton && onNavigateHistory && (
            <button
              onClick={onNavigateHistory}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-primary hover:bg-surface-container rounded-lg transition-colors border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary"
              title="Histórico neste dispositivo"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">Histórico</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
