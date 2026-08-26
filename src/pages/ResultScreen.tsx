import React, { useState } from 'react';
import { CompletedAssessment } from '../types/hfmse';
import { HFMSE_ITEMS } from '../data/hfmseScaleData';
import { AppHeader } from '../components/AppHeader';
import { AssessmentSummaryRow } from '../components/AssessmentSummaryRow';
import { LocalDataNotice } from '../components/LocalDataNotice';
import { CheckCircle2, Plus, History, Printer, ChevronDown, ChevronUp, FileText, Info } from 'lucide-react';

export interface ResultScreenProps {
  assessment: CompletedAssessment;
  onStartNew: () => void;
  onNavigateHistory: () => void;
  onNavigateReport: (id: string) => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  assessment,
  onStartNew,
  onNavigateHistory,
  onNavigateReport
}) => {
  const [showAllItems, setShowAllItems] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16">
      <AppHeader
        patientInitials={assessment.patientInitials}
        attendanceDate={assessment.attendanceDate}
        onNavigateHistory={onNavigateHistory}
      />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Success Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface">
            Avaliação Concluída!
          </h1>
          <p className="text-secondary text-sm">
            Os dados foram salvos com sucesso no histórico local deste dispositivo.
          </p>
        </div>

        {/* Score Display Card */}
        <div className="bg-surface-white border-2 border-primary/20 rounded-3xl p-6 sm:p-8 shadow-sm text-center space-y-4">
          <div className="space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-widest text-primary block">
              Pontuação Total HFMSE
            </span>
            <div className="flex items-baseline justify-center gap-2">
              <span className="font-headline font-black text-5xl sm:text-6xl text-primary tracking-tight">
                {assessment.totalScore}
              </span>
              <span className="font-headline font-bold text-xl sm:text-2xl text-secondary">
                / 66 pontos
              </span>
            </div>
          </div>

          <div className="inline-flex items-center justify-center gap-3 px-4 py-2 bg-surface-container-low rounded-full text-xs font-semibold text-on-surface">
            <span>Paciente: <strong className="text-primary">{assessment.patientInitials}</strong></span>
            <span className="text-outline">·</span>
            <span>Data: {assessment.attendanceDate.split('-').reverse().join('/')}</span>
          </div>
        </div>

        {/* Regulatory/Clinical Disclaimer */}
        <div className="bg-surface-container-low border border-surface-container rounded-2xl p-4 flex items-start gap-3 text-xs text-secondary leading-relaxed">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>
            <strong className="text-on-surface font-semibold">Nota Clínica:</strong> O valor total reflete exclusivamente a soma aritmética dos 33 itens pontuados conforme a Escala HFMSE. O aplicativo não realiza inferências, diagnósticos ou recomendações terapêuticas.
          </span>
        </div>

        {/* Main CTA Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={onStartNew}
            className="py-3.5 px-5 bg-primary hover:bg-primary-container text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Nova Avaliação</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigateReport(assessment.id)}
            className="py-3.5 px-5 bg-surface-white hover:bg-surface-container text-on-surface border border-surface-container font-semibold text-sm rounded-2xl flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-primary" />
            <span>Exportar / Imprimir PDF</span>
          </button>
        </div>

        {/* History Access Button */}
        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onNavigateHistory}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
          >
            <History className="w-4 h-4" />
            <span>Ver todos os atendimentos no histórico local</span>
          </button>
        </div>

        {/* Collapsible 33 Items Breakdown */}
        <div className="bg-surface-white border border-surface-container rounded-3xl overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => setShowAllItems(!showAllItems)}
            className="w-full px-5 py-4 bg-surface-container-low/40 hover:bg-surface-container-low transition-colors flex items-center justify-between gap-3 text-left"
          >
            <span className="font-headline font-bold text-sm text-on-surface flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              Detalhamento dos 33 Itens Avaliados
            </span>
            <span className="text-secondary">
              {showAllItems ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>

          {showAllItems && (
            <div className="p-4 sm:p-5 border-t border-surface-container space-y-2.5">
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
          )}
        </div>

        {/* Local Storage Privacy Reminder */}
        <LocalDataNotice />
      </main>
    </div>
  );
};
