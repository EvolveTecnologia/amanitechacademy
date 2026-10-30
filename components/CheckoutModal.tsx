import React, { useState } from 'react';
import { Course } from '../types';
import { X, ShieldCheck, Lock, CreditCard, Smartphone, Building2, CheckCircle2, Award, Clock, Sparkles } from 'lucide-react';
import { DRCFlag } from './LanguageSelector';

interface CheckoutModalProps {
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ course, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card' | 'bank_transfer'>('mobile_money');
  const [mobileOperator, setMobileOperator] = useState<'mpesa' | 'orange' | 'airtel' | 'afrimoney'>('mpesa');
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleFinishAccess = () => {
    onSuccess();
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
        <div className="bg-[#1B2224] border border-[#1BA9A2] rounded-3xl p-6 sm:p-8 w-full max-w-lg text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-16 h-16 bg-[#1BA9A2]/20 border border-[#1BA9A2] text-[#1BA9A2] rounded-full flex items-center justify-center mx-auto shadow-lg shadow-[#1BA9A2]/30">
            <CheckCircle2 size={36} />
          </div>

          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#1BA9A2]/20 text-[#1BA9A2] text-[10px] font-black uppercase tracking-widest border border-[#1BA9A2]/40">
              Inscription Confirmée
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
              Bienvenue dans la formation !
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Votre accès au <strong className="text-white">{course.title}</strong> est désormais activé.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#12181A] border border-white/10 text-left space-y-2 text-xs">
            <div className="flex justify-between items-center text-gray-300">
              <span>Apprenant :</span>
              <strong className="text-white">{fullName || 'Apprenant Amanitech'}</strong>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Formateur :</span>
              <strong className="text-[#1BA9A2]">{course.instructor}</strong>
            </div>
            <div className="flex justify-between items-center text-gray-300">
              <span>Certification :</span>
              <strong className="text-white">{course.certification || 'AMANITECH Academy'}</strong>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinishAccess}
            className="w-full py-4 bg-[#F26A21] hover:bg-[#D95A15] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer border border-[#F26A21]/50"
          >
            Accéder Immédiatement aux Cours →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[110] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="bg-[#1B2224] border border-[#1BA9A2]/40 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#12181A] via-[#1B2224] to-[#0E6B66]/40 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 text-[#1BA9A2]">
              <Lock size={20} />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-tight">
                Paiement Sécurisé &amp; Inscription
              </h2>
              <p className="text-[11px] text-gray-300 flex items-center gap-1.5">
                <ShieldCheck size={13} className="text-[#1BA9A2]" />
                Cryptage SSL 256 bits • Amanitech Academy RDC
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form & Summary Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left Column: Order Summary & Guarantee */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Course Card Preview */}
            <div className="p-4 rounded-2xl bg-[#12181A] border border-[#1BA9A2]/30 space-y-3">
              <div className="relative h-32 rounded-xl overflow-hidden border border-white/10">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover" 
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#1BA9A2] text-white text-[9px] font-black uppercase tracking-wider">
                  Accès Illimité
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#1BA9A2] uppercase tracking-wider block mb-1">
                  {course.category}
                </span>
                <h3 className="text-xs font-black text-white leading-snug line-clamp-2">
                  {course.title}
                </h3>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5 text-[11px] text-gray-300">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><Clock size={13} className="text-[#F26A21]" /> Durée :</span>
                  <strong className="text-white">{course.duration || '24h (8 modules)'}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1"><Award size={13} className="text-[#1BA9A2]" /> Certificat :</span>
                  <strong className="text-white">Inclus</strong>
                </div>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1BA9A2]/20 to-[#0E6B66]/30 border border-[#1BA9A2]/40 text-center space-y-1">
              <span className="text-[10px] font-bold text-[#1BA9A2] uppercase tracking-widest block">
                Investissement Formatif
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-black text-white">$149 USD</span>
                <span className="text-xs text-gray-400 line-through">$299 USD</span>
              </div>
              <p className="text-[10px] text-gray-300">
                Soit approx. 380,000 CDF via Mobile Money
              </p>
            </div>

            {/* Guarantee */}
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2.5 text-[11px] text-gray-300">
              <ShieldCheck size={20} className="text-[#1BA9A2] shrink-0" />
              <span>Garantie d'accès permanent + assistance du tuteur IA Gemini.</span>
            </div>

          </div>

          {/* Right Column: User Info & Payment Method Selection */}
          <div className="md:col-span-7 space-y-5">
            
            {/* Student Info */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
                1. Vos Coordonnées d'Apprenant
              </h3>

              <div className="space-y-2.5 text-xs">
                <div>
                  <label className="block text-gray-300 font-bold mb-1 text-[11px]">Nom &amp; Prénom complet *</label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Jean-Luc Kalala"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12181A] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#1BA9A2]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-gray-300 font-bold mb-1 text-[11px]">Email Professionnel *</label>
                    <input 
                      type="email"
                      required
                      placeholder="apprenant@amanitech.cd"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12181A] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#1BA9A2]"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 font-bold mb-1 text-[11px]">Téléphone (WhatsApp) *</label>
                    <input 
                      type="tel"
                      required
                      placeholder="+243 812 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#12181A] border border-white/15 text-white placeholder-gray-500 focus:outline-none focus:border-[#1BA9A2]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1BA9A2]" />
                2. Mode de Paiement
              </h3>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile_money')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'mobile_money'
                      ? 'bg-[#1BA9A2]/25 border-[#1BA9A2] text-white shadow-md'
                      : 'bg-[#12181A] border-white/10 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-1">
                    <Smartphone size={16} />
                    <DRCFlag className="w-4 h-2.5" />
                  </div>
                  <span className="text-[10px] font-bold">Mobile Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'bg-[#1BA9A2]/25 border-[#1BA9A2] text-white shadow-md'
                      : 'bg-[#12181A] border-white/10 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <CreditCard size={16} />
                  <span className="text-[10px] font-bold">Carte Visa / MC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 text-center transition-all cursor-pointer ${
                    paymentMethod === 'bank_transfer'
                      ? 'bg-[#1BA9A2]/25 border-[#1BA9A2] text-white shadow-md'
                      : 'bg-[#12181A] border-white/10 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <Building2 size={16} />
                  <span className="text-[10px] font-bold">Virement / RDC</span>
                </button>
              </div>

              {/* Mobile Money Operators */}
              {paymentMethod === 'mobile_money' && (
                <div className="p-3.5 rounded-2xl bg-[#12181A] border border-white/10 space-y-2.5 animate-in fade-in duration-200">
                  <span className="text-[11px] font-bold text-gray-300 block">Choisissez votre opérateur (RDC) :</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mpesa', name: 'M-Pesa', color: 'bg-red-600/30 border-red-500 text-red-300' },
                      { id: 'orange', name: 'Orange Money', color: 'bg-orange-600/30 border-orange-500 text-orange-300' },
                      { id: 'airtel', name: 'Airtel Money', color: 'bg-rose-600/30 border-rose-500 text-rose-300' },
                      { id: 'afrimoney', name: 'Afrimoney', color: 'bg-yellow-600/30 border-yellow-500 text-yellow-300' },
                    ].map((op) => (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setMobileOperator(op.id as any)}
                        className={`py-2 px-2.5 rounded-xl border text-[11px] font-extrabold transition-all cursor-pointer ${
                          mobileOperator === op.id ? op.color : 'bg-white/5 border-white/10 text-gray-400'
                        }`}
                      >
                        {op.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#F26A21] hover:bg-[#D95A15] text-white font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl hover:scale-[1.01] active:scale-95 cursor-pointer border border-[#F26A21]/50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Traitement sécurisé en cours...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>VALIDER ET FINALISER L'INSCRIPTION</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-gray-400 text-center">
              En validant, vous acceptez les conditions d'accès de la plateforme Amanitech Academy.
            </p>

          </div>

        </form>

      </div>
    </div>
  );
};

export default CheckoutModal;
