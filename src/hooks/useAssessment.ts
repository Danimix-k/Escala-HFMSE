import { useState, useEffect, useCallback } from 'react';
import { DraftAssessment, CompletedAssessment, Score, AppView } from '../types/hfmse';
import { HFMSE_SCALE_VERSION } from '../data/hfmseScaleData';
import { storageService } from '../services/storageService';

export function useAssessment() {
  const [view, setView] = useState<AppView>('home');
  const [draft, setDraft] = useState<DraftAssessment | null>(null);
  const [history, setHistory] = useState<CompletedAssessment[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<CompletedAssessment | null>(null);
  const [storageError, setStorageError] = useState<string | null>(null);

  // Carregar rascunho e histórico ao iniciar
  useEffect(() => {
    const loadedDraft = storageService.getDraft();
    setDraft(loadedDraft);

    const loadedHistory = storageService.getHistory();
    setHistory(loadedHistory);
  }, []);

  // Iniciar nova avaliação
  const startNewAssessment = useCallback((patientInitials: string, attendanceDate: string) => {
    const newDraft: DraftAssessment = {
      id: 'hfmse_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7),
      scaleVersion: HFMSE_SCALE_VERSION,
      patientInitials: patientInitials.toUpperCase().trim(),
      attendanceDate,
      currentItem: 1,
      responses: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = storageService.saveDraft(newDraft);
    if (!saved) {
      setStorageError('Não foi possível gravar o rascunho no navegador.');
    }
    setDraft(newDraft);
    setView('assessment');
  }, []);

  // Continuar rascunho existente
  const resumeDraft = useCallback(() => {
    if (draft) {
      setView('assessment');
    }
  }, [draft]);

  // Descartar rascunho
  const discardDraft = useCallback(() => {
    storageService.clearDraft();
    setDraft(null);
    setView('home');
  }, []);

  // Selecionar pontuação para o item atual
  const setItemScore = useCallback((score: Score) => {
    if (!draft) return;

    const updatedResponses = {
      ...draft.responses,
      [draft.currentItem]: score,
    };

    const updatedDraft: DraftAssessment = {
      ...draft,
      responses: updatedResponses,
      updatedAt: new Date().toISOString(),
    };

    setDraft(updatedDraft);
    storageService.saveDraft(updatedDraft);
  }, [draft]);

  // Avançar item
  const nextItem = useCallback(() => {
    if (!draft) return;

    if (draft.currentItem < 33) {
      const nextNum = draft.currentItem + 1;
      const updatedDraft = { ...draft, currentItem: nextNum };
      setDraft(updatedDraft);
      storageService.saveDraft(updatedDraft);
    } else {
      // Chegou ao fim -> direciona para revisão
      setView('review');
    }
  }, [draft]);

  // Voltar item
  const prevItem = useCallback(() => {
    if (!draft) return;

    if (draft.currentItem > 1) {
      const prevNum = draft.currentItem - 1;
      const updatedDraft = { ...draft, currentItem: prevNum };
      setDraft(updatedDraft);
      storageService.saveDraft(updatedDraft);
    }
  }, [draft]);

  // Ir diretamente para um item (a partir da revisão)
  const jumpToItem = useCallback((itemNumber: number) => {
    if (!draft) return;
    const updatedDraft = { ...draft, currentItem: itemNumber };
    setDraft(updatedDraft);
    storageService.saveDraft(updatedDraft);
    setView('assessment');
  }, [draft]);

  // Finalizar avaliação (transação atômica)
  const finalizeAssessment = useCallback(() => {
    if (!draft) return;

    const result = storageService.finalizeAssessment(draft);
    if (result.success && result.completed) {
      setDraft(null);
      setSelectedAssessment(result.completed);
      setHistory(storageService.getHistory());
      setView('result');
    } else {
      setStorageError(result.error || 'Erro ao finalizar avaliação.');
    }
  }, [draft]);

  // Excluir avaliação do histórico
  const deleteAssessment = useCallback((id: string) => {
    storageService.deleteAssessment(id);
    const updated = storageService.getHistory();
    setHistory(updated);
    if (selectedAssessment?.id === id) {
      setSelectedAssessment(null);
      setView('history');
    }
  }, [selectedAssessment]);

  // Limpar todo o histórico
  const clearAllHistory = useCallback(() => {
    storageService.clearAllHistory();
    setHistory([]);
    setSelectedAssessment(null);
  }, []);

  // Navegar para detalhes de um atendimento específico
  const viewDetail = useCallback((id: string) => {
    const item = storageService.getAssessmentById(id);
    if (item) {
      setSelectedAssessment(item);
      setView('detail');
    }
  }, []);

  // Navegar para relatório/impressão PDF
  const viewReport = useCallback((id: string) => {
    const item = storageService.getAssessmentById(id);
    if (item) {
      setSelectedAssessment(item);
      setView('report');
    }
  }, []);

  return {
    view,
    setView,
    draft,
    history,
    selectedAssessment,
    storageError,
    startNewAssessment,
    resumeDraft,
    discardDraft,
    setItemScore,
    nextItem,
    prevItem,
    jumpToItem,
    finalizeAssessment,
    deleteAssessment,
    clearAllHistory,
    viewDetail,
    viewReport,
  };
}
