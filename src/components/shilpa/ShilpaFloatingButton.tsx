import React from 'react';
import { Sparkles, MessageSquare } from 'lucide-react';
import { useShilpa } from '../../context/ShilpaContext';
import logoImg from '../../assets/logo.jpg';

export const ShilpaFloatingButton: React.FC = () => {
  const { toggleShilpa, isOpen, activeArtifact } = useShilpa();

  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 animate-fade-in">
      <button
        onClick={toggleShilpa}
        className="group flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full bg-[#FAF8F5] hover:bg-white text-[#244C3A] border-2 border-[#B85C38] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        aria-label="Open SHILPA AI Craft Guide"
      >
        {/* Konark Wheel Logo Thumbnail */}
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#B85C38]/40 shadow-xs group-hover:rotate-12 transition-transform duration-300 shrink-0">
          <img
            src={logoImg}
            alt="SHILPA Konark Wheel"
            className="w-full h-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-600 rounded-full border-2 border-white ring-1 ring-emerald-300 animate-pulse" />
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-serif text-xs sm:text-sm font-bold text-[#244C3A] tracking-tight">
              Ask SHILPA
            </span>
            <Sparkles className="w-3 h-3 text-[#B85C38]" />
          </div>
          <span className="text-[10px] font-semibold text-[#6B6A63] tracking-wide">
            {activeArtifact ? `Guiding: ${activeArtifact.name.slice(0, 18)}...` : 'AI Craft Guide'}
          </span>
        </div>
      </button>
    </div>
  );
};
