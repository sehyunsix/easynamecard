import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { PenTool, Palette } from 'lucide-react';

export const InkSplatter: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#fafafa] text-[#1a1a1a] font-sans relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] opacity-10 rotate-12 pointer-events-none"
         style={{ filter: 'blur(2px)', backgroundImage: `radial-gradient(circle, ${style.primaryColor} 0%, transparent 70%)` }} />
    <div className="absolute bottom-[-5%] left-[-10%] w-[40%] h-[40%] opacity-10 -rotate-12 pointer-events-none"
         style={{ filter: 'blur(3px)', backgroundImage: `radial-gradient(circle, ${style.accentColor} 0%, transparent 70%)` }} />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-slate-200/50 -rotate-2 rounded-sm -z-10" />
          {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase mb-1 drop-shadow-sm">{displayData.name}</h2>)}
        </div>
        <br/>
        <div className="inline-block bg-[#1a1a1a] text-white px-4 py-1 skew-x-[-10deg]">
          {renderDraggableField('position', <p className="text-xs font-black uppercase tracking-[0.2em] skew-x-[10deg]">{displayData.position}</p>)}
        </div>
      </div>

      <div className="space-y-6">
        {renderDraggableField('goal', <p className="text-sm font-serif italic leading-relaxed text-slate-600 border-b-2 border-slate-100 pb-4 max-w-[80%]">{displayData.goal}</p>)}

        <div className="grid grid-cols-2 gap-8 text-[11px] font-black uppercase tracking-tight">
          <div className="space-y-1">
            {renderDraggableField('email', <p className="flex items-center gap-2 border-l-4 border-slate-800 pl-3">EML: {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="flex items-center gap-2 border-l-4 border-slate-800 pl-3">TEL: {displayData.contact}</p>)}
          </div>
          <div className="text-right flex flex-col justify-end items-end space-y-2">
            <Palette size={s(20)} className="opacity-20" />
            {renderDraggableField('location', <p className="text-slate-400">LOC: {displayData.location}</p>)}
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

