import { DraftAssessment, CompletedAssessment, Score } from '../types/hfmse';
import { HFMSE_SCALE_VERSION } from '../data/hfmseScaleData';

const LEGACY_DRAFT_KEY = 'hfmse_draft_v1';
const LEGACY_HISTORY_KEY = 'hfmse_history_v1';
const VAULT_METADATA_KEY = 'hfmse_vault_metadata_v1';
const VAULT_DATA_KEY = 'hfmse_vault_data_v1';
const PBKDF2_ITERATIONS = 600_000;

type VaultData = { draft: DraftAssessment | null; history: CompletedAssessment[] };
type VaultMetadata = { version: 1; salt: string; iterations: number };
type EncryptedPayload = { version: 1; iv: string; ciphertext: string };
export type VaultResult = { success: true } | { success: false; error: string };

let unlockedKey: CryptoKey | null = null;
let unlockedData: VaultData | null = null;
let vaultGeneration = 0;
let writeQueue: Promise<boolean> = Promise.resolve(true);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function asArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function getMetadata(): VaultMetadata | null {
  try {
    const value = localStorage.getItem(VAULT_METADATA_KEY);
    if (!value) return null;
    const metadata = JSON.parse(value) as VaultMetadata;
    if (metadata.version !== 1 || !metadata.salt || !metadata.iterations) return null;
    return metadata;
  } catch {
    return null;
  }
}

async function deriveKey(passphrase: string, salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey('raw', encoder.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', hash: 'SHA-256', salt: asArrayBuffer(salt), iterations },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  );
}

async function encryptData(key: CryptoKey, data: VaultData): Promise<EncryptedPayload> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: asArrayBuffer(iv) },
    key,
    asArrayBuffer(encoder.encode(JSON.stringify(data))),
  );
  return { version: 1, iv: toBase64(iv), ciphertext: toBase64(new Uint8Array(encrypted)) };
}

async function decryptData(key: CryptoKey, payload: EncryptedPayload): Promise<VaultData> {
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: asArrayBuffer(fromBase64(payload.iv)) },
    key,
    asArrayBuffer(fromBase64(payload.ciphertext)),
  );
  const data = JSON.parse(decoder.decode(decrypted)) as VaultData;
  if (!Array.isArray(data.history)) throw new Error('Dados inválidos');
  return { draft: data.draft || null, history: data.history };
}

function readLegacyData(): VaultData {
  try {
    const draftValue = localStorage.getItem(LEGACY_DRAFT_KEY);
    const historyValue = localStorage.getItem(LEGACY_HISTORY_KEY);
    return {
      draft: draftValue ? JSON.parse(draftValue) as DraftAssessment : null,
      history: historyValue ? JSON.parse(historyValue) as CompletedAssessment[] : [],
    };
  } catch {
    return { draft: null, history: [] };
  }
}

function persist(): Promise<boolean> {
  const key = unlockedKey;
  const data = unlockedData;
  const generation = vaultGeneration;
  if (!key || !data) return Promise.resolve(false);

  const write = async () => {
    if (generation !== vaultGeneration) return false;
    try {
      const payload = await encryptData(key, data);
      if (generation !== vaultGeneration) return false;
      localStorage.setItem(VAULT_DATA_KEY, JSON.stringify(payload));
      return true;
    } catch (error) {
      console.error('Falha ao cifrar os dados locais:', error);
      return false;
    }
  };
  writeQueue = writeQueue.then(write, write);
  return writeQueue;
}

export function calculateTotalScore(responses: Partial<Record<number, Score>>): number {
  return Object.values(responses).reduce((sum: number, score) => sum + (typeof score === 'number' ? score : 0), 0);
}

export function isDraftComplete(responses: Partial<Record<number, Score>>): boolean {
  for (let i = 1; i <= 33; i++) {
    if (responses[i] === undefined || responses[i] === null) return false;
  }
  return true;
}

export function getMissingItems(responses: Partial<Record<number, Score>>): number[] {
  const missing: number[] = [];
  for (let i = 1; i <= 33; i++) {
    if (responses[i] === undefined || responses[i] === null) missing.push(i);
  }
  return missing;
}

export const storageService = {
  isVaultConfigured(): boolean {
    return getMetadata() !== null;
  },

  async setupVault(passphrase: string): Promise<VaultResult> {
    if (passphrase.length < 4) return { success: false, error: 'Use uma senha local com pelo menos 4 caracteres.' };
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const key = await deriveKey(passphrase, salt, PBKDF2_ITERATIONS);
      vaultGeneration += 1;
      unlockedKey = key;
      unlockedData = readLegacyData();
      const saved = await persist();
      if (!saved) throw new Error('Falha ao salvar');
      const metadata: VaultMetadata = { version: 1, salt: toBase64(salt), iterations: PBKDF2_ITERATIONS };
      localStorage.setItem(VAULT_METADATA_KEY, JSON.stringify(metadata));
      localStorage.removeItem(LEGACY_DRAFT_KEY);
      localStorage.removeItem(LEGACY_HISTORY_KEY);
      return { success: true };
    } catch (error) {
      unlockedKey = null;
      unlockedData = null;
      console.error('Falha ao configurar o cofre local:', error);
      return { success: false, error: 'Não foi possível configurar a proteção local neste navegador.' };
    }
  },

  async unlockVault(passphrase: string): Promise<VaultResult> {
    const metadata = getMetadata();
    const savedPayload = localStorage.getItem(VAULT_DATA_KEY);
    if (!metadata || !savedPayload) return { success: false, error: 'Não foi possível localizar os dados protegidos neste navegador.' };
    try {
      const payload = JSON.parse(savedPayload) as EncryptedPayload;
      if (payload.version !== 1 || !payload.iv || !payload.ciphertext) throw new Error('Formato inválido');
      const key = await deriveKey(passphrase, fromBase64(metadata.salt), metadata.iterations);
      const data = await decryptData(key, payload);
      unlockedKey = key;
      unlockedData = data;
      return { success: true };
    } catch {
      unlockedKey = null;
      unlockedData = null;
      return { success: false, error: 'Senha incorreta ou dados locais indisponíveis.' };
    }
  },

  lockVault(): void {
    vaultGeneration += 1;
    unlockedKey = null;
    unlockedData = null;
  },

  clearVault(): void {
    vaultGeneration += 1;
    unlockedKey = null;
    unlockedData = null;
    localStorage.removeItem(VAULT_METADATA_KEY);
    localStorage.removeItem(VAULT_DATA_KEY);
    localStorage.removeItem(LEGACY_DRAFT_KEY);
    localStorage.removeItem(LEGACY_HISTORY_KEY);
  },

  getDraft(): DraftAssessment | null {
    return unlockedData?.draft || null;
  },

  async saveDraft(draft: DraftAssessment): Promise<boolean> {
    if (!unlockedData) return false;
    unlockedData = { ...unlockedData, draft: { ...draft, updatedAt: new Date().toISOString() } };
    return persist();
  },

  async clearDraft(): Promise<boolean> {
    if (!unlockedData) return false;
    unlockedData = { ...unlockedData, draft: null };
    return persist();
  },

  getHistory(): CompletedAssessment[] {
    if (!unlockedData) return [];
    return [...unlockedData.history].sort((a, b) => {
      const dateDiff = new Date(b.attendanceDate).getTime() - new Date(a.attendanceDate).getTime();
      return dateDiff !== 0 ? dateDiff : new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime();
    });
  },

  getAssessmentById(id: string): CompletedAssessment | null {
    return this.getHistory().find((item) => item.id === id) || null;
  },

  async finalizeAssessment(draft: DraftAssessment): Promise<{ success: boolean; completed?: CompletedAssessment; error?: string }> {
    if (!unlockedData) return { success: false, error: 'Desbloqueie os dados locais antes de continuar.' };
    if (!isDraftComplete(draft.responses)) return { success: false, error: 'Ainda existem itens sem resposta.' };
    const completed: CompletedAssessment = {
      id: draft.id,
      scaleVersion: draft.scaleVersion || HFMSE_SCALE_VERSION,
      patientInitials: draft.patientInitials.toUpperCase().trim(),
      attendanceDate: draft.attendanceDate,
      responses: draft.responses as Record<number, Score>,
      totalScore: calculateTotalScore(draft.responses),
      createdAt: draft.createdAt,
      completedAt: new Date().toISOString(),
    };
    const history = this.getHistory();
    const index = history.findIndex((item) => item.id === completed.id);
    if (index >= 0) history[index] = completed;
    else history.unshift(completed);
    unlockedData = { draft: null, history };
    const saved = await persist();
    return saved ? { success: true, completed } : { success: false, error: 'Erro ao gravar dados protegidos neste navegador.' };
  },

  async deleteAssessment(id: string): Promise<boolean> {
    if (!unlockedData) return false;
    unlockedData = { ...unlockedData, history: unlockedData.history.filter((item) => item.id !== id) };
    return persist();
  },

  async clearAllHistory(): Promise<boolean> {
    if (!unlockedData) return false;
    unlockedData = { ...unlockedData, history: [] };
    return persist();
  },
};
