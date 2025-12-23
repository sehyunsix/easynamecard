// @label: 레트로 팝
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles, Star } from 'lucide-react';

export const RetroPop: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#ffeb3b] text-[#e91e63] font-black relative overflow-hidden border-[10px] border-[#2196f3]">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
         style={{ backgroundImage: 'radial-gradient(#e91e63 2px, transparent 2px)', backgroundSize: '20px 20px' }} />
    <div className="relative z-10 p-8 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <div className="bg-white border-4 border-black inline-block px-4 py-2 rotate-[-2deg] shadow-[4px_4px_0_#000]">
          {renderDraggableField('name', <h2 className="text-5xl uppercase tracking-tighter italic">{displayData.name}</h2>)}
        </div>
        <br/>
        <div className="bg-[#2196f3] text-white border-4 border-black inline-block px-3 py-1 rotate-[1deg] shadow-[4px_4px_0_#000]">
          {renderDraggableField('position', <p className="text-sm uppercase tracking-widest">{displayData.position}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1 text-xs bg-white/90 p-3 border-2 border-black shadow-[2px_2px_0_#000]">
          {renderDraggableField('email', <p>{displayData.email}</p>)}
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        </div>
        <Star size={s(40)} fill="currentColor" className="text-[#ff5722]" />
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




