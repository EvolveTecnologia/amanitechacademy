import React from 'react';
import { Category } from '../types';
import { COURSES } from '../constants';
import CourseCard from '../components/CourseCard';
import { ChevronLeft } from 'lucide-react';

interface CategoryViewProps {
  category: Category;
  onBack: () => void;
  onCourseClick: (id: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ category, onBack, onCourseClick }) => {
  const filteredCourses = COURSES.filter(c => {
    if (category === Category.Educacao) {
      return [Category.Educacao, Category.ENEM, Category.EJA].includes(c.category);
    }
    if (category === Category.Sustentabilidade) {
      return c.category === Category.Sustentabilidade || c.title.toLowerCase().includes('resíduos');
    }
    return c.category === category;
  });

  return (
    <div className="min-h-screen bg-[#12181A] text-white animate-in slide-in-from-right duration-300 pb-24">
      {/* Header */}
      <div className="fixed top-0 left-0 md:left-24 right-0 z-50 p-6 flex items-center bg-gradient-to-b from-[#12181A]/95 to-transparent backdrop-blur-md border-b border-white/5">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 px-4 py-2 bg-[#1BA9A2]/20 hover:bg-[#1BA9A2]/30 rounded-full text-[#1BA9A2] transition-all group border border-[#1BA9A2]/30 cursor-pointer"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider hidden md:block">Retour</span>
        </button>
        <h1 className="ml-4 md:ml-6 text-lg md:text-2xl font-black uppercase tracking-tight text-white drop-shadow-md">
          {category}
        </h1>
      </div>

      {/* Grid Container */}
      <div className="pt-28 px-4 md:px-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredCourses.map(course => (
          <div key={course.id} className="flex justify-center w-full">
            <CourseCard course={course} onClick={onCourseClick} />
          </div>
        ))}
        {filteredCourses.length === 0 && (
          <div className="col-span-full py-24 text-center max-w-md mx-auto">
            <div className="p-8 rounded-3xl bg-[#1B2224] border border-[#1BA9A2]/30 space-y-4 shadow-xl">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Prochainement Dispo</h3>
              <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                Estamos produzindo e em breve vamos estar disponibilizando mais cursos nesta categoria!
              </p>
              <button 
                onClick={onBack}
                className="px-6 py-2.5 bg-[#1BA9A2] hover:bg-[#148F89] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
              >
                Retour
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryView;
