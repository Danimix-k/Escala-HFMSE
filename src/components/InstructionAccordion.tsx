import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, Flag, FileText } from 'lucide-react';

export interface InstructionAccordionProps {
  initialPosition: string;
  finalPosition: string;
  instruction: string;
  defaultExpanded?: boolean;
}

export const InstructionAccordion: React.FC<InstructionAccordionProps> = ({
  initialPosition,
  finalPosition,
  instruction,
  defaultExpanded = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultExpanded);

  return (
    <div className="bg-surface-white border border-surface-container rounded-2xl overflow-hidden transition-all shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-surface-container-low/50 hover:bg-surface-container-low transition-colors flex items-center justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-xs sm:text-sm text-on-surface flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Instruções e Posições do Teste
        </span>
        <span className="text-secondary p-1">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {isOpen && (
        <div className="p-4 space-y-3.5 text-xs sm:text-sm border-t border-surface-container bg-surface-white">
          {/* Posição Inicial */}
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-50 text-primary flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-on-surface block text-xs uppercase tracking-wider text-secondary">
                Posição Inicial
              </span>
              <p className="text-on-surface-variant leading-relaxed mt-0.5">{initialPosition}</p>
            </div>
          </div>

          {/* Posição Final */}
          <div className="flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
              <Flag className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="font-bold text-on-surface block text-xs uppercase tracking-wider text-secondary">
                Posição Final / Alvo
              </span>
              <p className="text-on-surface-variant leading-relaxed mt-0.5">{finalPosition}</p>
            </div>
          </div>

          {/* Instrução ao Examinador */}
          <div className="pt-2 border-t border-surface-container/60">
            <span className="font-bold text-on-surface block text-xs uppercase tracking-wider text-secondary mb-1">
              Critério Clínico do Examinador
            </span>
            <p className="text-on-surface-variant leading-relaxed bg-surface-container-low/40 p-2.5 rounded-lg border border-surface-container/40">
              {instruction}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
