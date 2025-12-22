import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Leaf, Trees } from 'lucide-react';

export const JungleVibe: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#1a2e1a] text-[#e8f5e9] relative overflow-hidden">
    <div className="absolute -right-20 -top-20 opacity-10 rotate-45 pointer-events-none text-green-400">
      <Leaf size={300} fill="currentColor" />
    </div>
    <div className="absolute -left-20 -bottom-20 opacity-10 -rotate-12 pointer-events-none text-emerald-400">
      <Trees size={350} fill="currentColor" />
    </div>

    <div className="relative z-10 p-10 flex flex-col justify-between h-full border-[12px] border-[#2e4d2e]/50">
      <div className="border-l-8 border-emerald-500 pl-6 py-2">
        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tight text-white mb-1">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-sm font-bold text-emerald-400 uppercase tracking-[0.2em]">{displayData.position}</p>)}
      </div>

      <div className="space-y-4 max-w-[70%]">
        {renderDraggableField('goal', <p className="text-sm italic font-medium leading-relaxed text-emerald-100/80">"{displayData.goal}"</p>)}

        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-emerald-500/20 text-[11px] font-bold tracking-wider">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Leaf size={s(12)} className="text-emerald-500" /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Leaf size={s(12)} className="text-emerald-500" /> {displayData.contact}</p>)}
          {renderDraggableField('location', <p className="flex items-center gap-2"><Leaf size={s(12)} className="text-emerald-500" /> {displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

