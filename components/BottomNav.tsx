import React from 'react';
import { Home, Compass, Layout, Download, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Painel', icon: Home },
    { id: 'search', label: 'Catálogo', icon: Compass },
    { id: 'trail', label: 'Sua Trilha', icon: Layout },
    { id: 'downloads', label: 'Offline', icon: Download },
    { id: 'profile', label: 'Conta', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#12181A] border-t border-[#1BA9A2]/20 z-50 flex justify-around items-center py-2 safe-area-inset-bottom md:hidden shadow-xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors duration-200 cursor-pointer ${
              isActive ? 'text-white' : 'text-gray-400'
            }`}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#1BA9A2]' : 'text-gray-400'} />
            <span className={`text-[10px] font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>{tab.label}</span>
            {isActive && <div className="w-1.5 h-1.5 bg-[#F26A21] rounded-full mt-0.5 shadow-[0_0_6px_#F26A21]" />}
          </button>
        );
      })}
    </div>
  );
};

export default BottomNav;
