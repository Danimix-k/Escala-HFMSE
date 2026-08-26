import React from 'react';
import { ShieldCheck } from 'lucide-react';

export interface AppFooterProps {
  className?: string;
}

export const AppFooter: React.FC<AppFooterProps> = ({ className = '' }) => {
  return (
    <footer className={`mt-8 border-t border-surface-container bg-surface-white/80 py-4 px-4 text-center text-xs text-secondary space-y-1 ${className}`}>
      <div className="max-w-xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
        <div className="flex items-center gap-1 text-on-surface font-semibold">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>HFMSE Brasil</span>
        </div>
        <span className="text-outline-variant">·</span>
        <span>Avaliação Motora AME 5Q</span>
        <span className="text-outline-variant">·</span>
        <span>100% no Dispositivo</span>
      </div>
      <p className="text-[11px] text-outline">
        Instrumento clínico para uso por profissionais capacitados
      </p>
    </footer>
  );
};
