import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Hexagon, Zap } from 'lucide-react';

export const PrismShard: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f0f2f5] text-slate-800 font-sans relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[60%] h-full bg-gradient-to-bl from-blue-500/20 via-purple-500/20 to-pink-500/20 clip-path-polygon"
         style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest pl-1">{displayData.position}</p>)}
        </div>
        <div className="w-12 h-12 bg-white rounded-xl shadow-xl flex items-center justify-center border border-white">
          <Hexagon size={24} className="text-blue-600 animate-spin-slow" />
        </div>
      </div>

      <div className="space-y-6">
        {renderDraggableField('goal', <p className="text-xs font-bold leading-relaxed text-slate-500 max-w-[60%] border-l-2 border-indigo-500 pl-4">{displayData.goal}</p>)}

        <div className="grid grid-cols-2 gap-4 text-[10px] font-bold uppercase tracking-wider">
          <div className="space-y-1.5">
            {renderDraggableField('email', <p className="flex items-center gap-2"><Zap size={s(10)} className="text-blue-500" /> {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="flex items-center gap-2"><Zap size={s(10)} className="text-indigo-500" /> {displayData.contact}</p>)}
          </div>
          <div className="text-right flex flex-col justify-end">
            {renderDraggableField('location', <p className="text-slate-400">{displayData.location}</p>)}
            <p className="text-[8px] text-blue-600/40 mt-1 italic">GEN_ID: {Math.random().toString(16).substring(2, 10)}</p>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

