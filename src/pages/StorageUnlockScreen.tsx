import React, { useState } from 'react';
import { AlertTriangle, KeyRound, LockKeyhole, ShieldCheck, Trash2 } from 'lucide-react';
import { VaultResult } from '../services/storageService';
import { ConfirmationDialog } from '../components/ConfirmationDialog';

interface StorageUnlockScreenProps {
  hasExistingVault: boolean;
  onSubmit: (passphrase: string) => Promise<VaultResult>;
  onClearVault: () => void;
}

export const StorageUnlockScreen: React.FC<StorageUnlockScreenProps> = ({ hasExistingVault, onSubmit, onClearVault }) => {
  const [passphrase, setPassphrase] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!hasExistingVault && passphrase !== confirmation) {
      setError('As senhas não conferem.');
      return;
    }
    setIsSubmitting(true);
    setError(null);
    const result = await onSubmit(passphrase);
    if (!result.success) setError(result.error);
    setIsSubmitting(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6">
      <section className="w-full max-w-md bg-surface-white border border-surface-container rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center mx-auto shadow-md">
            <LockKeyhole className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-headline text-2xl font-extrabold text-on-surface">
              {hasExistingVault ? 'Desbloquear histórico local' : 'Proteger histórico local'}
            </h1>
            <p className="text-sm text-secondary mt-2 leading-relaxed">
              {hasExistingVault
                ? 'Informe a senha local para acessar avaliações já salvas neste dispositivo.'
                : 'Crie uma senha local para cifrar rascunhos e histórico neste navegador.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-3.5 bg-blue-50 border border-blue-100 rounded-2xl text-xs text-slate-700 leading-relaxed">
          <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <p>A senha não é enviada nem armazenada. Os dados são cifrados com AES-256-GCM e permanecem neste dispositivo.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="localPassphrase" className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1.5">
              Senha local
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary" />
              <input
                id="localPassphrase"
                type="password"
                autoComplete={hasExistingVault ? 'current-password' : 'new-password'}
                value={passphrase}
                onChange={(event) => setPassphrase(event.target.value)}
                minLength={10}
                required
                className="w-full pl-11 pr-4 py-3 bg-surface-container-low/60 border border-surface-container rounded-2xl text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder={hasExistingVault ? 'Digite sua senha' : 'Mínimo de 10 caracteres'}
              />
            </div>
          </div>

          {!hasExistingVault && (
            <div>
              <label htmlFor="localPassphraseConfirmation" className="block text-xs font-bold uppercase tracking-wider text-on-surface mb-1.5">
                Confirmar senha local
              </label>
              <input
                id="localPassphraseConfirmation"
                type="password"
                autoComplete="new-password"
                value={confirmation}
                onChange={(event) => setConfirmation(event.target.value)}
                minLength={10}
                required
                className="w-full px-4 py-3 bg-surface-container-low/60 border border-surface-container rounded-2xl text-on-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Repita a senha"
              />
            </div>
          )}

          {error && (
            <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-error-red">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-primary hover:bg-primary-container disabled:opacity-60 text-white rounded-2xl font-bold transition-colors"
          >
            {isSubmitting ? 'Protegendo dados...' : hasExistingVault ? 'Desbloquear' : 'Criar proteção local'}
          </button>
        </form>

        {hasExistingVault && (
          <div className="pt-2 border-t border-surface-container">
            <p className="text-xs text-secondary leading-relaxed">
              Esqueceu a senha? Por segurança, ela não pode ser recuperada. Você poderá apagar somente os dados deste navegador e criar uma nova proteção.
            </p>
            <button
              type="button"
              onClick={() => setShowClearConfirmation(true)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-error-red hover:underline"
            >
              <Trash2 className="w-4 h-4" /> Apagar dados protegidos deste navegador
            </button>
          </div>
        )}
      </section>

      <ConfirmationDialog
        isOpen={showClearConfirmation}
        title="Apagar dados protegidos?"
        message="Todos os rascunhos e atendimentos salvos neste navegador serão apagados permanentemente. Sem a senha, não há outra forma segura de recuperá-los."
        confirmLabel="Apagar dados"
        cancelLabel="Voltar"
        variant="danger"
        onConfirm={() => {
          setShowClearConfirmation(false);
          onClearVault();
        }}
        onCancel={() => setShowClearConfirmation(false)}
      />
    </main>
  );
};
