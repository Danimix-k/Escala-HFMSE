import { DraftAssessment, CompletedAssessment, Score } from '../types/hfmse';
import { HFMSE_SCALE_VERSION } from '../data/hfmseScaleData';

const DRAFT_KEY = 'hfmse_draft_v1';
const HISTORY_KEY = 'hfmse_history_v1';

export function calculateTotalScore(responses: Partial<Record<number, Score>>): number {
  return Object.values(responses).reduce((sum: number, score) => {
    return sum + (typeof score === 'number' ? score : 0);
  }, 0);
}

export function isDraftComplete(responses: Partial<Record<number, Score>>): boolean {
  for (let i = 1; i <= 33; i++) {
    if (responses[i] === undefined || responses[i] === null) {
      return false;
    }
  }
  return true;
}

export function getMissingItems(responses: Partial<Record<number, Score>>): number[] {
  const missing: number[] = [];
  for (let i = 1; i <= 33; i++) {
    if (responses[i] === undefined || responses[i] === null) {
      missing.push(i);
    }
  }
  return missing;
}

export const storageService = {
  getDraft(): DraftAssessment | null {
    try {
      const data = localStorage.getItem(DRAFT_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data) as DraftAssessment;
      if (!parsed.id || !parsed.patientInitials || !parsed.attendanceDate) {
        return null;
      }
      return parsed;
    } catch (e) {
      console.error('Falha ao ler rascunho do localStorage:', e);
      return null;
    }
  },

  saveDraft(draft: DraftAssessment): boolean {
    try {
      draft.updatedAt = new Date().toISOString();
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      return true;
    } catch (e) {
      console.error('Falha ao salvar rascunho no localStorage:', e);
      return false;
    }
  },

  clearDraft(): void {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (e) {
      console.error('Falha ao remover rascunho:', e);
    }
  },

  getHistory(): CompletedAssessment[] {
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      if (!data) return [];
      const list = JSON.parse(data) as CompletedAssessment[];
      // Ordenar decrescente por data de atendimento e conclusao
      return list.sort((a, b) => {
        const dateDiff = new Date(b.attendanceDate).getTime() - new Date(a.attendanceDate).getTime();
        if (dateDiff !== 0) return dateDiff;
        return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
      });
    } catch (e) {
      console.error('Falha ao ler histórico do localStorage:', e);
      return [];
    }
  },

  getAssessmentById(id: string): CompletedAssessment | null {
    const list = this.getHistory();
    return list.find(item => item.id === id) || null;
  },

  finalizeAssessment(draft: DraftAssessment): { success: boolean; completed?: CompletedAssessment; error?: string } {
    try {
      // 1. Validar se todos os 33 itens foram respondidos
      if (!isDraftComplete(draft.responses)) {
        return { success: false, error: 'Ainda existem itens sem resposta.' };
      }

      // 2. Recalcular deterministicamente o score
      const totalScore = calculateTotalScore(draft.responses);

      const completed: CompletedAssessment = {
        id: draft.id,
        scaleVersion: draft.scaleVersion || HFMSE_SCALE_VERSION,
        patientInitials: draft.patientInitials.toUpperCase().trim(),
        attendanceDate: draft.attendanceDate,
        responses: draft.responses as Record<number, Score>,
        totalScore,
        createdAt: draft.createdAt,
        completedAt: new Date().toISOString(),
      };

      // 3. Obter histórico existente
      const history = this.getHistory();

      // 4. Inserir ou atualizar registro
      const index = history.findIndex(h => h.id === completed.id);
      if (index >= 0) {
        history[index] = completed;
      } else {
        history.unshift(completed);
      }

      // 5. Salvar histórico
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));

      // 6. Remover rascunho apenas após gravação bem sucedida
      this.clearDraft();

      return { success: true, completed };
    } catch (e) {
      console.error('Falha ao finalizar avaliação:', e);
      return { success: false, error: 'Erro de armazenamento local ao gravar avaliação.' };
    }
  },

  deleteAssessment(id: string): boolean {
    try {
      const history = this.getHistory().filter(item => item.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
      return true;
    } catch (e) {
      console.error('Falha ao excluir atendimento do histórico:', e);
      return false;
    }
  },

  clearAllHistory(): boolean {
    try {
      localStorage.removeItem(HISTORY_KEY);
      return true;
    } catch (e) {
      console.error('Falha ao limpar histórico:', e);
      return false;
    }
  }
};
