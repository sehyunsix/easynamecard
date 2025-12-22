import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Moon, Star } from 'lucide-react';

export const AuroraNight: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#030712] text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-40 pointer-events-none"
         style={{ background: 'linear-gradient(135deg, #030712 0%, #111827 50%, #030712 100%)' }} />

    <div className="absolute top-[-50%] left-[-20%] w-[140%] h-[140%] opacity-30 animate-aurora pointer-events-none"
         style={{ background: 'conic-gradient(from 0deg at 50% 50%, #2dd4bf 0deg, #3b82f6 90deg, #8b5cf6 180deg, #2dd4bf 360deg)', filter: 'blur(80px)' }} />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full border border-white/5 m-4">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-teal-400 uppercase tracking-[0.4em] pl-1">{displayData.position}</p>)}
        </div>
        <Moon size={s(32)} className="text-white/20" />
      </div>

      <div className="space-y-6">
        {renderDraggableField('goal', <p className="text-sm font-medium leading-relaxed text-white/60 border-l-2 border-teal-500/50 pl-6 max-w-md">{displayData.goal}</p>)}

        <div className="flex justify-between items-end">
          <div className="grid grid-cols-1 gap-1 text-[10px] font-bold uppercase tracking-widest text-white/40">
            {renderDraggableField('email', <p className="flex items-center gap-2"><Star size={s(10)} fill="currentColor" /> {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="flex items-center gap-2"><Star size={s(10)} fill="currentColor" /> {displayData.contact}</p>)}
          </div>
          <div className="text-right">
            {renderDraggableField('location', <p className="text-[10px] font-bold text-teal-400/60 uppercase tracking-widest">{displayData.location}</p>)}
            <p className="text-[8px] text-white/10 mt-1">AURORA_SYSTEM_ACTIVE_2025</p>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

