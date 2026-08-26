import React, { useState } from 'react';
import { CompletedAssessment } from '../types/hfmse';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { LocalDataNotice } from '../components/LocalDataNotice';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { Plus, Trash2, Calendar, FileText, Inbox } from 'lucide-react';

export interface HistoryScreenProps {
  history: CompletedAssessment[];
  onSelectAssessment: (id: string) => void;
  onDeleteAssessment: (id: string) => void;
  onClearAll: () => void;
  onStartNew: () => void;
  onBackToHome: () => void;
}

export const HistoryScreen: React.FC<HistoryScreenProps> = ({
  history,
  onSelectAssessment,
  onDeleteAssessment,
  onClearAll,
  onStartNew,
  onBackToHome
}) => {
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [showClearAllConfirm, setShowClearAllConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <AppHeader
        title="Histórico Local"
        showBackButton={true}
        onBack={onBackToHome}
        showHistoryButton={false}
        rightAction={
          <button
            type="button"
            onClick={onStartNew}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-lg shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Avaliação</span>
          </button>
        }
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Title and Storage Warning Banner */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="font-headline font-bold text-xl sm:text-2xl text-on-surface">
              Atendimentos Gravados
            </h1>
            <span className="text-xs font-semibold text-secondary">
              {history.length} {history.length === 1 ? 'registro' : 'registros'}
            </span>
          </div>

          <LocalDataNotice variant="warning" />
        </div>

        {/* Empty State */}
        {history.length === 0 ? (
          <div className="bg-surface-white border border-surface-container rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-surface-container text-secondary flex items-center justify-center mx-auto">
              <Inbox className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-lg text-on-surface">
                Nenhum atendimento salvo
              </h3>
              <p className="text-xs sm:text-sm text-secondary max-w-sm mx-auto">
                As avaliações finalizadas ficarão registradas na memória deste dispositivo para consulta posterior.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartNew}
                className="px-6 py-3 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-xl shadow-sm transition-colors inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Iniciar Primeira Avaliação</span>
              </button>
            </div>
          </div>
        ) : (
          /* History Card List */
          <div className="space-y-3">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-surface-white border border-surface-container hover:border-outline-variant rounded-2xl p-4 sm:p-5 shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary font-headline font-bold text-sm flex items-center justify-center shrink-0">
                      {item.patientInitials}
                    </span>
                    <div>
                      <h4 className="font-bold text-base text-on-surface leading-snug">
                        Paciente {item.patientInitials}
                      </h4>
                      <p className="text-xs text-secondary flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Data: {item.attendanceDate.split('-').reverse().join('/')}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Score and actions */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-surface-container/60">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-secondary block">
                      Total
                    </span>
                    <span className="font-headline font-black text-xl text-primary">
                      {item.totalScore} <span className="text-xs font-semibold text-secondary">/ 66</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => onSelectAssessment(item.id)}
                      className="px-3.5 py-2 bg-surface-container-low hover:bg-surface-container text-primary font-bold text-xs rounded-xl border border-surface-container transition-colors flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Detalhes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteTargetId(item.id)}
                      className="p-2 text-secondary hover:text-error-red hover:bg-red-50 rounded-xl transition-colors"
                      title="Excluir este atendimento"
                      aria-label="Excluir atendimento"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear All History Button */}
            <div className="pt-6 text-center">
              <button
                type="button"
                onClick={() => setShowClearAllConfirm(true)}
                className="px-4 py-2.5 text-xs font-semibold text-error-red hover:bg-red-50 rounded-xl border border-red-200 transition-colors inline-flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Apagar Todo o Histórico</span>
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Institutional App Footer */}
      <AppFooter />

      {/* Individual Delete Dialog */}
      <ConfirmationDialog
        isOpen={deleteTargetId !== null}
        title="Excluir este atendimento?"
        message="O registro selecionado será excluído permanentemente da memória deste dispositivo."
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          if (deleteTargetId) {
            onDeleteAssessment(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />

      {/* Clear All Dialog */}
      <ConfirmationDialog
        isOpen={showClearAllConfirm}
        title="Apagar todo o histórico?"
        message="Todos os atendimentos gravados serão removidos definitivamente deste navegador. Esta ação não poderá ser desfeita."
        confirmLabel="Sim, apagar tudo"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          setShowClearAllConfirm(false);
          onClearAll();
        }}
        onCancel={() => setShowClearAllConfirm(false)}
      />
    </div>
  );
};
