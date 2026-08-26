import React, { useState } from 'react';
import { DraftAssessment } from '../types/hfmse';
import { AppHeader } from '../components/AppHeader';
import { AppFooter } from '../components/AppFooter';
import { LocalDataNotice } from '../components/LocalDataNotice';
import { ConfirmationDialog } from '../components/ConfirmationDialog';
import { Play, Trash2, ArrowRight, UserCheck, Calendar, AlertCircle } from 'lucide-react';

export interface HomeScreenProps {
  draft: DraftAssessment | null;
  onStartNew: (initials: string, date: string) => void;
  onResumeDraft: () => void;
  onDiscardDraft: () => void;
  onNavigateHistory: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  draft,
  onStartNew,
  onResumeDraft,
  onDiscardDraft,
  onNavigateHistory
}) => {
  const today = new Date().toISOString().split('T')[0];
  const [initials, setInitials] = useState('');
  const [date, setDate] = useState(today);
  const [error, setError] = useState<string | null>(null);
  const [showDiscardConfirm, setShowDiscardConfirm] = useState(false);

  // Normalização de iniciais: apenas 2 a 6 letras, maiúsculas
  const handleInitialsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (raw.length <= 6) {
      setInitials(raw);
      if (error) setError(null);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (error) setError(null);
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (initials.length < 2) {
      setError('As iniciais do paciente devem conter de 2 a 6 letras.');
      return;
    }

    if (!date) {
      setError('Informe a data do atendimento.');
      return;
    }

    if (date > today) {
      setError('A data do atendimento não pode ser futura.');
      return;
    }

    onStartNew(initials, date);
  };

  const answeredCount = draft ? Object.keys(draft.responses).length : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background pb-12">
      <AppHeader onNavigateHistory={onNavigateHistory} />

      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">
        {/* Intro Card */}
        <div className="bg-surface-white border border-surface-container rounded-3xl p-6 sm:p-7 shadow-sm space-y-3 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
            Versão Brasileira Oficial
          </div>
          <h1 className="font-headline font-extrabold text-2xl sm:text-3xl text-on-surface tracking-tight">
            Escala Motora HFMSE
          </h1>
          <p className="text-secondary text-sm leading-relaxed">
            Instrumento de avaliação funcional com 33 itens padronizados para pacientes com Atrofia Muscular Espinhal (AME). Deve ser aplicado por profissional capacitado.
          </p>
        </div>

        {/* Local Storage Privacy Alert */}
        <LocalDataNotice />

        {/* Draft Resume Card if exists */}
        {draft && (
          <div className="bg-blue-50/70 border-2 border-primary/40 rounded-3xl p-6 shadow-sm space-y-4 animate-in fade-in duration-200">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-primary block">
                  Avaliação em Andamento
                </span>
                <h3 className="font-headline font-bold text-lg text-on-surface mt-0.5">
                  Paciente {draft.patientInitials}
                </h3>
                <p className="text-xs text-secondary mt-0.5">
                  Data: {draft.attendanceDate.split('-').reverse().join('/')} · {answeredCount} de 33 respondidos
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
                Item {draft.currentItem}
              </span>
            </div>

            {/* Progress bar inside draft card */}
            <div className="w-full h-2 bg-surface-container rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${(answeredCount / 33) * 100}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={onResumeDraft}
                className="flex-1 px-4 py-3 bg-primary hover:bg-primary-container text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                Continuar Avaliação
              </button>

              <button
                type="button"
                onClick={() => setShowDiscardConfirm(true)}
                className="px-4 py-3 bg-surface-white hover:bg-red-50 text-error-red border border-red-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Descartar
              </button>
            </div>
          </div>
        )}

        {/* Start New Assessment Form */}
        <div className="bg-surface-white border border-surface-container rounded-3xl p-6 sm:p-7 shadow-sm">
          <h2 className="font-headline font-bold text-lg text-on-surface mb-1">
            Iniciar Nova Avaliação
          </h2>
          <p className="text-xs text-secondary mb-5">
            Preencha apenas as iniciais e a data para identificação do atendimento.
          </p>

          <form onSubmit={handleStart} className="space-y-4">
            {/* Patient Initials */}
            <div>
              <label htmlFor="patientInitials" className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Iniciais do Paciente <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                  <UserCheck className="w-5 h-5" />
                </div>
                <input
                  id="patientInitials"
                  type="text"
                  value={initials}
                  onChange={handleInitialsChange}
                  placeholder="Ex: MAS"
                  maxLength={6}
                  autoComplete="off"
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low/60 border border-surface-container rounded-2xl text-on-surface font-semibold placeholder:text-outline/70 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm tracking-wider uppercase"
                />
              </div>
              <span className="text-[11px] text-secondary mt-1 block">
                Mínimo 2 e máximo 6 letras (sem caracteres especiais).
              </span>
            </div>

            {/* Attendance Date */}
            <div>
              <label htmlFor="attendanceDate" className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-1.5">
                Data do Atendimento <span className="text-error-red">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-secondary">
                  <Calendar className="w-5 h-5" />
                </div>
                <input
                  id="attendanceDate"
                  type="date"
                  value={date}
                  max={today}
                  onChange={handleDateChange}
                  className="w-full pl-11 pr-4 py-3 bg-surface-container-low/60 border border-surface-container rounded-2xl text-on-surface font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Inline Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-error-red border border-red-200 rounded-xl text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-primary hover:bg-primary-container text-white rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                <span>Iniciar Avaliação</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Institutional App Footer */}
      <AppFooter />

      {/* Discard Confirmation Modal */}
      <ConfirmationDialog
        isOpen={showDiscardConfirm}
        title="Descartar avaliação em andamento?"
        message="O progresso atual será removido deste dispositivo. Esta ação não poderá ser desfeita."
        confirmLabel="Sim, descartar"
        cancelLabel="Voltar"
        variant="danger"
        onConfirm={() => {
          setShowDiscardConfirm(false);
          onDiscardDraft();
        }}
        onCancel={() => setShowDiscardConfirm(false)}
      />
    </div>
  );
};
