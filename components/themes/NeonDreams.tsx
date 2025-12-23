import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles, Zap } from 'lucide-react';

export const NeonDreams: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#050505] text-[#0ff] font-mono relative overflow-hidden border-4 border-[#f0f]/30">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#f0f]/10 to-transparent pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-1 bg-[#f0f] shadow-[0_0_15px_#f0f]" />

    <div className="relative z-10 p-8 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={s(18)} className="text-[#ff0] animate-bounce" fill="currentColor" />
          <span className="text-[10px] tracking-[0.4em] text-[#ff0] font-black italic">ACTIVE_PROFILE</span>
        </div>
        {renderDraggableField('name', <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white drop-shadow-[0_0_10px_#0ff] leading-none">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-bold bg-[#0ff] text-black px-3 py-1 inline-block mt-2 tracking-widest">{displayData.position}</p>)}
      </div>

      <div className="grid grid-cols-2 gap-6 text-[10px] border-t-2 border-[#f0f]/50 pt-6">
        <div className="space-y-2">
          {renderDraggableField('email', <p className="flex items-center gap-2"><span className="text-[#f0f]">@</span> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><span className="text-[#f0f]">#</span> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          <Sparkles size={s(24)} className="ml-auto text-[#ff0] mb-2" />
          {renderDraggableField('location', <p className="opacity-70 italic">{`LOC: ${displayData.location}`}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




