// @label: 아르데코 골드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Crown, Sparkles } from 'lucide-react';

export const ArtDecoGold: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#1a1a1a] text-[#c5a059] font-serif relative overflow-hidden border-[2px] border-[#c5a059]/30">
    <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/art-deco-lux.png')] pointer-events-none" />
    <div className="absolute inset-4 border border-[#c5a059]/20 pointer-events-none" />
    <div className="absolute inset-8 border border-[#c5a059]/10 pointer-events-none" />

    <div className="relative z-10 p-16 flex flex-col items-center justify-between h-full text-center">
      <div className="w-full flex justify-center items-center gap-6 mb-2">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#c5a059]/50" />
        <Crown size={s(28)} className="text-[#c5a059] drop-shadow-[0_0_8px_rgba(197,160,89,0.5)]" fill="currentColor" />
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#c5a059]/50" />
      </div>

      <div className="space-y-4">
        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-[0.15em] uppercase italic text-white drop-shadow-md">{displayData.name}</h2>)}
        <div className="inline-block border-y border-[#c5a059] py-2 px-10">
          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.8em] italic text-[#c5a059]">{displayData.position}</p>)}
        </div>
      </div>

      <div className="pt-12 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">
        {renderDraggableField('email', <p className="hover:text-white transition-colors">{displayData.email}</p>)}
        <div className="flex items-center justify-center gap-4">
          <Sparkles size={8} fill="currentColor" />
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
          <Sparkles size={8} fill="currentColor" />
        </div>
        {renderDraggableField('location', <p className="mt-1">{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

