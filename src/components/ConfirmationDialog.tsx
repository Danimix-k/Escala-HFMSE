import React from 'react';
import { AlertTriangle, Trash2, CheckCircle2, X } from 'lucide-react';

export interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  variant = 'primary',
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  const getVariantStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          icon: <Trash2 className="w-6 h-6 text-error-red" />,
          iconBg: 'bg-red-50',
          buttonClass: 'bg-error-red hover:bg-red-700 text-white'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
          iconBg: 'bg-amber-50',
          buttonClass: 'bg-amber-600 hover:bg-amber-700 text-white'
        };
      case 'primary':
      default:
        return {
          icon: <CheckCircle2 className="w-6 h-6 text-primary" />,
          iconBg: 'bg-blue-50',
          buttonClass: 'bg-primary hover:bg-primary-container text-white'
        };
    }
  };

  const { icon, iconBg, buttonClass } = getVariantStyles();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-surface-container space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center shrink-0`}>
              {icon}
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-on-surface leading-tight">
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="text-secondary hover:text-on-surface p-1 rounded-lg hover:bg-surface-container"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed">
          {message}
        </p>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 rounded-xl border border-surface-container text-sm font-semibold text-secondary hover:bg-surface-container hover:text-on-surface transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
