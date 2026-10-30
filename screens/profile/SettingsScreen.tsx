import React, { useState, useEffect } from 'react';
import { 
  Bell, Wifi, Monitor, PlayCircle, Trash2, Smartphone, 
  ShieldCheck, ChevronRight, Globe, HardDrive, CheckCircle2, 
  RefreshCw, Check 
} from 'lucide-react';
import { LanguageSelector } from '../../components/LanguageSelector';

export const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('cerclehub_app_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Ignored
      }
    }
    return {
      promoEmails: true,
      pushNotifs: true,
      lessonReminders: true,
      wifiOnly: true,
      autoplay: true,
      quality: 'auto',
      audioLanguage: 'fr',
      storageUsedMb: 142
    };
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showClearCacheModal, setShowClearCacheModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const updateSetting = (key: string, val: any) => {
    const updated = { ...settings, [key]: val };
    setSettings(updated);
    try {
      localStorage.setItem('cerclehub_app_settings', JSON.stringify(updated));
    } catch {
      // Ignored
    }
    showToast('Paramètre mis à jour.');
  };

  const toggle = (key: keyof typeof settings) => {
    updateSetting(key, !settings[key]);
  };

  const handleClearCache = () => {
    updateSetting('storageUsedMb', 0);
    setShowClearCacheModal(false);
    showToast('Mémoire cache et données temporaires purgées avec succès !');
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-6 animate-in fade-in duration-300 pb-36 text-white max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-[120] bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-in slide-in-from-top duration-300">
          <CheckCircle2 size={18} className="text-white shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="space-y-1">
        <h1 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
          Paramètres de l'Application
        </h1>
        <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">
          Personnalisez votre confort de lecture vidéo, vos notifications et la gestion du stockage sur votre appareil.
        </p>
      </div>

      {/* Section 0: Langue de la Plateforme / Idioma */}
      <section className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
          <Globe size={15} /> Langue de l'Interface / Language / Idioma
        </h3>
        <p className="text-[10px] text-gray-400">
          Sélectionnez votre langue d'affichage préférentielle (Francês Congolês, English, Português Brasileiro).
        </p>
        <LanguageSelector variant="settings" onLanguageChange={() => showToast('Langue mise à jour avec succès.')} />
      </section>

      {/* Section 1: Lecture Vidéo & Économie de Données */}
      <section className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
          <Monitor size={15} /> Lecture Vidéo & Bande Passante
        </h3>

        <div className="space-y-3">
          {/* Quality selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-[#12181A] rounded-xl border border-white/5">
            <div>
              <h4 className="text-xs font-bold text-white">Résolution de streaming par défaut</h4>
              <p className="text-[10px] text-gray-400">Ajustez la qualité vidéo selon votre connexion internet en RDC.</p>
            </div>
            <select
              value={settings.quality}
              onChange={e => updateSetting('quality', e.target.value)}
              className="bg-[#1B2224] text-white text-xs border border-white/10 rounded-xl px-3 py-2 outline-none focus:border-[#1BA9A2]"
            >
              <option value="auto">Automatique (Adaptative)</option>
              <option value="1080p">Full HD 1080p (Très haute qualité)</option>
              <option value="720p">HD 720p (Équilibré)</option>
              <option value="480p">480p (Économie maximale de données)</option>
            </select>
          </div>

          {/* Wi-Fi only toggle */}
          <div 
            onClick={() => toggle('wifiOnly')}
            className="flex items-center justify-between p-3.5 bg-[#12181A] rounded-xl border border-white/5 cursor-pointer hover:border-[#1BA9A2]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-[#1BA9A2]">
                <Wifi size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Téléchargements Wi-Fi uniquement</h4>
                <p className="text-[10px] text-gray-400">Évite la consommation de votre forfait données cellulaires (4G/5G).</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.wifiOnly ? 'bg-[#1BA9A2]' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.wifiOnly ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>

          {/* Autoplay toggle */}
          <div 
            onClick={() => toggle('autoplay')}
            className="flex items-center justify-between p-3.5 bg-[#12181A] rounded-xl border border-white/5 cursor-pointer hover:border-[#1BA9A2]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-[#F26A21]">
                <PlayCircle size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Lecture continue (Autoplay)</h4>
                <p className="text-[10px] text-gray-400">Enchaîne automatiquement avec la leçon suivante du parcours.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.autoplay ? 'bg-[#1BA9A2]' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.autoplay ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Notifications */}
      <section className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
          <Bell size={15} /> Préférences de Notifications
        </h3>

        <div className="space-y-3">
          <div 
            onClick={() => toggle('pushNotifs')}
            className="flex items-center justify-between p-3.5 bg-[#12181A] rounded-xl border border-white/5 cursor-pointer hover:border-[#1BA9A2]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-emerald-400">
                <Smartphone size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Notifications Push & Mobiles</h4>
                <p className="text-[10px] text-gray-400">Recevez des alertes lors de la publication de nouveaux cours.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.pushNotifs ? 'bg-[#1BA9A2]' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.pushNotifs ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>

          <div 
            onClick={() => toggle('lessonReminders')}
            className="flex items-center justify-between p-3.5 bg-[#12181A] rounded-xl border border-white/5 cursor-pointer hover:border-[#1BA9A2]/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-lg text-amber-400">
                <Bell size={17} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Rappels d'apprentissage hebdomadaires</h4>
                <p className="text-[10px] text-gray-400">Pour garder le rythme et valider vos modules certifiants.</p>
              </div>
            </div>
            <div className={`w-11 h-6 rounded-full relative transition-colors ${settings.lessonReminders ? 'bg-[#1BA9A2]' : 'bg-gray-700'}`}>
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all ${settings.lessonReminders ? 'left-5' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Stockage & Cache */}
      <section className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#1BA9A2] flex items-center gap-2 pb-1 border-b border-white/5">
          <HardDrive size={15} /> Espace de Stockage & Cache Local
        </h3>

        <div className="p-4 bg-[#12181A] rounded-xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold text-white">Mémoire Cache Utilisée</h4>
              <span className="px-2 py-0.5 bg-[#1BA9A2]/20 text-[#1BA9A2] rounded-md text-[10px] font-bold">
                {settings.storageUsedMb} Mo
              </span>
            </div>
            <p className="text-[10px] text-gray-400 mt-1">
              Fichiers temporaires des livrets PDF, vignettes de cours et vidéos pré-chargées.
            </p>
          </div>

          <button
            onClick={() => setShowClearCacheModal(true)}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shrink-0"
          >
            <Trash2 size={14} />
            Vider le Cache
          </button>
        </div>
      </section>

      {/* Section 4: Version & Legal */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-gray-400">
        <div>
          <span className="font-bold text-white block">Amanitech Academy Platform • Version 2.5.0 Premium</span>
          <span className="text-[10px]">Conçu et déployé pour la République Démocratique du Congo par Amanitech SARL.</span>
        </div>
        <span className="text-[10px] font-mono text-[#1BA9A2] bg-[#1BA9A2]/20 px-2.5 py-1 rounded-lg">
          Serveurs Kinshasa &amp; Cloud RDC
        </span>
      </div>

      {/* Clear Cache Modal */}
      {showClearCacheModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#1B2224] border border-white/10 rounded-3xl p-6 sm:p-8 w-full max-w-sm space-y-4 shadow-2xl text-white text-center">
            <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
              <Trash2 size={22} />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight">Vider le cache de l'application ?</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Cette action supprimera les données temporaires pour libérer de l'espace sur votre appareil. Vos cours suivis et vos téléchargements permanents restent conservés.
            </p>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleClearCache}
                className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Confirmer la Purge ({settings.storageUsedMb} Mo)
              </button>
              <button
                onClick={() => setShowClearCacheModal(false)}
                className="w-full py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsScreen;
