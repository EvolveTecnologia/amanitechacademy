import React from 'react';
import { X, Share2, Award, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';
import { Certificate } from '../types';
import { Logo } from './Logo';

interface CertificateViewerModalProps {
  certificate: Certificate | null;
  userName: string;
  onClose: () => void;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  certificate,
  userName,
  onClose,
}) => {
  if (!certificate) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Certificat Amanitech Academy - ${certificate.title}`,
          text: `Découvrez mon certificat officiel "${certificate.title}" délivré par Amanitech Academy (AMANITECH - Technology and Sustainability) en RDC.`,
          url: window.location.href,
        });
      } catch (e) {
        console.log('Partage annulé');
      }
    }
  };

  const certHash = `AA-RDC-${certificate.id.padStart(4, '0')}-${btoa(certificate.title).substring(0, 8).toUpperCase()}`;

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto hide-scrollbar">
      <div 
        className="w-full max-w-2xl bg-[#12181A] border border-[#1BA9A2]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white my-auto animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1B2224] to-[#12181A] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 flex items-center justify-center text-[#1BA9A2]">
              <Award size={20} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Diplôme Numérique Officiel
              </h3>
              <p className="text-[10px] text-gray-400">AMANITECH – Technology and Sustainability • Kinshasa, RDC</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Certificate Printable Canvas Preview */}
        <div className="p-4 sm:p-8 bg-[#0F1719] overflow-y-auto hide-scrollbar max-h-[70vh]">
          <div className="relative border-4 border-double border-[#1BA9A2]/40 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-[#12181A] to-[#1B2224] shadow-xl text-center space-y-4 sm:space-y-6">
            
            {/* Top Ornamental Ribbon */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9">
                  <Logo variant="icon-only" className="w-full h-full" />
                </div>
                <div className="text-left">
                  <span className="block text-[12px] font-black tracking-widest text-white uppercase">AMANITECH ACADEMY</span>
                  <span className="block text-[9px] text-[#1BA9A2] font-semibold uppercase">Adaptive Learning &amp; Climate Sovereignty</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  <CheckCircle2 size={10} /> Vérifié &amp; Conforme
                </span>
              </div>
            </div>

            {/* Certificate Header */}
            <div className="space-y-1 pt-2">
              <p className="text-[10px] sm:text-xs text-[#1BA9A2] uppercase tracking-[3px] font-bold">
                CERTIFICAT DE QUALIFICATION PROFESSIONNELLE
              </p>
              <h2 className="text-lg sm:text-2xl font-black text-white uppercase tracking-tight">
                Attestation d'Excellence &amp; Compétences
              </h2>
            </div>

            <p className="text-xs text-gray-300 italic">
              Ce document officiel certifie que
            </p>

            {/* Recipient Name */}
            <div className="py-2 border-b-2 border-[#F26A21]/50 max-w-md mx-auto">
              <span className="text-base sm:text-2xl font-black uppercase text-[#F26A21] tracking-wide">
                {userName}
              </span>
            </div>

            <p className="text-xs text-gray-300 max-w-lg mx-auto leading-relaxed">
              a validé avec succès l'ensemble des modules d'évaluation théoriques et pratiques du programme de formation continue intitulé :
            </p>

            {/* Course Title Badge */}
            <div className="bg-[#1B2224] border border-[#1BA9A2]/40 rounded-xl py-3 px-4 max-w-lg mx-auto shadow-inner">
              <h3 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                {certificate.title}
              </h3>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left text-[10px] text-gray-300">
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[9px]">Date d'émission</span>
                <strong className="text-white font-semibold">{certificate.date}</strong>
              </div>
              <div>
                <span className="text-gray-400 block uppercase tracking-wider text-[9px]">ID d'Enregistrement</span>
                <strong className="text-[#1BA9A2] font-mono">{certHash}</strong>
              </div>
              <div className="col-span-2 sm:col-span-1 flex items-center justify-end sm:justify-center gap-2">
                <ShieldCheck size={20} className="text-[#F26A21]" />
                <span className="text-[9px] text-gray-400">Signature Numérique Amanitech</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-[#12181A] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Document numérique officiel à valeur certifiée • RDC &amp; International</span>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {typeof navigator.share === 'function' && (
              <button
                onClick={handleShare}
                className="flex-1 sm:flex-initial px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Share2 size={14} /> Partager
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-[#1BA9A2] hover:bg-[#148F89] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Printer size={15} /> Imprimer / PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
