// @label: 로열 애머시스트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Crown, Sparkles } from 'lucide-react';

export const RoyalAmethyst: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#2e1065] text-[#f5f3ff] font-serif relative overflow-hidden border-[2px] border-[#a78bfa]/30">
    <div className="absolute inset-0 bg-gradient-to-br from-[#4c1d95] via-[#2e1065] to-[#1e1b4b]" />
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/royal-line.png")' }} />
    <div className="relative z-10 p-16 flex flex-col items-center justify-between h-full text-center">
      <div className="flex flex-col items-center space-y-4">
        <Crown size={s(32)} className="text-[#fbbf24] drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]" fill="currentColor" />
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-6xl font-black tracking-[0.1em] uppercase italic drop-shadow-2xl">{displayData.name}</h2>)}
          <div className="flex items-center gap-4 justify-center">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#a78bfa]" />
            {renderDraggableField('position', <p className="text-xs font-bold text-[#a78bfa] uppercase tracking-[0.6em]">{displayData.position}</p>)}
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#a78bfa]" />
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-4 pt-12 border-t border-[#a78bfa]/20 text-[9px] font-black uppercase tracking-[0.2em] text-[#a78bfa]">
        <div className="text-center space-y-1">
          <p className="opacity-40">Direct</p>
          {renderDraggableField('contact', <p className="text-white">{displayData.contact}</p>)}
        </div>
        <div className="flex items-center justify-center">
          <Sparkles size={16} className="text-[#fbbf24]" />
        </div>
        <div className="text-center space-y-1">
          <p className="opacity-40">Inquiry</p>
          {renderDraggableField('email', <p className="text-white break-all">{displayData.email}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




