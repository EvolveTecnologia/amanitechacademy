import React, { useState, useEffect, useRef } from 'react';
import { COURSES, FLAGSHIP_AI_COURSE, FLAGSHIP_CARBON_COURSE } from '../constants';
import { Category } from '../types';
import CourseCard from '../components/CourseCard';
import { GraduationCap, Leaf, Cpu, Utensils, Briefcase, Globe, Check, Plus, Play, Info, Sparkles, X } from 'lucide-react';
import { Logo } from '../components/Logo';

interface HomeScreenProps {
  onCourseClick: (id: string) => void;
  onCategoryClick: (category: Category) => void;
  myListIds?: string[];
  onToggleMyList?: (id: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onCourseClick, onCategoryClick, myListIds = [], onToggleMyList }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [upcomingCategoryModal, setUpcomingCategoryModal] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);

  // ONLY 2 HERO BANNERS
  const slides = [
    {
      id: FLAGSHIP_AI_COURSE.id,
      title: FLAGSHIP_AI_COURSE.title,
      subtitle: FLAGSHIP_AI_COURSE.tagline || 'Tecnologia & Inovação',
      description: FLAGSHIP_AI_COURSE.description,
      image: FLAGSHIP_AI_COURSE.heroImage,
      category: 'Tecnologia e Inovação'
    },
    {
      id: FLAGSHIP_CARBON_COURSE.id,
      title: FLAGSHIP_CARBON_COURSE.title,
      subtitle: FLAGSHIP_CARBON_COURSE.tagline || 'Economia Verde & Clima',
      description: FLAGSHIP_CARBON_COURSE.description,
      image: FLAGSHIP_CARBON_COURSE.heroImage,
      category: 'Sustentabilidade, Clima e Economia Verde'
    }
  ];

  const categories = [
    { id: Category.Tecnologia, label: 'Tecnologia e Inovação', icon: Cpu, color: 'from-[#1BA9A2]/90 to-[#0E6B66]' },
    { id: Category.Sustentabilidade, label: 'Sustentabilidade, Clima e Economia Verde', icon: Leaf, color: 'from-[#0E6B66] to-[#1BA9A2]' },
    { id: Category.Gestao, label: 'Gestão & Negócios', icon: Briefcase, color: 'from-[#1B2224] to-[#1BA9A2]/80' },
    { id: Category.Educacao, label: 'Educação Profissional', icon: GraduationCap, color: 'from-[#1BA9A2]/80 to-[#148F89]' },
    { id: Category.Idiomas, label: 'Idiomas', icon: Globe, color: 'from-[#1B2224] to-[#12181A]' },
    { id: Category.Alimentos, label: 'Bioeconomia & Produção', icon: Utensils, color: 'from-[#F26A21]/90 to-[#D95A15]' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      }
    }
    touchStartX.current = null;
  };

  const handleCategorySelect = (category: Category) => {
    const courses = COURSES.filter(c => c.category === category);
    if (courses.length > 0) {
      onCategoryClick(category);
    } else {
      setUpcomingCategoryModal(category);
    }
  };

  const CONTENT_PADDING = "px-4 sm:px-6 md:px-10";

  const SectionRow = ({ title, category }: { title: string, category: Category }) => {
    const courses = COURSES.filter(c => c.category === category);
    if (courses.length === 0) return null;

    return (
      <section className="group/section animate-in fade-in slide-in-from-bottom-4 duration-700 mb-6">
        <div className={`flex items-center justify-between mb-3 ${CONTENT_PADDING}`}>
          <h2 className="text-xs sm:text-sm md:text-base font-bold text-gray-200 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26A21]" />
            {title}
          </h2>
          <button 
            onClick={() => handleCategorySelect(category)}
            className="text-[11px] font-bold text-[#1BA9A2] hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
          >
            Ver catálogo →
          </button>
        </div>
        <div className="relative">
          <div className={`flex gap-3 md:gap-4 overflow-x-auto hide-scrollbar py-2 ${CONTENT_PADDING} scroll-smooth items-start`}>
            {courses.map(course => (
              <div key={course.id} className="w-48 sm:w-56 md:w-64 flex-shrink-0">
                <CourseCard course={course} onClick={onCourseClick} />
              </div>
            ))}
            <div className="w-4 flex-shrink-0" />
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="pb-24 bg-[#12181A] min-h-screen font-sans relative text-white">
      
      {/* Mobile Logo Header */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 py-3 flex justify-start items-center md:hidden bg-gradient-to-b from-[#12181A] via-[#12181A]/95 to-transparent pointer-events-none">
        <div className="pointer-events-auto">
          <Logo inverted={true} size="sm" className="h-8 w-auto drop-shadow-md" />
        </div>
      </div>

      {/* Hero Banner Area (ONLY 2 BANNERS) */}
      <div 
        className="relative w-full h-[55vh] sm:h-[65vh] md:h-[72vh] overflow-hidden group mb-6"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => {
          const isInList = myListIds.includes(slide.id);

          return (
            <div
              key={`${slide.id}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img 
                  src={slide.image} 
                  className="w-full h-full object-cover select-none animate-ken-burns cursor-pointer"
                  alt={slide.title}
                  draggable={false}
                  onClick={() => onCourseClick(slide.id)}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#12181A] via-[#12181A]/85 to-transparent w-[95%] md:w-3/4 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12181A] via-transparent to-transparent pointer-events-none" />
              </div>
              
              {/* Text Content */}
              <div className={`absolute bottom-12 md:top-0 md:bottom-0 left-0 w-full md:w-[60%] flex flex-col justify-end md:justify-center z-20 ${CONTENT_PADDING}`}>
                <div className="animate-in slide-in-from-left-10 fade-in duration-700 delay-100 space-y-3">
                  
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-[#1BA9A2] text-white rounded-md text-[10px] font-black uppercase tracking-wider">
                      Cursos Em Destaque
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-[#1BA9A2] uppercase tracking-widest pl-1">
                      {slide.category}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight leading-tight drop-shadow-xl max-w-xl">
                    {slide.title}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-gray-200 font-medium max-w-lg leading-relaxed line-clamp-2 md:line-clamp-3">
                    {slide.subtitle} — {slide.description}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-2">
                    <button 
                      onClick={() => onCourseClick(slide.id)}
                      className="flex items-center gap-2 bg-[#1BA9A2] hover:bg-[#148F89] text-white px-5 sm:px-7 py-3 rounded-xl font-bold transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 shadow-md shadow-[#1BA9A2]/30 cursor-pointer border border-[#1BA9A2]/40"
                    >
                      <Play size={16} className="fill-white" /> Assistir Aula
                    </button>
                    <button 
                      onClick={() => onToggleMyList && onToggleMyList(slide.id)}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 sm:px-5 py-3 rounded-xl font-bold transition-all uppercase tracking-wider text-xs md:text-sm hover:scale-[1.03] active:scale-95 cursor-pointer"
                    >
                      {isInList ? <Check size={16} /> : <Plus size={16} />}
                      {isInList ? 'Na minha lista' : 'Minha Lista'}
                    </button>
                  </div>

                </div>
              </div>
            </div>
          );
        })}

        {/* Indicators */}
        <div className={`absolute bottom-4 right-0 z-20 flex gap-2 ${CONTENT_PADDING}`}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-[#F26A21]' : 'w-2.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Category Filter Hubs (Paleta Ajustada) */}
      <section className={`mb-8 ${CONTENT_PADDING}`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs sm:text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles size={16} className="text-[#1BA9A2]" />
            Explore por Área Estratégica
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`p-3.5 rounded-2xl bg-gradient-to-br ${cat.color} border border-white/15 flex items-center gap-3 hover:scale-[1.03] transition-all cursor-pointer text-left shadow-lg group`}
              >
                <div className="p-2 rounded-xl bg-black/30 text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Icon size={18} />
                </div>
                <span className="text-[11px] sm:text-xs font-extrabold text-white tracking-wide truncate">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Dynamic Content Rows - Initial Launch with 2 Flagship Courses */}
      <div className="space-y-6">
        <SectionRow title="Tecnologia e Inovação" category={Category.Tecnologia} />
        <SectionRow title="Sustentabilidade, Clima e Economia Verde" category={Category.Sustentabilidade} />
      </div>

      {/* Modal / Notification for Upcoming Categories */}
      {upcomingCategoryModal && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="bg-[#1B2224] border border-[#1BA9A2]/40 rounded-3xl p-6 sm:p-8 w-full max-w-md text-center space-y-5 relative shadow-2xl">
            <button 
              onClick={() => setUpcomingCategoryModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X size={18} />
            </button>
            <div className="w-14 h-14 bg-[#1BA9A2]/20 border border-[#1BA9A2]/40 text-[#1BA9A2] rounded-2xl flex items-center justify-center mx-auto">
              <Info size={28} />
            </div>
            <h3 className="text-base font-black text-white uppercase tracking-tight">
              {upcomingCategoryModal}
            </h3>
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
              Estamos produzindo e em breve vamos estar disponibilizando mais cursos nesta categoria!
            </p>
            <button 
              onClick={() => setUpcomingCategoryModal(null)}
              className="w-full py-3.5 bg-[#1BA9A2] hover:bg-[#148F89] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer border border-[#1BA9A2]/40"
            >
              Entendido
            </button>
          </div>
        </div>
      )}

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

export default HomeScreen;
