import React, { useState } from 'react';
import { DraftAssessment } from '../types/hfmse';
import { HFMSE_ITEMS } from '../data/hfmseScaleData';
import { calculateTotalScore, getMissingItems } from '../services/storageService';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { AssessmentSummaryRow } from '../components/AssessmentSummaryRow';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';

export interface ReviewScreenProps {
  draft: DraftAssessment;
  onEditItem: (itemNumber: number) => void;
  onBackToAssessment: () => void;
  onFinalize: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  draft,
  onEditItem,
  onBackToAssessment,
  onFinalize
}) => {
  const [showFinalizeConfirm, setShowFinalizeConfirm] = useState(false);
  const totalScore = calculateTotalScore(draft.responses);
  const missingItems = getMissingItems(draft.responses);
  const answeredCount = 33 - missingItems.length;
  const isComplete = missingItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader
        title="Revisar Avaliação"
        patientInitials={draft.patientInitials}
        attendanceDate={draft.attendanceDate}
        showBackButton={true}
        onBack={onBackToAssessment}
        showHistoryButton={false}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Summary Card */}
        <div className="bg-surface-white border border-surface-container rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">
              Progresso do Preenchimento
            </span>
            <h2 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
              {answeredCount} de 33 Itens Respondidos
            </h2>
            <p className="text-xs text-secondary">
              {isComplete
                ? 'Todos os 33 itens foram preenchidos. Você já pode finalizar a avaliação.'
                : `Ainda restam ${missingItems.length} item(ns) pendente(s).`}
            </p>
          </div>

          <div className="bg-surface-container-low border border-surface-container px-4 py-3 rounded-2xl flex sm:flex-col items-center justify-between sm:justify-center text-center">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">
              Total Parcial
            </span>
            <span className="font-headline font-extrabold text-2xl sm:text-3xl text-primary">
              {totalScore} <span className="text-sm font-semibold text-secondary">/ 66</span>
            </span>
          </div>
        </div>

        {/* Missing Items Alert */}
        {!isComplete && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-start gap-3 text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Respostas Pendentes</h4>
                <p className="text-xs text-amber-800 mt-0.5">
                  Para finalizar e registrar o total da escala, você deve responder todos os itens:
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {missingItems.map((itemNum) => (
                <button
                  key={itemNum}
                  type="button"
                  onClick={() => onEditItem(itemNum)}
                  className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Item {itemNum} →
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List of 33 Items */}
        <div className="space-y-3">
          <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider px-1">
            Respostas da Escala (1 a 33)
          </h3>

          <div className="space-y-2.5">
            {HFMSE_ITEMS.map((item) => (
              <AssessmentSummaryRow
                key={item.number}
                item={item}
                score={draft.responses[item.number]}
                onEdit={onEditItem}
              />
            ))}
          </div>

          {/* Action Navigation Card */}
          <div className="pt-4 mt-6 border-t border-surface-container">
            <div className="bg-surface-white border border-surface-container rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={onBackToAssessment}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border-2 border-surface-container text-sm font-bold text-on-surface hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Voltar aos Itens</span>
              </button>

              <button
                type="button"
                onClick={() => setShowFinalizeConfirm(true)}
                disabled={!isComplete}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary-container text-white text-sm font-bold shadow-md shadow-primary/25 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finalizar Avaliação</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional App Footer */}
      <AppFooter />

      {/* Finalize Confirmation Modal */}
      <ConfirmationDialog
        isOpen={showFinalizeConfirm}
        title="Finalizar e Salvar Avaliação?"
        message="A pontuação total será calculada e gravada no histórico deste dispositivo como somente leitura. O rascunho atual será concluído."
        confirmLabel="Sim, finalizar"
        cancelLabel="Revisar mais"
        variant="primary"
        onConfirm={() => {
          setShowFinalizeConfirm(false);
          onFinalize();
        }}
        onCancel={() => setShowFinalizeConfirm(false)}
      />
    </div>
  );
};
