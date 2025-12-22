// @label: 고지도
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Compass, Navigation } from 'lucide-react';

export const OldMap: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#dccbb5] text-[#5d4037] font-serif relative overflow-hidden shadow-inner border-[10px] border-double border-[#8d6e63]/30">
    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/parchment.png')]" />
    <div className="absolute top-4 right-4 opacity-10">
      <Compass size={250} className="rotate-12" />
    </div>
    <div className="relative z-10 p-12 flex flex-col justify-between h-full border border-[#8d6e63]/20 m-2">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-6">
          <div className="h-[1px] flex-1 bg-[#5d4037]/20" />
          <Navigation size={s(24)} className="text-[#8d6e63]" />
          <div className="h-[1px] flex-1 bg-[#5d4037]/20" />
        </div>
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter drop-shadow-sm">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.5em] text-[#8d6e63]">{displayData.position}</p>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-12 text-[11px] font-bold italic border-t-2 border-dotted border-[#8d6e63]/30 pt-8">
        <div className="space-y-2">
          {renderDraggableField('email', <p className="flex items-center gap-2">~ {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2">~ {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          {renderDraggableField('location', <p className="bg-[#8d6e63]/10 px-3 py-1 inline-block">{displayData.location}</p>)}
          <p className="text-[9px] opacity-40 mt-2 uppercase tracking-[0.3em]">Anno MMXXV</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

