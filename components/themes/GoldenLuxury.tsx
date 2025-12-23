import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Crown, Star } from 'lucide-react';

export const GoldenLuxury: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0a0a0a] text-[#d4af37] font-serif relative overflow-hidden border-[15px] border-double border-[#d4af37]/20">
    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
    <div className="absolute inset-2 border border-[#d4af37]/10 pointer-events-none" />

    <div className="relative z-10 p-12 flex flex-col justify-center items-center h-full text-center space-y-8">
      <div className="w-16 h-16 border border-[#d4af37] rotate-45 flex items-center justify-center mb-2">
        <Crown size={s(32)} className="-rotate-45" fill="currentColor" />
      </div>

      <div className="space-y-3">
        {renderDraggableField('name', <h2 className="text-6xl font-bold tracking-[0.1em] uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.3)]">{displayData.name}</h2>)}
        <div className="flex items-center gap-4 justify-center">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d4af37]/50" />
          {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.6em] text-white/60 italic">{displayData.position}</p>)}
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#d4af37]/50" />
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-60">
        {renderDraggableField('email', <p className="hover:text-white transition-colors">{displayData.email}</p>)}
        <div className="flex items-center justify-center gap-2">
          <Star size={8} fill="currentColor" />
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
          <Star size={8} fill="currentColor" />
        </div>
        {renderDraggableField('location', <p>{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




