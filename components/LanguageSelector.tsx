import React, { useState, useEffect, useRef } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage, LanguageCode } from '../context/LanguageContext';

export type { LanguageCode };

export const DRCFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-4" }) => (
  <svg viewBox="0 0 800 600" className={`${className} rounded-sm object-cover shadow-sm shrink-0 border border-white/20`} aria-label="Bandeira da República Democrática do Congo (Francês Congolês)">
    <rect width="800" height="600" fill="#007FFF" />
    <path d="M0,600 L800,0 L800,100 L130,600 Z" fill="#FFD100" />
    <path d="M0,600 L800,0 L800,65 L85,600 Z" fill="#CE1021" />
    <polygon points="120,80 135,125 180,125 143,152 157,197 120,170 83,197 97,152 60,125 105,125" fill="#FFD100" />
  </svg>
);

export const USFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-4" }) => (
  <svg viewBox="0 0 740 390" className={`${className} rounded-sm object-cover shadow-sm shrink-0 border border-white/20`} aria-label="Bandeira dos EUA (Inglês)">
    <rect width="740" height="390" fill="#BB133E"/>
    <path d="M0,30H740M0,90H740M0,150H740M0,210H740M0,330H740" stroke="#FFF" strokeWidth="30"/>
    <rect width="296" height="210" fill="#002147"/>
    <g fill="#FFF">
      <circle cx="28" cy="21" r="9"/><circle cx="84" cy="21" r="9"/><circle cx="140" cy="21" r="9"/><circle cx="196" cy="21" r="9"/><circle cx="252" cy="21" r="9"/>
      <circle cx="56" cy="42" r="9"/><circle cx="112" cy="42" r="9"/><circle cx="168" cy="42" r="9"/><circle cx="224" cy="42" r="9"/>
      <circle cx="28" cy="63" r="9"/><circle cx="84" cy="63" r="9"/><circle cx="140" cy="63" r="9"/><circle cx="196" cy="63" r="9"/><circle cx="252" cy="63" r="9"/>
      <circle cx="56" cy="84" r="9"/><circle cx="112" cy="84" r="9"/><circle cx="168" cy="84" r="9"/><circle cx="224" cy="84" r="9"/>
      <circle cx="28" cy="105" r="9"/><circle cx="84" cy="105" r="9"/><circle cx="140" cy="105" r="9"/><circle cx="196" cy="105" r="9"/><circle cx="252" cy="105" r="9"/>
      <circle cx="56" cy="126" r="9"/><circle cx="112" cy="126" r="9"/><circle cx="168" cy="126" r="9"/><circle cx="224" cy="126" r="9"/>
      <circle cx="28" cy="147" r="9"/><circle cx="84" cy="147" r="9"/><circle cx="140" cy="147" r="9"/><circle cx="196" cy="147" r="9"/><circle cx="252" cy="147" r="9"/>
      <circle cx="56" cy="168" r="9"/><circle cx="112" cy="168" r="9"/><circle cx="168" cy="168" r="9"/><circle cx="224" cy="168" r="9"/>
      <circle cx="28" cy="189" r="9"/><circle cx="84" cy="189" r="9"/><circle cx="140" cy="189" r="9"/><circle cx="196" cy="189" r="9"/><circle cx="252" cy="189" r="9"/>
    </g>
  </svg>
);

export const BRFlag: React.FC<{ className?: string }> = ({ className = "w-6 h-4" }) => (
  <svg viewBox="0 0 700 490" className={`${className} rounded-sm object-cover shadow-sm shrink-0 border border-white/20`} aria-label="Bandeira do Brasil (Português Brasileiro)">
    <rect width="700" height="490" fill="#009B3A"/>
    <polygon points="350,52 648,245 350,438 52,245" fill="#FEDF00"/>
    <circle cx="350" cy="245" r="115" fill="#002776"/>
    <path d="M 230 260 Q 350 200 470 260" fill="none" stroke="#FFF" strokeWidth="14"/>
  </svg>
);

export const LANGUAGES_CONFIG: { code: LanguageCode; name: string; Flag: React.FC<{ className?: string }> }[] = [
  { code: 'fr-cd', name: 'Français (RDC)', Flag: DRCFlag },
  { code: 'en-us', name: 'English (US)', Flag: USFlag },
  { code: 'pt-br', name: 'Português (BR)', Flag: BRFlag },
];

interface LanguageSelectorProps {
  variant?: 'navbar' | 'settings' | 'flags-only';
  onLanguageChange?: (lang: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'navbar',
  onLanguageChange,
}) => {
  const { language: currentLang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    if (onLanguageChange) onLanguageChange(code);
    setIsOpen(false);
  };

  const CurrentFlag = LANGUAGES_CONFIG.find(l => l.code === currentLang)?.Flag || DRCFlag;

  if (variant === 'settings') {
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LANGUAGES_CONFIG.map(({ code, name, Flag }) => {
            const isSelected = currentLang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1BA9A2]/20 border-[#1BA9A2] text-white shadow-lg shadow-[#1BA9A2]/20'
                    : 'bg-[#12181A] border-white/10 text-gray-300 hover:bg-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-8 h-5 rounded shadow" />
                  <span className="text-xs font-bold">{name}</span>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-[#1BA9A2] text-white flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Navbar variant (Globe Icon with flag options)
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white transition-all cursor-pointer"
        title="Changer de langue / Change language / Alterar idioma"
      >
        <Globe size={18} className="text-[#1BA9A2] shrink-0" />
        <CurrentFlag className="w-5 h-3.5" />
      </button>

      {/* Popover / Dropdown with ONLY the flags as requested */}
      {isOpen && (
        <div className="absolute right-0 mt-2 p-2 bg-[#1B2224]/95 backdrop-blur-xl border border-[#1BA9A2]/40 rounded-2xl shadow-2xl z-[100] flex flex-col gap-2 min-w-[64px] animate-in fade-in zoom-in-95 duration-150">
          {LANGUAGES_CONFIG.map(({ code, name, Flag }) => {
            const isSelected = currentLang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                title={name}
                className={`p-2 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-[#1BA9A2]/30 border-[#1BA9A2] scale-105 shadow-[0_0_10px_rgba(27,169,162,0.4)]'
                    : 'bg-white/5 border-transparent hover:bg-white/15 hover:border-white/20'
                }`}
              >
                <Flag className="w-7 h-4.5 rounded" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
