// @label: 프로즌 툰드라
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Snowflake, Wind } from 'lucide-react';

export const FrozenTundra: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#e0f2f1] text-[#006064] font-sans relative overflow-hidden border-[1px] border-white/50">
    <div className="absolute inset-0 bg-gradient-to-br from-white via-[#b2ebf2] to-[#80deea] opacity-50" />
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/pinstriped-suit.png")' }} />
    <div className="relative z-10 p-16 flex flex-col items-center justify-center text-center h-full space-y-8">
      <div className="w-20 h-20 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center border border-white/60 shadow-xl">
        <Snowflake size={40} className="text-[#00bcd4] animate-pulse" />
      </div>
      <div className="space-y-2">
        {renderDraggableField('name', <h2 className="text-6xl font-light tracking-[0.2em] uppercase text-[#004d40]">{displayData.name}</h2>)}
        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#00838f] to-transparent mx-auto" />
        {renderDraggableField('position', <p className="text-sm font-bold text-[#00838f] uppercase tracking-[0.4em] italic">{displayData.position}</p>)}
      </div>
      <div className="flex flex-col items-center space-y-2 text-[10px] font-black uppercase tracking-widest text-[#006064]/60">
        <div className="flex items-center gap-4">
          {renderDraggableField('email', <p>{displayData.email}</p>)}
          <Wind size={14} className="opacity-30" />
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        </div>
        {renderDraggableField('location', <p className="mt-4 italic">{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

