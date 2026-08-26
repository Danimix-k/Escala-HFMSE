import React from 'react';
import { CompletedAssessment } from '../types/hfmse';
import { HFMSE_ITEMS } from '../data/hfmseScaleData';
import { Printer, ArrowLeft, Activity, Shield } from 'lucide-react';

export interface ReportScreenProps {
  assessment: CompletedAssessment;
  onBack: () => void;
}

export const ReportScreen: React.FC<ReportScreenProps> = ({
  assessment,
  onBack
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 sm:py-10 px-4 sm:px-6">
      {/* Floating Action Bar (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between no-print">
        <button
          type="button"
          onClick={onBack}
          className="px-4 py-2.5 bg-surface-white hover:bg-surface-container border border-surface-container rounded-xl text-sm font-semibold text-on-surface flex items-center gap-2 shadow-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <button
          type="button"
          onClick={handlePrint}
          className="px-6 py-2.5 bg-primary hover:bg-primary-container text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-primary/20 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimir / Salvar em PDF</span>
        </button>
      </div>

      {/* Printable Sheet (A4 format) */}
      <div className="max-w-4xl mx-auto bg-white border border-slate-300 shadow-xl rounded-2xl p-8 sm:p-12 print:shadow-none print:border-none print:p-0 print:m-0 print:max-w-full">
        {/* Report Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                <Activity className="w-7 h-7" />
              </div>
              <div>
                <h1 className="font-headline font-bold text-xl sm:text-2xl text-slate-900 leading-tight">
                  Relatório de Avaliação Motora HFMSE
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Versão Brasileira da Escala HFMSE (Hammersmith Functional Motor Scale - Expanded)
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Pontuação Total
              </span>
              <span className="font-headline font-black text-3xl sm:text-4xl text-primary">
                {assessment.totalScore} <span className="text-base text-slate-500 font-bold">/ 66</span>
              </span>
            </div>
          </div>

          {/* Patient Identification Metadata Table */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">Iniciais do Paciente:</span>
              <strong className="text-slate-900 text-sm font-bold tracking-wide">{assessment.patientInitials}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Data do Atendimento:</span>
              <strong className="text-slate-900 text-sm font-semibold">
                {assessment.attendanceDate.split('-').reverse().join('/')}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Versão do Instrumento:</span>
              <strong className="text-slate-900 text-xs font-mono">{assessment.scaleVersion}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-medium block">Registro de Conclusão:</span>
              <strong className="text-slate-900 text-xs">{new Date(assessment.completedAt).toLocaleDateString('pt-BR')}</strong>
            </div>
          </div>
        </div>

        {/* 33 Items Table */}
        <div className="space-y-4">
          <h2 className="font-headline font-bold text-sm text-slate-900 uppercase tracking-wider">
            Detalhamento dos 33 Itens da Escala
          </h2>

          <div className="border border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-300 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-2.5 px-3 w-12 text-center">Nº</th>
                  <th className="py-2.5 px-3 w-1/3">Item / Critério</th>
                  <th className="py-2.5 px-3">Grau de Resposta Observado</th>
                  <th className="py-2.5 px-3 w-16 text-center">Pts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {HFMSE_ITEMS.map((item) => {
                  const score = assessment.responses[item.number];
                  const selectedOption = item.options.find((o) => o.score === score);

                  return (
                    <tr key={item.number} className="hover:bg-slate-50/60 break-inside-avoid">
                      <td className="py-2 px-3 text-center font-bold text-slate-700">
                        {item.number}
                      </td>
                      <td className="py-2 px-3 font-semibold text-slate-900">
                        {item.title}
                      </td>
                      <td className="py-2 px-3 text-slate-700 leading-snug">
                        {selectedOption ? selectedOption.description : '—'}
                      </td>
                      <td className="py-2 px-3 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded font-bold text-xs ${
                          score === 2 ? 'bg-emerald-100 text-emerald-800' :
                          score === 1 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-800'
                        }`}>
                          {score}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total & Signature Block */}
        <div className="mt-8 pt-6 border-t-2 border-slate-900 break-inside-avoid space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-xs text-slate-500 max-w-md">
              <Shield className="w-4 h-4 text-slate-400 inline mr-1" />
              Documento gerado localmente pelo aplicativo clínico HFMSE. Armazenado sob controle do profissional no navegador.
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-600 block">Soma dos 33 itens:</span>
              <strong className="font-headline text-2xl text-slate-900">{assessment.totalScore} / 66 Pontos</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 text-xs text-center">
            <div className="border-t border-slate-400 pt-2">
              <span className="font-semibold text-slate-800 block">Profissional Examinador</span>
              <span className="text-slate-500">Assinatura e Carimbo / Registro Profissional</span>
            </div>
            <div className="border-t border-slate-400 pt-2">
              <span className="font-semibold text-slate-800 block">Data da Emissão</span>
              <span className="text-slate-500">{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
