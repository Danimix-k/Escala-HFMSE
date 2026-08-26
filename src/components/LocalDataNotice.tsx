import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export interface LocalDataNoticeProps {
  variant?: 'subtle' | 'banner' | 'warning';
  className?: string;
}

export const LocalDataNotice: React.FC<LocalDataNoticeProps> = ({
  variant = 'subtle',
  className = ''
}) => {
  if (variant === 'warning') {
    return (
      <div className={`flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs sm:text-sm ${className}`}>
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold block mb-0.5">Armazenamento local do navegador</strong>
          <span>Os dados deste histórico não possuem backup em nuvem e podem ser apagados se você limpar o cache ou dados deste navegador.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-surface-container-low border border-surface-container rounded-xl text-secondary text-xs ${className}`}>
      <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
      <span>
        <strong className="font-semibold text-on-surface">Privacidade:</strong> Todos os dados ficam salvos exclusivamente neste dispositivo.
      </span>
    </div>
  );
};
