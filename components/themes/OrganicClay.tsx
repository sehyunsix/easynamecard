// @label: 오가닉 클레이
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Leaf } from 'lucide-react';

export const OrganicClay: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f3ede4] text-[#7a6a53] font-sans relative overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#e2d8c8] rounded-[40%] rotate-12 pointer-events-none" />
    <div className="absolute bottom-[-15%] right-[-5%] w-[50%] h-[50%] bg-[#d7c9b8] rounded-[30%] -rotate-6 pointer-events-none" />

    <div className="relative z-10 p-16 flex flex-col justify-between h-full">
      <div className="space-y-1 border-l-2 border-[#7a6a53]/20 pl-8">
        <Leaf size={s(20)} className="text-[#a6937c] mb-4" />
        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tight text-[#4a4238] leading-tight">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#a6937c] mt-2 italic">{displayData.position}</p>)}
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1.5 text-[10px] font-black uppercase tracking-widest text-[#7a6a53]/60">
          {renderDraggableField('email', <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#a6937c]" /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#a6937c]" /> {displayData.contact}</p>)}
          {renderDraggableField('location', <p className="flex items-center gap-3"><div className="w-1 h-1 rounded-full bg-[#a6937c]" /> {displayData.location}</p>)}
        </div>
        <div className="text-[9px] font-bold text-[#a6937c] uppercase tracking-[0.5em] rotate-90 origin-right translate-y-[-20px] opacity-40">Handcrafted 2025</div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

