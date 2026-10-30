import React, { useState, useEffect, useRef } from 'react';
import { Monitor, Smartphone, Tablet, Tv, ChevronDown, GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe, Award, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { COURSES, FLAGSHIP_AI_COURSE, FLAGSHIP_CARBON_COURSE } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import LandingFooter from '../components/LandingFooter';
import { Logo } from '../components/Logo';
import { LanguageSelector } from '../components/LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

// Importing Sub-pages
import CategoriesPage from './landing/CategoriesPage';
import TechnologyPage from './landing/TechnologyPage';
import ImpactPage from './landing/ImpactPage';
import AboutPage from './landing/AboutPage';
import PartnersPage from './landing/PartnersPage';
import ContactPage from './landing/ContactPage';
import HelpCenterPage from './landing/HelpCenterPage';
import TermsPage from './landing/TermsPage';
import PrivacyPage from './landing/PrivacyPage';

interface LandingPageProps {
  onEnter: () => void;
  onSelectCourse?: (id: string) => void;
}

type LandingView = 'home' | 'categories' | 'technology' | 'impact' | 'about' | 'partners' | 'contact' | 'help' | 'terms' | 'privacy';

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onSelectCourse }) => {
  const { t, language } = useLanguage();
  const [currentView, setCurrentView] = useState<LandingView>('home');
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const sliderIntervalRef = useRef<number | null>(null);

  // Scroll to top whenever currentView changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [currentView]);

  // --- SLIDES DATA (Hero Section) ---
  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920&auto=format&fit=crop',
      title: t.heroTitle1 || 'TRANSFORMATION DIGITALE & CLIMATIQUE DE L\'AFRIQUE',
      subtitle: t.heroSubtitle1 || 'Souveraineté & Avenir',
      description: t.heroDesc1 || 'L\'Amanitech Academy est la plateforme éducative de l\'AMANITECH – Technology and Sustainability, dédiée à former le capital humain qui conduira la transformation digitale et climatique de la RDC et du continent africain.',
      category: t.heroBadge1 || 'Amanitech Academy • Exclusif'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop',
      title: t.heroTitle2 || 'ADAPTIVE LEARNING & ADAPTIVE STREAMING',
      subtitle: t.heroSubtitle2 || 'Innovation Pédagogique',
      description: t.heroDesc2 || 'Nous combinons des parcours personnalisés selon votre profil et votre rythme avec la technologie d\'adaptive streaming garantissant un accès ininterrompu aux cours même en zones à connectivité réduite.',
      category: 'Technologie Éducative'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1920&auto=format&fit=crop',
      title: t.heroTitle3 || 'ÉCONOMIE VERTE & SOUVERAINETÉ ÉCOLOGIQUE',
      subtitle: t.heroSubtitle3 || 'Bassin du Congo',
      description: t.heroDesc3 || 'Formation certifiante aux marchés du carbone, aux normes ESG, au leadership vert et aux technologies émergentes pour faire de la RDC le leader mondial du climat.',
      category: 'Souveraineté Écologique'
    }
  ];

  // --- CATEGORIES DATA (6 Items) ---
  const brandCategories = [
    { id: Category.Tecnologia, label: t.catTech || 'Technologie & IA', icon: Cpu, grad: 'from-[#1BA9A2] to-[#0E6B66]' },
    { id: Category.Sustentabilidade, label: t.catSust || 'Climat & Développement Durable', icon: Leaf, grad: 'from-emerald-800 to-[#1BA9A2]' },
    { id: Category.Gestao, label: t.catGest || 'Gestion & Marchés', icon: Briefcase, grad: 'from-[#12181A] to-[#1BA9A2]' },
    { id: Category.Educacao, label: t.catEdu || 'Éducation Professionnelle', icon: GraduationCap, grad: 'from-[#0E6B66] to-[#148F89]' },
    { id: Category.Idiomas, label: t.catLang || 'Langues & Affaires', icon: Globe, grad: 'from-[#1B2224] to-[#148F89]' },
    { id: Category.Alimentos, label: t.catBio || 'Bioéconomie & Production', icon: Utensils, grad: 'from-amber-800 to-[#F26A21]' },
  ];

  // --- SCROLL EFFECT ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- SLIDER LOGIC ---
  const startSlider = () => {
    if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    sliderIntervalRef.current = window.setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
  };

  useEffect(() => {
    if (currentView === 'home') {
      startSlider();
    }
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, [currentView]);

  const handleManualSlide = (index: number) => {
    setCurrentSlide(index);
    startSlider(); 
  };

  // --- ROUTING LOGIC ---
  if (currentView === 'categories') return <CategoriesPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'technology') return <TechnologyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'impact') return <ImpactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'about') return <AboutPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'partners') return <PartnersPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'contact') return <ContactPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'help') return <HelpCenterPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'terms') return <TermsPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;
  if (currentView === 'privacy') return <PrivacyPage onBack={() => setCurrentView('home')} onViewChange={setCurrentView} />;

  // --- CONTENT FILTERING ---
  const techCourses = COURSES.filter(c => c.category === Category.Tecnologia).slice(0, 4);
  const sustainCourses = COURSES.filter(c => c.category === Category.Sustentabilidade).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#12181A] font-sans text-white overflow-x-hidden animate-in fade-in duration-500">
      
      {/* --- NAVBAR (Sticky) --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-12 py-3.5 flex justify-between items-center ${scrolled ? 'bg-[#12181A]/95 backdrop-blur-md shadow-xl border-b border-[#1BA9A2]/20' : 'bg-gradient-to-b from-[#12181A]/95 to-transparent'}`}>
        <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo inverted={true} size="md" className="h-9 sm:h-10 md:h-11" />
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button 
            onClick={() => setCurrentView('about')}
            className="hidden md:block px-4 py-2 text-xs font-bold text-gray-300 hover:text-[#1BA9A2] uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.navAboutAcademy || 'À PROPOS DE L\'ACADEMY'}
          </button>
          
          {/* Globe Icon Language Selector */}
          <LanguageSelector variant="navbar" />

          <button 
            onClick={onEnter}
            className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#1BA9A2] hover:bg-[#148F89] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer border border-[#1BA9A2]/40"
          >
            {t.navStartNow || 'COMMENCER MAINTENANT'}
          </button>
        </div>
      </nav>

      {/* --- HERO SECTION (Institutional & Sovereign) --- */}
      <section className="relative min-h-[85vh] w-full overflow-hidden group flex items-center">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover animate-ken-burns" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#12181A] via-[#12181A]/85 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#12181A] via-transparent to-transparent" />
            
            <div className="absolute top-0 left-0 h-full flex flex-col justify-center px-5 sm:px-8 md:px-14 max-w-3xl pt-20 md:pt-14">
              <div className="inline-flex items-center gap-2 mb-3 animate-in slide-in-from-left-4 fade-in duration-700 delay-100">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F26A21] animate-pulse" />
                <span className="text-[#1BA9A2] font-black tracking-widest uppercase text-[10px] md:text-xs">
                  {slide.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight mb-4 drop-shadow-xl animate-in slide-in-from-left-4 fade-in duration-700 delay-200 tracking-tight">
                {slide.title}
              </h1>
              <p className="text-gray-200 text-xs md:text-sm lg:text-base mb-8 leading-relaxed animate-in slide-in-from-left-4 fade-in duration-700 delay-300 max-w-2xl font-normal">
                {slide.description}
              </p>
              
              {/* CTAs: Teal Primário ("COMMENCER MAINTENANT") + Laranja Outline ("EXPLORER LES COURS") */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3.5 animate-in slide-in-from-bottom-4 fade-in duration-700 delay-500">
                <button 
                  onClick={onEnter}
                  className="bg-[#1BA9A2] hover:bg-[#148F89] text-white px-6 sm:px-8 py-3.5 rounded-xl font-black uppercase tracking-wider text-xs transition-all transform hover:scale-[1.03] active:scale-95 shadow-lg shadow-[#1BA9A2]/30 cursor-pointer w-full sm:w-auto text-center border border-[#1BA9A2]/50 flex items-center justify-center gap-2"
                >
                  <span className="play-motif" />
                  <span>{t.navStartNow || 'COMMENCER MAINTENANT'}</span>
                </button>
                <button 
                  onClick={onEnter}
                  className="bg-transparent hover:bg-[#F26A21]/15 text-[#F26A21] hover:text-white border-2 border-[#F26A21] px-5 sm:px-7 py-3 rounded-xl font-extrabold uppercase tracking-wider text-xs transition-all cursor-pointer w-full sm:w-auto text-center shadow-md"
                >
                  {language === 'pt-br' ? 'Explorar cursos' : language === 'en-us' ? 'Explore courses' : 'Explorer les formations'}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Indicators */}
        <div className="absolute bottom-20 right-6 md:right-16 z-20 flex gap-3">
          {slides.map((_, i) => (
            <button 
              key={i}
              onClick={() => handleManualSlide(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-[#F26A21]' : 'w-4 bg-gray-600 hover:bg-gray-400'}`}
            />
          ))}
        </div>
      </section>

      {/* --- BRAND CATEGORY HUBS --- */}
      <section className="px-5 sm:px-8 md:px-14 -mt-10 md:-mt-12 relative z-20 mb-14 md:mb-20">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {brandCategories.map((hub, idx) => {
            const Icon = hub.icon;
            return (
              <div 
                key={idx} 
                onClick={() => onEnter()} 
                className={`h-22 sm:h-26 md:h-28 rounded-2xl bg-gradient-to-br ${hub.grad} border border-white/15 flex flex-col items-center justify-center gap-2 shadow-lg hover:scale-[1.03] transition-transform cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <Icon size={24} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                <span className="font-bold text-[11px] sm:text-xs tracking-wide uppercase text-center px-2 leading-tight">{hub.label}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- EDUCATIONAL PILLARS: ADAPTIVE LEARNING & STREAMING --- */}
      <section className="py-16 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-[0.25em] text-[#1BA9A2] block mb-2">
            Arquitetura Educacional de Ponta
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight">
            Por que a Amanitech Academy é única?
          </h2>
          <p className="text-gray-300 text-sm mt-3 leading-relaxed">
            Mais do que uma escola online, uma ferramenta estratégica de capacitação soberana desenhada para os desafios reais da África.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1B2224] border border-[#1BA9A2]/30 rounded-2xl p-6 space-y-4 hover:border-[#1BA9A2] transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 flex items-center justify-center text-[#1BA9A2]">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Adaptive Learning</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Trilhas dinâmicas recomendadas por perfil e objetivo. Diagnóstico inicial e ajuste inteligente da sequência pedagógica conforme seu progresso individual.
            </p>
          </div>

          <div className="bg-[#1B2224] border border-[#F26A21]/30 rounded-2xl p-6 space-y-4 hover:border-[#F26A21] transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-[#F26A21]/20 border border-[#F26A21]/40 flex items-center justify-center text-[#F26A21]">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Adaptive Streaming</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Qualidade de reprodução auto-ajustável conforme a conexão, modo economia de dados, downloads para estudo offline e fallback áudio-only para regiões remotas.
            </p>
          </div>

          <div className="bg-[#1B2224] border border-white/20 rounded-2xl p-6 space-y-4 hover:border-[#1BA9A2] transition-colors shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-black uppercase text-white">Mercados Climáticos &amp; ESG</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Formação em economia verde, mercado de créditos de carbono, finanças sustentáveis e soberania ecológica da Bacia do Congo e do continente africano.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT PREVIEWS --- */}
      <div className="space-y-16 pb-20">
        <section className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span className="play-motif" />
                {t.techInnovation || 'Technologie et Innovation'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">{t.techInnovationSubtitle || 'Compétences digitales de pointe pour les nouveaux défis africains'}</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#1BA9A2] hover:text-white uppercase tracking-wider cursor-pointer">
              {t.viewAll || 'Voir tout →'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 max-w-xl mx-auto md:mx-0">
            <div 
              onClick={() => onSelectCourse ? onSelectCourse(FLAGSHIP_AI_COURSE.id) : onEnter()} 
              className="cursor-pointer transform hover:scale-[1.02] transition-all w-full"
            >
              <CourseCard course={FLAGSHIP_AI_COURSE} onClick={(id) => onSelectCourse ? onSelectCourse(id) : onEnter()} />
            </div>
          </div>
        </section>

        <section className="px-6 md:px-16 max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-6 border-b border-white/10 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <span className="play-motif-orange" />
                {t.sustainabilityClimate || 'Sustentabilité, Climat et Économie Verde'}
              </h2>
              <p className="text-xs text-gray-400 mt-1">{t.sustainabilityClimateSubtitle || 'Crédits carbone, ESG et leadership environnemental dans le Bassin du Congo'}</p>
            </div>
            <button onClick={onEnter} className="text-xs font-bold text-[#F26A21] hover:text-white uppercase tracking-wider cursor-pointer">
              {t.viewAll || 'Voir tout →'}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 max-w-xl mx-auto md:mx-0">
            <div 
              onClick={() => onSelectCourse ? onSelectCourse(FLAGSHIP_CARBON_COURSE.id) : onEnter()} 
              className="cursor-pointer transform hover:scale-[1.02] transition-all w-full"
            >
              <CourseCard course={FLAGSHIP_CARBON_COURSE} onClick={(id) => onSelectCourse ? onSelectCourse(id) : onEnter()} />
            </div>
          </div>
        </section>
      </div>

      {/* --- DEVICES SECTION --- */}
      <section className="py-24 px-6 md:px-16 bg-gradient-to-b from-[#12181A] to-[#0E6B66]/25 border-y border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1BA9A2]/20 border border-[#1BA9A2]/30 rounded-full text-xs font-bold text-[#1BA9A2] uppercase tracking-wider">
              <span>{t.devicesSubtitle || 'Adaptive Streaming Multi-Dispositif'}</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black leading-tight">{t.devicesTitle || 'Aprenda onde e quando quiser.'}</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {t.devicesDesc || 'Sur smartphone, tablette, ordinateur portable ou Smart TV. L\'Amanitech Academy ajuste automatiquement la qualité vidéo et synchronise votre progression.'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6">
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Tv size={32} className="text-[#1BA9A2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Smart TV</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Monitor size={32} className="text-[#1BA9A2]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Computador</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Tablet size={32} className="text-[#F26A21]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Tablet</span>
              </div>
              <div className="flex flex-col items-center gap-3 text-gray-300">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Smartphone size={32} className="text-[#F26A21]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider">Smartphone</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <img 
              src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop" 
              alt="Multi-écrans Amanitech Academy" 
              className="rounded-3xl shadow-2xl border border-white/15 relative z-10 w-full" 
            />
            <div className="absolute inset-0 bg-[#1BA9A2]/20 blur-[100px] z-0" />
          </div>
        </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 px-6 md:px-16 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">Perguntas Frequentes</h2>
        <div className="space-y-4">
          {[
            { 
              q: 'O que é a Amanitech Academy ?', 
              a: 'A Amanitech Academy é a plataforma educacional da AMANITECH – Technology and Sustainability dedicada a formar o capital humano que conduzirá a transformação digital e climática da República Democrática do Congo e do continente africano, combinando adaptive learning e adaptive streaming.' 
            },
            { 
              q: 'O que são o Adaptive Learning e o Adaptive Streaming ?', 
              a: 'O Adaptive Learning personaliza sua trilha de conhecimento conforme seu ritmo, objetivos e diagnóstico de perfil. O Adaptive Streaming ajusta a qualidade dos vídeos e viabiliza downloads offline para que você estude sem interrupções mesmo em regiões com conectividade limitada.' 
            },
            { 
              q: 'Os cursos emitem certificados oficiais ?', 
              a: 'Sim. Cada formação concluída emite um certificado digital com hash e autenticação criptográfica válida perante empresas e parceiros institucionais nacionais e internacionais.' 
            },
            { 
              q: 'Quais públicos são atendidos pela plataforma ?', 
              a: 'A plataforma é desenhada para profissionais, estudantes, gestores públicos, líderes comunitários, empreendedores e investidores com filtros dedicados por perfil e setor de atuação.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="border-b border-white/10 pb-4">
              <button 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 flex justify-between items-center text-left hover:text-[#1BA9A2] transition-colors cursor-pointer"
              >
                <span className="text-base md:text-lg font-bold">{item.q}</span>
                <ChevronDown className={`text-[#F26A21] transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LandingFooter onViewChange={setCurrentView} />

      <style>{`
        .animate-ken-burns {
          animation: kenBurns 20s infinite alternate;
        }
        @keyframes kenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
