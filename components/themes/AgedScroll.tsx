import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Scroll, PenTool } from 'lucide-react';

export const AgedScroll: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#e6d5b8] text-[#4a3933] font-serif relative overflow-hidden shadow-inner">
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
    <div className="absolute inset-0 pointer-events-none border-[20px] border-transparent" style={{ borderImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png') 30 round" }} />

    <div className="relative z-10 p-12 flex flex-col items-center justify-between h-full">
      <div className="w-full flex justify-center items-center gap-4 mb-4">
        <div className="h-px flex-1 bg-[#4a3933]/30" />
        <Scroll size={s(24)} className="text-[#4a3933]/60" />
        <div className="h-px flex-1 bg-[#4a3933]/30" />
      </div>

      <div className="text-center space-y-2">
        {renderDraggableField('name', <h2 className="text-6xl font-serif italic tracking-tighter drop-shadow-sm">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#4a3933]/70">{displayData.position}</p>)}
      </div>

      <div className="max-w-[80%] text-center">
        {renderDraggableField('goal', <p className="text-sm italic leading-relaxed text-[#4a3933]/80 border-y border-[#4a3933]/20 py-4 font-medium">{displayData.goal}</p>)}
      </div>

      <div className="w-full grid grid-cols-2 gap-8 text-[11px] font-bold italic tracking-wide">
        <div className="space-y-1">
          {renderDraggableField('email', <p className="flex items-center gap-2"><PenTool size={s(12)} /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><PenTool size={s(12)} /> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          {renderDraggableField('location', <p>{displayData.location}</p>)}
          <p className="text-[9px] opacity-40 mt-1 uppercase tracking-widest">Since MMXXV</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




