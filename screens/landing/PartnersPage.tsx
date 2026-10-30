import React from 'react';
import { ArrowLeft, Handshake, Building2, Landmark, GraduationCap, Video, BarChart, Globe, Zap, ArrowRight } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const PartnersPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
  return (
    <div className="min-h-screen bg-[#F7F9FA] text-[#12181A] font-sans animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="sticky top-0 left-0 right-0 z-50 p-4 md:p-6 flex items-center justify-between bg-white/90 backdrop-blur-md border-b border-gray-200">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#1BA9A2]/10 hover:bg-[#1BA9A2]/20 rounded-full text-[#1BA9A2] font-bold text-xs uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          <span>Retour</span>
        </button>
        <span className="text-xs font-bold text-[#F26A21] uppercase tracking-widest">Partenaires • Amanitech Academy</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 text-center bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1BA9A2]/10 rounded-full text-[#1BA9A2] text-xs font-black uppercase tracking-widest">
            <Handshake size={14} />
            <span>Alliances Stratégiques & Écosystème RDC</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight tracking-tight text-[#12181A]">
            Des Partenariats qui Transforment l'Éducation en <br />
            <span className="text-[#1BA9A2]">Levier de Progrès Économique</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            <strong>Amanitech Academy</strong> et <strong>Amanitech</strong> collaborent étroitement avec les entreprises, institutions académiques, ONG et agences gouvernementales en République Démocratique du Congo pour bâtir des programmes de formation certifiants à fort retour sur investissement.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => { window.scrollTo(0, 0); onViewChange('contact'); }}
              className="px-8 py-4 bg-[#F26A21] hover:bg-[#D95A15] text-white font-black uppercase tracking-widest text-xs rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Devenir Partenaire Officiel</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Model Grid */}
      <section className="py-20 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#1BA9A2]/10 text-[#1BA9A2] flex items-center justify-center">
              <Building2 size={26} />
            </div>
            <h3 className="font-bold text-lg text-[#12181A]">Entreprises & Groupes Privés</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Mise en place d'académies de compétences, upskilling des équipes managériales, parcours d'onboarding personnalisés et mesure des gains de productivité.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center">
              <Landmark size={26} />
            </div>
            <h3 className="font-bold text-lg text-[#12181A]">Secteur Public & Bailleurs</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Déploiement de programmes nationaux d'employabilité des jeunes, d'inclusion numérique et de reconversion professionnelle à grande échelle en RDC.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-gray-200 space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#1BA9A2]/10 text-[#1BA9A2] flex items-center justify-center">
              <GraduationCap size={26} />
            </div>
            <h3 className="font-bold text-lg text-[#12181A]">Universités & Centres Techniques</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Numérisation des cursus académiques, co-diplomations certifiantes et ouverture aux formats streaming pour toucher les étudiants à travers tout le pays.
            </p>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default PartnersPage;
