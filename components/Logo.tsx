import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'lg' }> = ({ size = 'sm' }) => {
  const isLarge = size === 'lg';
  const dimension = isLarge ? 'w-32 h-32' : 'w-12 h-12';
  const fontSize = isLarge ? 'text-4xl' : 'text-xl';

  return (
    <div className="flex items-center gap-3">
      <div className={`relative ${dimension} flex items-center justify-center`}>
        {/* Outer Ring - Red */}
        <div className="absolute inset-0 rounded-full border-4 border-genesis-red/80 animate-spin-slow" style={{ borderRightColor: 'transparent', borderBottomColor: 'transparent' }}></div>
        
        {/* Inner Ring - Cyan */}
        <div className="absolute inset-2 rounded-full border-4 border-genesis-cyan animate-pulse-fast"></div>

        {/* Center G */}
        <div className={`relative z-10 font-bold ${fontSize} text-genesis-cyan`}>
          G
        </div>

        {/* Crosshair effect (simulating the video branding) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-genesis-cyan/20"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-genesis-red/20"></div>
      </div>
      
      <div className="flex flex-col">
        <span className={`font-bold ${isLarge ? 'text-4xl' : 'text-2xl'} text-genesis-cyan tracking-tight`}>
          Genesis
        </span>
        <span className={`${isLarge ? 'text-lg' : 'text-xs'} font-semibold text-genesis-red tracking-widest uppercase`}>
          {isLarge ? 'Digital Solution' : 'IT Solutions'}
        </span>
      </div>
    </div>
  );
};