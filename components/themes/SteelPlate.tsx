import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Settings, ShieldCheck } from 'lucide-react';

export const SteelPlate: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-gradient-to-br from-[#2c3e50] to-[#000] text-slate-300 font-mono relative overflow-hidden border-[10px] border-[#34495e]/50">
    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none" />

    <div className="absolute top-2 left-2 flex gap-1 opacity-30">
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
    </div>
    <div className="absolute top-2 right-2 flex gap-1 opacity-30">
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
    </div>
    <div className="absolute bottom-2 left-2 flex gap-1 opacity-30">
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
    </div>
    <div className="absolute bottom-2 right-2 flex gap-1 opacity-30">
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
      <div className="w-2 h-2 rounded-full bg-slate-500 shadow-inner" />
    </div>

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="border-b-4 border-slate-700 pb-6 flex justify-between items-end">
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter text-white italic drop-shadow-[0_4px_0_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-blue-400 tracking-[0.3em] pl-1">SPEC_LEVEL: {displayData.position.toUpperCase()}</p>)}
        </div>
        <ShieldCheck size={s(40)} className="text-slate-600 mb-1" />
      </div>

      <div className="grid grid-cols-2 gap-8 text-[10px] font-bold">
        <div className="space-y-2">
          <div className="bg-black/30 p-3 border border-slate-700 rounded-sm">
            {renderDraggableField('email', <p className="text-blue-300">USER_ADDR: {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="text-blue-300 mt-1">FREQ_CHAN: {displayData.contact}</p>)}
          </div>
        </div>
        <div className="text-right flex flex-col justify-end space-y-4">
          <div className="flex justify-end">
            <Settings size={s(24)} className="text-slate-700 animate-spin-slow" />
          </div>
          <div className="bg-black/30 p-3 border border-slate-700 rounded-sm">
            {renderDraggableField('location', <p>BASE_NODE: {displayData.location}</p>)}
            <p className="text-[8px] opacity-20 mt-1 uppercase tracking-widest">System secure 2025</p>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

