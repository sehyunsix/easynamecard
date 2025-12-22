import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Leaf } from 'lucide-react';

export const QuietZen: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#faf9f6] text-[#333] font-serif relative overflow-hidden">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[140%] opacity-[0.03] pointer-events-none"
         style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="relative z-10 p-16 flex h-full">
      <div className="w-[10%] h-full flex flex-col items-center">
        <div className="w-px h-full bg-slate-200 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-slate-100" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between pl-8">
        <div className="space-y-4">
          <div className="space-y-1">
            {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tight text-slate-900">{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] italic">{displayData.position}</p>)}
          </div>
          <div className="max-w-xs">
            {renderDraggableField('goal', <p className="text-xs italic leading-relaxed text-slate-500">{displayData.goal}</p>)}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-1.5 text-[10px] font-medium tracking-widest text-slate-400 uppercase">
            {renderDraggableField('email', <p className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-slate-300" /> {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-slate-300" /> {displayData.contact}</p>)}
            {renderDraggableField('location', <p className="flex items-center gap-3"><span className="w-1 h-1 rounded-full bg-slate-300" /> {displayData.location}</p>)}
          </div>
          <div className="flex flex-col items-end">
            <Leaf size={s(20)} className="text-slate-200 mb-2" />
            <div className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em] rotate-90 origin-right translate-y-[-20px]">EST. 2025</div>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

