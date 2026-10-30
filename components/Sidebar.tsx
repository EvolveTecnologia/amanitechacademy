import React, { useState } from 'react';
import { Home, Compass, Layout, Download, User, LogOut } from 'lucide-react';
import { Logo } from './Logo';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);

  const tabs = [
    { id: 'home', label: 'Painel do Aluno', icon: Home },
    { id: 'search', label: 'Catálogo de Cursos', icon: Compass },
    { id: 'trail', label: 'Sua Trilha (Adaptive)', icon: Layout },
    { id: 'downloads', label: 'Aulas Salvas / Offline', icon: Download },
    { id: 'profile', label: 'Minha Conta & Diplomas', icon: User },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-full z-[100] flex flex-col transition-all duration-300 ease-in-out group outline-none ${
        isHovered 
          ? 'w-[300px] bg-gradient-to-r from-[#12181A] via-[#12181A]/95 to-[#12181A]/85 backdrop-blur-md border-r border-[#1BA9A2]/25 shadow-2xl' 
          : 'w-[100px] bg-[#12181A] border-r border-[#1BA9A2]/20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsHovered(false);
        }
      }}
      tabIndex={0}
    >
      {/* Logo Area */}
      <div className={`h-28 flex items-center ${isHovered ? 'justify-start px-6' : 'justify-center'} transition-all duration-300`}>
        {isHovered ? (
          <Logo inverted={true} size="md" className="h-10" />
        ) : (
          <div className="w-12 h-12 rounded-2xl bg-[#1B2224] hover:bg-[#1B2224]/80 border border-[#1BA9A2]/30 flex items-center justify-center transition-all p-2 shadow-lg group-hover:scale-105">
            <Logo variant="icon-only" className="w-full h-full drop-shadow" />
          </div>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 flex flex-col justify-center gap-2 px-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center gap-4 p-3.5 rounded-xl transition-all duration-200 group/item outline-none cursor-pointer ${
                isActive 
                  ? 'text-white bg-[#1BA9A2] shadow-md shadow-[#1BA9A2]/30 font-bold' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              } ${isHovered ? 'justify-start px-4' : 'justify-center'}`}
            >
              <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover/item:scale-110'}`}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'text-gray-300'} />
              </div>
              
              <span className={`text-sm font-bold tracking-wide whitespace-nowrap overflow-hidden transition-all duration-300 ${
                isHovered ? 'opacity-100 max-w-[200px] translate-x-0' : 'opacity-0 max-w-0 -translate-x-4'
              }`}>
                {tab.label}
              </span>

              {/* Active Indicator: Orange Play Marker Motif */}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-7 bg-[#F26A21] rounded-l-full shadow-[0_0_8px_rgba(242,106,33,0.8)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 pb-8">
        {onLogout && (
          <button 
            onClick={onLogout}
            className={`flex items-center gap-4 p-3.5 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full outline-none cursor-pointer ${
              isHovered ? 'justify-start px-4' : 'justify-center'
            }`}
          >
            <LogOut size={22} />
            <span className={`text-sm font-bold whitespace-nowrap overflow-hidden transition-all duration-300 ${
              isHovered ? 'opacity-100 max-w-[200px]' : 'opacity-0 max-w-0'
            }`}>
              Déconnexion
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
