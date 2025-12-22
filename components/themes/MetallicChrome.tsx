// @label: 메탈릭 크롬
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { ShieldCheck, Activity } from 'lucide-react';

export const MetallicChrome: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#1a1a1a] text-slate-300 font-mono relative overflow-hidden border-[1px] border-slate-700">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-400/20 via-transparent to-slate-400/20" />
    <div className="absolute inset-0 opacity-10 pointer-events-none" 
         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/brushed-alum.png")' }} />
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start border-b-2 border-slate-700 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 opacity-40">
            <Activity size={12} />
            <span className="text-[8px] tracking-[0.4em] uppercase font-bold">System_Core_v2.0</span>
          </div>
          {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-tight text-white italic drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-blue-400 uppercase tracking-widest pl-1">Rank // {displayData.position}</p>)}
        </div>
        <ShieldCheck size={s(40)} className="text-slate-600" />
      </div>
      <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase">
        <div className="space-y-3 bg-white/5 p-4 border border-white/10 rounded-sm">
          {renderDraggableField('email', <p className="flex items-center gap-3"><span className="text-blue-500">ID:</span> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-3"><span className="text-blue-500">PH:</span> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end space-y-2">
          {renderDraggableField('location', <p className="opacity-40 italic">{`Node: ${displayData.location}`}</p>)}
          <div className="flex gap-1">
            {[...Array(8)].map((_, i) => <div key={i} className="w-1 h-4 bg-slate-700" />)}
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

