// @label: 글래스 카드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles, Circle } from 'lucide-react';

export const GlassCard: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-slate-100 text-slate-800 font-sans relative overflow-hidden flex items-center justify-center">
    <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse" />
    <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-purple-400 rounded-full blur-3xl opacity-30" />

    <div className="relative z-10 w-[85%] h-[75%] bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-10 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Circle size={100} fill="currentColor" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-purple-500" />
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Premium Profile</span>
        </div>
        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-sm font-bold text-purple-600 uppercase tracking-widest">{displayData.position}</p>)}
      </div>
      <div className="flex justify-between items-end text-[10px] font-bold text-slate-500">
        <div className="space-y-1">
          {renderDraggableField('email', <p>{displayData.email}</p>)}
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        </div>
        {renderDraggableField('location', <p className="bg-white/40 px-3 py-1 rounded-full border border-white/50">{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




