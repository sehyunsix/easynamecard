import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Leaf } from 'lucide-react';

export const FloraBotanica: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#fdfbf7] text-[#2c3e50] font-serif relative overflow-hidden border-[1px] border-[#e0dcd0]">
    <div className="absolute top-[-10%] right-[-10%] opacity-10 rotate-[15deg] text-emerald-800">
      <Leaf size={400} />
    </div>
    <div className="absolute bottom-[-15%] left-[-5%] opacity-[0.05] -rotate-[20deg] text-emerald-900">
      <Leaf size={350} fill="currentColor" />
    </div>

    <div className="relative z-10 p-16 flex flex-col justify-between h-full m-4 border border-[#e0dcd0]">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-8 bg-[#2c3e50]/20" />
          <Leaf size={s(16)} className="text-emerald-700" />
          <div className="h-px w-8 bg-[#2c3e50]/20" />
        </div>

        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-5xl font-serif italic text-slate-900 tracking-tight">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-emerald-800/60 uppercase tracking-[0.4em]">{displayData.position}</p>)}
        </div>
      </div>

      <div className="max-w-[80%] mx-auto text-center border-y border-[#e0dcd0] py-6">
        {renderDraggableField('goal', <p className="text-sm font-medium leading-relaxed italic text-slate-600">{displayData.goal}</p>)}
      </div>

      <div className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-slate-400">
        {renderDraggableField('email', <p>{displayData.email}</p>)}
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-700/30" />
        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-700/30" />
        {renderDraggableField('location', <p>{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




