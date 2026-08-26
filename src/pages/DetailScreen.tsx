import React, { useState } from 'react';
import { CompletedAssessment } from '../types/hfmse';
import { HFMSE_ITEMS } from '../data/hfmseScaleData';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { AssessmentSummaryRow } from '../components/AssessmentSummaryRow';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { LocalDataNotice } from '../components/LocalDataNotice';
import { Printer, Trash2, Calendar, FileText } from 'lucide-react';

export interface DetailScreenProps {
  assessment: CompletedAssessment;
  onBack: () => void;
  onNavigateReport: (id: string) => void;
  onDelete: (id: string) => void;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  assessment,
  onBack,
  onNavigateReport,
  onDelete
}) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <AppHeader
        title="Detalhe do Atendimento"
        showBackButton={true}
        onBack={onBack}
        patientInitials={assessment.patientInitials}
        attendanceDate={assessment.attendanceDate}
        showHistoryButton={false}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-5 space-y-5">
        {/* Detail Summary Card */}
        <div className="bg-surface-white border border-surface-container rounded-3xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">
                Atendimento Concluído (Somente Leitura)
              </span>
              <h1 className="font-headline font-extrabold text-2xl text-on-surface">
                Paciente {assessment.patientInitials}
              </h1>
              <p className="text-xs text-secondary flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Atendido em {assessment.attendanceDate.split('-').reverse().join('/')}</span>
              </p>
            </div>

            <div className="bg-surface-container-low border border-surface-container px-4 py-3 rounded-2xl text-center shrink-0">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Pontuação Total
              </span>
              <span className="font-headline font-black text-3xl text-primary">
                {assessment.totalScore} <span className="text-sm font-semibold text-secondary">/ 66</span>
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-surface-container flex flex-wrap items-center justify-between gap-2 text-xs text-secondary">
            <span>Versão da Escala: <strong className="text-on-surface">{assessment.scaleVersion}</strong></span>
            <span>Concluído em: {new Date(assessment.completedAt).toLocaleString('pt-BR')}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigateReport(assessment.id)}
            className="flex-1 py-3 px-4 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Visualizar / Imprimir PDF</span>
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="py-3 px-4 bg-surface-white hover:bg-red-50 text-error-red border border-red-200 font-semibold text-sm rounded-2xl flex items-center justify-center gap-1.5 transition-colors"
            title="Excluir este atendimento"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Excluir</span>
          </button>
        </div>

        {/* 33 Items Read-Only List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-headline font-bold text-sm text-on-surface uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Detalhamento dos 33 Itens
            </h3>
            <span className="text-xs text-secondary">33 itens avaliados</span>
          </div>

          <div className="space-y-2.5">
            {HFMSE_ITEMS.map((item) => (
              <AssessmentSummaryRow
                key={item.number}
                item={item}
                score={assessment.responses[item.number]}
                onEdit={() => {}}
                isReadOnly={true}
              />
            ))}
          </div>
        </div>

        {/* Local Storage Notice */}
        <LocalDataNotice />
      </main>

      {/* Institutional App Footer */}
      <AppFooter />

      {/* Delete Confirmation Modal */}
      <ConfirmationDialog
        isOpen={showDeleteConfirm}
        title="Excluir este atendimento?"
        message="O atendimento será apagado da memória local deste dispositivo."
        confirmLabel="Sim, excluir"
        cancelLabel="Cancelar"
        variant="danger"
        onConfirm={() => {
          setShowDeleteConfirm(false);
          onDelete(assessment.id);
        }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </div>
  );
};
