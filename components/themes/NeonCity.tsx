// @label: 네온 시티
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { TowerControl as City, Zap } from 'lucide-react';

export const NeonCity: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0f172a] text-white font-sans relative overflow-hidden border-b-8 border-pink-500">
    <div className="absolute bottom-0 left-0 w-full h-48 opacity-20 pointer-events-none flex items-end justify-center">
      <City size={500} className="text-pink-500" />
    </div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-2 border-l-4 border-pink-500 pl-8">
        {renderDraggableField('name', <h2 className="text-7xl font-black italic tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-indigo-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.3)]">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-lg font-bold text-white/50 tracking-widest">{displayData.position}</p>)}
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1 text-[11px] font-black uppercase tracking-widest text-white/40">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Zap size={12} className="text-pink-500" fill="currentColor" /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Zap size={12} className="text-pink-500" fill="currentColor" /> {displayData.contact}</p>)}
        </div>
        <div className="text-right">
          {renderDraggableField('location', <p className="text-xs font-bold bg-white/5 px-4 py-1 rounded-full border border-white/10">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

