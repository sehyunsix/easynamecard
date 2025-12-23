import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Grid, MousePointer2 } from 'lucide-react';

export const GraphPaper: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f8f9fa] text-slate-800 relative overflow-hidden font-mono">
    <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '6px 6px' }} />

    <div className="relative z-10 p-10 flex flex-col justify-between h-full border-2 border-slate-200">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="px-4 py-2 border-2 border-slate-800 bg-white inline-block shadow-[4px_4px_0_rgba(0,0,0,1)]">
            {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tight">{displayData.name}</h2>)}
          </div>
          <div className="flex items-center gap-2">
            <MousePointer2 size={s(14)} className="text-slate-800 fill-slate-800" />
            {renderDraggableField('position', <p className="text-sm font-bold bg-slate-100 px-2 py-0.5 border border-slate-200">OBJECT: {displayData.position}</p>)}
          </div>
        </div>
        <div className="w-16 h-16 border-2 border-slate-800 flex items-center justify-center bg-white shadow-[2px_2px_0_rgba(0,0,0,1)]">
          <Grid size={32} className="text-slate-800" />
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1 border-l-4 border-slate-800 pl-4 py-1">
          {renderDraggableField('goal', <p className="text-xs font-bold italic leading-relaxed text-slate-500">{`// DESCRIPTION:\n${displayData.goal}`}</p>)}
        </div>

        <div className="grid grid-cols-2 gap-4 text-[10px] font-bold">
          <div className="space-y-1">
            {renderDraggableField('email', <p>STR EMAIL = "{displayData.email}"</p>)}
            {renderDraggableField('contact', <p>INT CONTACT = {displayData.contact.replace(/-/g, '')}</p>)}
          </div>
          <div className="text-right flex flex-col justify-end">
            {renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
            <p className="text-[8px] text-slate-400 mt-1">COMPILED_SUCCESSFULLY_2025</p>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




