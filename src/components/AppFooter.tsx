import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface AppFooterProps {
  className?: string;
}

export const AppFooter: React.FC<AppFooterProps> = ({ className = '' }) => {
  return (
    <footer className={`mt-auto border-t border-surface-container/80 bg-surface-white/60 py-6 px-4 text-center text-xs text-secondary space-y-2 pb-16 ${className}`}>
      <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 text-on-surface font-semibold">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>HFMSE Brasil</span>
        </div>
        <span className="hidden sm:inline text-outline-variant">·</span>
        <span>Avaliação Motora AME 5Q</span>
        <span className="hidden sm:inline text-outline-variant">·</span>
        <span>Dados 100% no Dispositivo</span>
      </div>
      <p className="text-[11px] text-outline">
        Instrumento clínico para profissionais capacitados · SES/SC
      </p>
    </footer>
  );
};
