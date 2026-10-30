import React, { useState } from 'react';
import { Award, ExternalLink, Download, Share2, Search, CheckCircle2, ShieldCheck, Clock, BookOpen, Check } from 'lucide-react';
import { Certificate } from '../../types';

interface CertificatesScreenProps {
  userName: string;
  onViewCertificate: (cert: Certificate) => void;
}

export const CertificatesScreen: React.FC<CertificatesScreenProps> = ({ userName, onViewCertificate }) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'in_progress'>('completed');
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const completedCertificates: Certificate[] = [
    {
      id: '1',
      title: 'Certificat en Management de Projet Agile & Scrum',
      date: '14/01/2026',
      code: 'CH-2026-AG-8941',
      category: 'Gestion & Entrepreneuriat',
      hours: 45,
      grade: 'Mention Très Bien'
    },
    {
      id: '2',
      title: 'Fondements de la Transformation Numérique & Cloud',
      date: '20/12/2025',
      code: 'CH-2025-TN-5520',
      category: 'Technologie & Innovation Digitale',
      hours: 60,
      grade: 'Mention Excellent'
    },
    {
      id: '3',
      title: 'Leadership Stratégique des Organisations en RDC',
      date: '15/11/2025',
      code: 'CH-2025-LS-3108',
      category: 'Leadership & Compétences',
      hours: 35,
      grade: 'Mention Très Bien'
    },
    {
      id: '4',
      title: 'Anglais Professionnel des Affaires & Communication',
      date: '02/10/2025',
      code: 'CH-2025-EN-1204',
      category: 'Langues & Cultures',
      hours: 40,
      grade: 'Mention Bien'
    }
  ];

  const inProgressCertificates = [
    {
      id: 'ip-1',
      title: 'Industrie 4.0, Automatisation & Outils IA',
      category: 'Technologie & Innovation Digitale',
      progress: 75,
      completedHours: 30,
      totalHours: 40,
      nextModule: 'Module 4: Intelligence Artificielle appliquée à la logistique'
    },
    {
      id: 'ip-2',
      title: 'Développement Durable & RSE des Entreprises Congolaises',
      category: 'Environnement & Durabilité',
      progress: 40,
      completedHours: 12,
      totalHours: 30,
      nextModule: 'Module 2: Normes environnementales et transition énergétique'
    }
  ];

  const filteredCerts = completedCertificates.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.code && c.code.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleShare = (cert: Certificate) => {
    const url = `https://amanitech.academy/verify/${cert.code || cert.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    showToast(`Lien de vérification copié : ${cert.code}`);
  };

  const handleDownload = (cert: Certificate) => {
    showToast(`Génération du PDF officiel pour "${cert.title}"...`);
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
      <div className="bg-gradient-to-r from-[#1B2224] via-[#1BA9A2]/20 to-[#1B2224] border border-[#1BA9A2]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5 max-w-2xl">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#1BA9A2]">
            Espace Certifications Officielles
          </span>
          <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Mes Diplômes & Attestations Numériques
          </h1>
          <p className="text-xs text-gray-300 leading-relaxed">
            Consultez, partagez et téléchargez vos diplômes certifiés par Amanitech Academy et Amanitech SARL Kinshasa. Chaque titre dispose d'une clé de sécurité infalsifiable reconnue par les recruteurs.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#12181A]/80 border border-white/10 rounded-2xl p-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1BA9A2] to-[#F26A21] flex items-center justify-center text-white shadow-lg">
            <Award size={26} />
          </div>
          <div>
            <span className="block text-2xl font-black text-white">{completedCertificates.length}</span>
            <span className="block text-[10px] text-[#1BA9A2] font-bold uppercase tracking-wider">Certificats Obtenus</span>
          </div>
        </div>
      </div>

      {/* Tabs and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-3">
        <div className="flex gap-3">
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-[#1BA9A2] text-white shadow-md'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            <Award size={15} />
            Obtenus ({completedCertificates.length})
          </button>
          <button
            onClick={() => setActiveTab('in_progress')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'in_progress'
                ? 'bg-[#1BA9A2] text-white shadow-md'
                : 'text-gray-400 hover:text-white bg-white/5'
            }`}
          >
            <Clock size={15} />
            En cours ({inProgressCertificates.length})
          </button>
        </div>

        {activeTab === 'completed' && (
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Rechercher un diplôme..."
              className="w-full bg-[#1B2224] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-[#1BA9A2] transition-colors"
            />
          </div>
        )}
      </div>

      {/* Tab 1: Completed Certificates */}
      {activeTab === 'completed' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {filteredCerts.length === 0 ? (
            <div className="p-8 text-center bg-[#1B2224] border border-white/10 rounded-2xl text-gray-400 text-xs">
              Aucun certificat ne correspond à votre recherche "{searchTerm}".
            </div>
          ) : (
            filteredCerts.map(cert => (
              <div 
                key={cert.id}
                className="bg-[#1B2224] border border-white/10 hover:border-[#1BA9A2] rounded-2xl p-5 sm:p-6 transition-all shadow-lg flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-[#1BA9A2] to-[#1BA9A2] flex items-center justify-center text-white shadow-md shrink-0 mt-0.5">
                    <Award size={26} />
                  </div>

                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#1BA9A2]/20 text-[#1BA9A2] text-[10px] font-bold uppercase tracking-wider">
                        {cert.category}
                      </span>
                      {cert.grade && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 text-[10px] font-bold uppercase">
                          {cert.grade}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                      {cert.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-400 pt-1">
                      <span>Délivré le : <strong>{cert.date}</strong></span>
                      <span>•</span>
                      <span>Volume : <strong>{cert.hours} heures</strong></span>
                      <span>•</span>
                      <span className="font-mono text-gray-300">Réf : {cert.code}</span>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto pt-2 lg:pt-0 border-t lg:border-t-0 border-white/5">
                  <button
                    onClick={() => onViewCertificate(cert)}
                    className="flex-1 lg:flex-none px-4 py-2.5 bg-gradient-to-r from-[#F26A21] to-[#D95A15] hover:from-[#D95A15] hover:to-[#F26A21] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <ExternalLink size={14} />
                    Voir Diplôme
                  </button>

                  <button
                    onClick={() => handleDownload(cert)}
                    className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Télécharger le fichier PDF"
                  >
                    <Download size={14} />
                    <span className="hidden sm:inline">PDF</span>
                  </button>

                  <button
                    onClick={() => handleShare(cert)}
                    className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-[#1BA9A2] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copier le lien de partage certifié"
                  >
                    <Share2 size={14} />
                    <span className="hidden sm:inline">Partager</span>
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Guarantee Footer */}
          <div className="p-4 rounded-2xl bg-[#1BA9A2]/15 border border-[#1BA9A2]/30 flex items-center gap-3 text-xs text-gray-300">
            <ShieldCheck size={22} className="text-[#1BA9A2] shrink-0" />
            <div>
              <p className="font-bold text-white text-xs">Vérification Publique & Archivage Électronique</p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Chaque titre délivré à {userName} est infalsifiable et consultable par les employeurs 24h/24 via le portail officiel de vérification des compétences Amanitech Academy RDC.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: In-Progress Certificates */}
      {activeTab === 'in_progress' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {inProgressCertificates.map(item => (
            <div 
              key={item.id}
              className="bg-[#1B2224] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-[#1BA9A2] uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">{item.title}</h3>
                </div>
                <span className="text-xs font-black text-[#F26A21]">{item.progress}% complété</span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#12181A] h-2.5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="bg-gradient-to-r from-[#1BA9A2] to-[#F26A21] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${item.progress}%` }} 
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400 pt-1">
                <span>{item.nextModule}</span>
                <span className="text-gray-300 font-medium">{item.completedHours}h sur {item.totalHours}h validées</span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default CertificatesScreen;
