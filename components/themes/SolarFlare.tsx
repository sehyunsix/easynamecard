// @label: 솔라 플레어
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sun, Zap } from 'lucide-react';

export const SolarFlare: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#ff4500] text-white font-black relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-tr from-[#ff8c00] via-[#ff4500] to-[#b22222] opacity-80" />
    <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-[#ffd700] rounded-full blur-[80px] opacity-40 animate-pulse" />
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Sun size={s(24)} className="animate-spin-slow text-[#ffd700]" />
          <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#ffd700]">Solar_Radiation_Active</span>
        </div>
        {renderDraggableField('name', <h2 className="text-7xl font-black italic uppercase tracking-tighter drop-shadow-[0_4px_10px_rgba(0,0,0,0.3)]">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xl font-bold bg-white text-[#ff4500] px-4 py-1 inline-block skew-x-[-10deg]">{displayData.position}</p>)}
      </div>
      <div className="grid grid-cols-2 gap-8 text-xs font-black uppercase italic tracking-widest">
        <div className="space-y-1">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Zap size={14} fill="currentColor" /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Zap size={14} fill="currentColor" /> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          {renderDraggableField('location', <p className="bg-black/20 px-3 py-1 inline-block ml-auto">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




