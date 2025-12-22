// @label: 젠 스톤
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Circle } from 'lucide-react';

export const ZenStone: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#e5e7eb] text-[#374151] font-serif relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'radial-gradient(#9ca3af 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    <div className="relative z-10 p-16 flex flex-col items-center justify-between h-full text-center">
      <div className="w-24 h-24 bg-[#d1d5db] rounded-full shadow-inner flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-black/10" />
        <Circle size={40} className="text-[#9ca3af]" />
      </div>
      <div className="space-y-2">
        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-[0.3em] uppercase">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-bold text-[#6b7280] uppercase tracking-[0.5em]">{displayData.position}</p>)}
      </div>
      <div className="w-px h-12 bg-[#9ca3af]/40" />
      <div className="grid grid-cols-1 gap-1 text-[10px] font-medium tracking-widest uppercase text-[#9ca3af]">
        {renderDraggableField('email', <p>{displayData.email}</p>)}
        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

