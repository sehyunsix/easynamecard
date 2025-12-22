import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Zap } from 'lucide-react';

export const CarbonSport: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-black text-white font-sans relative overflow-hidden">
    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-600 via-red-500 to-transparent" />
    <div className="absolute bottom-0 right-0 w-full h-2 bg-gradient-to-l from-red-600 via-red-500 to-transparent" />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-0">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-1 bg-red-600" />
            <span className="text-[10px] font-black italic tracking-widest text-red-500 uppercase">Pro_Performance</span>
          </div>
          {renderDraggableField('name', <h2 className="text-7xl font-black italic uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xl font-bold text-white/40 uppercase tracking-tight mt-1">{displayData.position}</p>)}
        </div>
        <Zap size={s(48)} className="text-red-600 italic fill-red-600 animate-pulse" />
      </div>

      <div className="grid grid-cols-2 gap-12">
        <div className="bg-white/5 backdrop-blur-md p-6 border-l-4 border-red-600 flex flex-col justify-center">
          {renderDraggableField('goal', <p className="text-xs font-black uppercase italic leading-tight text-white/80">{displayData.goal}</p>)}
        </div>

        <div className="flex flex-col justify-end space-y-2 text-[11px] font-black italic uppercase text-right">
          {renderDraggableField('email', <p className="hover:text-red-500 transition-colors">ADDR // {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="hover:text-red-500 transition-colors">LINK // {displayData.contact}</p>)}
          <div className="pt-2">
            {renderDraggableField('location', <span className="bg-red-600 text-white px-3 py-1">{displayData.location}</span>)}
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

