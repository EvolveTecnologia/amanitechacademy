import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'icon-only';
  inverted?: boolean; // true for dark background, false for light background
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'horizontal',
  inverted = false,
  size = 'md',
  showSubtitle = true,
}) => {
  const iconSrc = '/assets/aistudio/icon_eb76fa32.png';
  const fullLogoSrc = '/assets/aistudio/logo_ebb118af.png';

  // Sizing tokens
  const sizeMap = {
    sm: { icon: 'h-7 sm:h-8', text: 'text-lg', badge: 'text-[8px]' },
    md: { icon: 'h-9 sm:h-10', text: 'text-xl sm:text-2xl', badge: 'text-[9px] sm:text-[10px]' },
    lg: { icon: 'h-12 sm:h-14', text: 'text-2xl sm:text-3xl', badge: 'text-[11px]' },
    xl: { icon: 'h-16 sm:h-20', text: 'text-3xl sm:text-4xl', badge: 'text-xs' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center select-none ${className}`}>
        <img 
          src={iconSrc} 
          alt="Amanitech Academy Icon" 
          className="w-full h-full object-contain filter drop-shadow-md"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/pwa-512x512.png';
          }}
        />
      </div>
    );
  }

  if (variant === 'stacked') {
    return (
      <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
        <img 
          src={fullLogoSrc} 
          alt="Amanitech Academy Logo" 
          className="w-auto h-20 sm:h-24 object-contain filter drop-shadow-lg"
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = iconSrc;
          }}
        />
        {showSubtitle && (
          <span className="text-[#1BA9A2] font-black uppercase tracking-[0.3em] text-[10px] mt-1 text-center">
            ACADEMY
          </span>
        )}
      </div>
    );
  }

  // Horizontal variant (default)
  // On light backgrounds (e.g. certificates, white cards): the full image logo displays with high clarity
  // On dark backgrounds: the AT triangle icon is paired with high-contrast text ("Amani" in white, "Tech" in orange, "ACADEMY" in teal)
  // and maintains the exact typography & branding of Amanitech Academy
  if (!inverted) {
    return (
      <div className={`inline-flex items-center gap-2 select-none ${className}`}>
        <img 
          src={fullLogoSrc} 
          alt="Amanitech Academy" 
          className={`${currentSize.icon} w-auto object-contain shrink-0`}
          loading="eager"
          onError={(e) => {
            (e.target as HTMLImageElement).src = iconSrc;
          }}
        />
        {showSubtitle && (
          <span className="text-[#1BA9A2] font-black uppercase tracking-[0.2em] text-[10px] px-2 py-0.5 rounded bg-[#E6F7F6] border border-[#1BA9A2]/30 shrink-0">
            ACADEMY
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official AT Metallic Teal Triangle Icon from Uploaded Asset */}
      <img 
        src={iconSrc} 
        alt="Amanitech Academy Emblem" 
        className={`${currentSize.icon} w-auto object-contain filter drop-shadow-md shrink-0`}
        loading="eager"
      />
      
      {/* Wordmark Amani + Tech + Subtitle ACADEMY */}
      <div className="flex flex-col justify-center leading-none">
        <div className={`flex items-center font-black tracking-tight ${currentSize.text}`}>
          <span className="text-white font-black tracking-tight">Amani</span>
          <span className="text-[#F26A21] font-black tracking-tight">Tech</span>
        </div>
        {showSubtitle && (
          <span className={`text-[#1BA9A2] font-black uppercase tracking-[0.28em] ${currentSize.badge} mt-0.5`}>
            ACADEMY
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
