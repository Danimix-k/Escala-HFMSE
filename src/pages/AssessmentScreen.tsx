import React from 'react';
import { ScaleItem, Score, DraftAssessment } from '../types/hfmse';
import { AppHeader } from '../components/AppHeader';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { InstructionAccordion } from '../components/InstructionAccordion';
import { ScoreOptionCard } from '../components/ScoreOptionCard';
import { ContextTimer } from '../components/ContextTimer';
import { ArrowLeft, ArrowRight, CheckCircle, MessageSquareQuote, LogOut } from 'lucide-react';

export interface AssessmentScreenProps {
  draft: DraftAssessment;
  item: ScaleItem;
  totalItems: number;
  onSelectScore: (score: Score) => void;
  onNext: () => void;
  onPrev: () => void;
  onExit: () => void;
  onNavigateReview: () => void;
}

export const AssessmentScreen: React.FC<AssessmentScreenProps> = ({
  draft,
  item,
  totalItems = 33,
  onSelectScore,
  onNext,
  onPrev,
  onExit,
  onNavigateReview
}) => {
  const currentScore = draft.responses[item.number];
  const hasSelectedScore = currentScore !== undefined && currentScore !== null;
  const isFirstItem = item.number === 1;
  const isLastItem = item.number === totalItems;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-28">
      {/* Header with Exit action */}
      <AppHeader
        patientInitials={draft.patientInitials}
        attendanceDate={draft.attendanceDate}
        showHistoryButton={false}
        rightAction={
          <button
            type="button"
            onClick={onExit}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-secondary hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors border border-surface-container"
            title="Salvar rascunho e voltar para o início"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sair e Continuar Depois</span>
          </button>
        }
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Progress bar */}
        <div className="bg-surface-white border border-surface-container rounded-2xl p-4 shadow-sm">
          <ProgressIndicator current={item.number} total={totalItems} />
        </div>

        {/* Item Header & Criterion Title */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-primary text-white text-xs font-bold rounded-lg tracking-wider">
              ITEM {item.number}
            </span>
            <span className="text-xs font-semibold text-secondary">
              Escala HFMSE
            </span>
          </div>
          <h1 className="font-headline font-bold text-xl sm:text-2xl text-on-surface leading-tight">
            {item.title}
          </h1>
        </div>

        {/* Patient Prompt Card */}
        <div className="bg-blue-50/60 border border-primary/20 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider block">
              Comando Verbal ao Paciente
            </span>
            <p className="text-sm sm:text-base font-semibold text-on-surface leading-relaxed">
              "{item.patientPrompt}"
            </p>
          </div>
        </div>

        {/* Instructions Accordion */}
        <InstructionAccordion
          initialPosition={item.initialPosition}
          finalPosition={item.finalPosition}
          instruction={item.instruction}
        />

        {/* Context Timer (if applicable) */}
        {item.timerSeconds && (
          <ContextTimer key={item.number} targetSeconds={item.timerSeconds} />
        )}

        {/* Response Options */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
              Selecione o Grau de Resposta Observado <span className="text-error-red">*</span>
            </label>
            {hasSelectedScore && (
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                Salvo localmente
              </span>
            )}
          </div>

          <div className="space-y-2.5" role="radiogroup">
            {item.options.map((option) => (
              <ScoreOptionCard
                key={option.score}
                score={option.score}
                description={option.description}
                isSelected={currentScore === option.score}
                onSelect={(score) => onSelectScore(score)}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Form Actions */}
      <div className="fixed bottom-0 inset-x-0 bg-surface-white/95 backdrop-blur-md border-t border-surface-container py-3.5 px-4 sm:px-6 z-30 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={isFirstItem}
            className="px-4 sm:px-6 py-3 rounded-2xl border border-surface-container text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>

          <button
            type="button"
            onClick={onNavigateReview}
            className="px-3 py-2 text-xs font-semibold text-secondary hover:text-primary hover:bg-surface-container rounded-xl transition-colors"
          >
            Ver Todas as Respostas
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!hasSelectedScore}
            className="px-5 sm:px-8 py-3 rounded-2xl bg-primary hover:bg-primary-container text-white text-sm font-bold shadow-md shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <span>{isLastItem ? 'Revisar' : 'Próximo'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
