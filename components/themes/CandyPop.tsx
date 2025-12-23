import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles, Smile } from 'lucide-react';

export const CandyPop: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#fff0f6] text-[#ff3366] font-montserrat relative overflow-hidden">
    <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffdeeb] rounded-full blur-3xl opacity-60 animate-pulse" />
    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#e7f5ff] rounded-full blur-3xl opacity-60" />

    <div className="relative z-10 p-10 flex flex-col justify-between h-full">
      <div className="flex flex-col items-center text-center">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-[40px] shadow-[0_15px_30px_rgba(255,51,102,0.1)] border-4 border-white inline-block">
          {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter italic drop-shadow-sm mb-1 uppercase">{displayData.name}</h2>)}
          <div className="h-1.5 w-12 bg-gradient-to-r from-[#ff3366] to-[#3399ff] rounded-full mx-auto mb-2" />
          {renderDraggableField('position', <p className="text-[10px] font-bold text-[#3399ff] uppercase tracking-[0.3em]">{displayData.position}</p>)}
        </div>
      </div>

      <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-[#ff3366]/60">
        <div className="space-y-1 text-left bg-white/40 px-4 py-2 rounded-2xl backdrop-blur-sm">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Smile size={s(12)} /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Smile size={s(12)} /> {displayData.contact}</p>)}
        </div>
        <div className="w-14 h-14 bg-white rounded-[20px] flex items-center justify-center shadow-lg border-2 border-[#fff0f6]">
          <Sparkles size={28} className="text-yellow-400" fill="currentColor" />
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




