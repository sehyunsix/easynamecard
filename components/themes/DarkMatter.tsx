// @label: 다크 매터
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Atom, Zap } from 'lucide-react';

export const DarkMatter: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#030014] text-[#a855f7] font-mono relative overflow-hidden border-[1px] border-[#a855f7]/20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#1e1b4b_0%,_#030014_70%)]" />
    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="absolute w-px h-px bg-white rounded-full animate-pulse" 
             style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }} />
      ))}
    </div>
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2 opacity-50 text-[10px] italic">
            <Atom size={12} className="animate-spin-slow" />
            <span>Quantum_Entanglement_Active</span>
          </div>
          {renderDraggableField('name', <h2 className="text-7xl font-black uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#d8b4fe] to-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] leading-none">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-white/40 uppercase tracking-[0.5em] pl-2">Level // {displayData.position}</p>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 text-[10px] font-black uppercase border-t border-white/5 pt-8">
        <div className="space-y-2">
          {renderDraggableField('email', <p className="flex items-center gap-3 border-l-2 border-[#a855f7] pl-4 hover:text-white transition-colors">{displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-3 border-l-2 border-[#a855f7] pl-4 hover:text-white transition-colors">{displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end">
          <Zap size={s(20)} className="mb-2 text-[#d8b4fe] animate-bounce" />
          {renderDraggableField('location', <p className="opacity-30 tracking-[0.3em]">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

