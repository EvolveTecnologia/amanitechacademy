import React from 'react';
import { ArrowLeft, Target, Globe, Award, TrendingUp, Users, Leaf, ShieldCheck, Cpu, Building2, MapPin } from 'lucide-react';
import LandingFooter from '../../components/LandingFooter';

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

interface PageProps {
  onBack: () => void;
  onViewChange: (v: LandingView) => void;
}

const AboutPage: React.FC<PageProps> = ({ onBack, onViewChange }) => {
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
        <span className="text-xs font-bold text-[#F26A21] uppercase tracking-widest">À Propos • Amanitech</span>
      </div>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-12 overflow-hidden bg-gradient-to-b from-white to-[#F7F9FA] border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1BA9A2]/10 border border-[#1BA9A2]/20 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#F26A21] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#0E6B66]">AMANITECH – Technology and Sustainability</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase leading-tight tracking-tight text-[#1E1E1E]">
            Formando o Capital Humano da <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1BA9A2] via-[#0E6B66] to-[#F26A21]">
              Transformação Digital e Climática da África
            </span>
          </h1>
          
          <p className="text-xs sm:text-sm md:text-base text-gray-700 max-w-3xl mx-auto leading-relaxed font-normal">
            A <strong>Amanitech Academy</strong> é a plataforma educacional da AMANITECH – Technology and Sustainability dedicada a formar o capital humano que conduzirá a transformação digital e climática da República Democrática do Congo e do continente africano.
          </p>
        </div>
      </section>

      {/* Qui Sommes-Nous */}
      <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-black text-[#F26A21] uppercase tracking-widest">
              <span>Instrumento Estratégico de Soberania</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1E1E1E] leading-tight">
              Adaptive Learning e Adaptive Streaming a serviço do futuro africano.
            </h2>
            <div className="space-y-3.5 text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
              <p>
                Combinando <strong>adaptive learning</strong> — que personaliza trilhas de conhecimento conforme o ritmo, o perfil e os objetivos de cada aluno — e <strong>adaptive streaming</strong> — que garante acesso contínuo às videoaulas mesmo em regiões com conectividade limitada —, a Academy oferece cursos profissionalizantes de alto nível em tecnologia, inovação, sustentabilidade e mercados climáticos.
              </p>
              <p>
                Nossos programas são desenhados para <strong>profissionais, estudantes, gestores públicos, líderes comunitários, empreendedores e investidores</strong>.
              </p>
              <p>
                Mais do que uma escola online, a Amanitech Academy é um instrumento estratégico de soberania: ao democratizar o acesso ao conhecimento sobre economia verde, finanças climáticas e transformação digital, capacitamos a próxima geração africana para que o continente deixe de ser apenas guardião dos maiores sumidouros de carbono do planeta e passe a ser protagonista na criação, certificação e comercialização dos ativos ambientais que definirão a economia das próximas décadas.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-3 text-xs font-semibold text-gray-600 bg-white p-4 rounded-xl border border-gray-200">
              <MapPin size={18} className="text-[#F26A21] shrink-0" />
              <span>Immeuble Swiss Mart, Boulevard du 30 Juin (Arrêt Sabena), Kinshasa, RDC</span>
            </div>
          </div>

          {/* Cards Mission & Vision */}
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:border-[#1BA9A2] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1BA9A2]/10 text-[#1BA9A2] flex items-center justify-center mb-4">
                <Target size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#12181A] mb-2">Notre Mission</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accélérer l'émancipation économique et professionnelle par une éducation technologique de pointe, accessible partout, adaptée au marché de l'emploi congolais et africain.
              </p>
            </div>

            <div className="bg-white border border-gray-200 p-8 rounded-3xl shadow-sm hover:border-[#F26A21] transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F26A21]/10 text-[#F26A21] flex items-center justify-center mb-4">
                <Globe size={26} />
              </div>
              <h3 className="text-xl font-bold text-[#12181A] mb-2">Notre Vision</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Être le pôle de référence panafricain pour le streaming éducatif, l'innovation managériale et la transmission des savoirs stratégiques d'ici 2030.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Piliers Fondamentaux */}
      <section className="py-16 px-6 md:px-16 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#12181A] mb-4">Nos Piliers Stratégiques</h2>
            <p className="text-sm text-gray-600">Des fondations solides au service de l'impact collectif</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-gray-200 space-y-3">
              <Cpu className="text-[#1BA9A2]" size={28} />
              <h4 className="font-bold text-base text-[#12181A]">Technologie & Data</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Streaming ultra-rapide optimisé pour tous les débits de connexion et apprentissage adaptatif.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-gray-200 space-y-3">
              <Award className="text-[#F26A21]" size={28} />
              <h4 className="font-bold text-base text-[#12181A]">Excellence Pédagogique</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Cours dirigés par des experts reconnus du secteur privé, universitaire et institutionnel.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-gray-200 space-y-3">
              <Leaf className="text-emerald-600" size={28} />
              <h4 className="font-bold text-base text-[#12181A]">Durabilité & ESG</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Intégration systématique des enjeux environnementaux, de la gouvernance et de la responsabilité sociétale.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F7F9FA] border border-gray-200 space-y-3">
              <Users className="text-[#0E6B66]" size={28} />
              <h4 className="font-bold text-base text-[#12181A]">Impact Mesurable</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Suivi analytique précis des compétences acquises, des certifications et de l'insertion sur le marché.</p>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter onViewChange={onViewChange} />
    </div>
  );
};

export default AboutPage;
