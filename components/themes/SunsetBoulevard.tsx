// @label: 선셋 불러바드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Palmtree, Waves } from 'lucide-react';

export const SunsetBoulevard: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#2d1b4e] text-[#ff71ce] font-sans relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#ff71ce]/20 via-[#01cdfe]/10 to-[#05ffa1]/20" />
    <div className="absolute top-[10%] right-[10%] w-48 h-48 bg-gradient-to-b from-[#fffb96] to-[#ff71ce] rounded-full blur-md opacity-80" />
    <div className="absolute bottom-0 left-0 w-full h-32 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #01cdfe 2px, #01cdfe 4px)', backgroundSize: '100% 4px' }} />
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-0">
        {renderDraggableField('name', <h2 className="text-8xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_4px_0_#ff71ce] leading-[0.8] mb-4">{displayData.name}</h2>)}
        <div className="inline-block bg-[#01cdfe] text-[#2d1b4e] px-6 py-1 italic font-black uppercase tracking-widest skew-x-[-15deg]">
          {renderDraggableField('position', <p className="skew-x-[15deg]">{displayData.position}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1 text-xs font-black uppercase italic text-[#05ffa1] tracking-tighter">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Waves size={14} /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Waves size={14} /> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col items-end">
          <Palmtree size={s(40)} className="text-[#fffb96] mb-2 drop-shadow-[0_0_10px_#fffb96]" />
          {renderDraggableField('location', <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

