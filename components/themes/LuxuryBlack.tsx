// @label: 럭셔리 블랙
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Shield, Star } from 'lucide-react';

export const LuxuryBlack: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#111111] text-[#e5e7eb] font-serif relative overflow-hidden border-[1px] border-[#374151]">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#9ca3af] to-transparent" />
    <div className="relative z-10 p-16 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          {renderDraggableField('name', <h2 className="text-6xl font-light tracking-[0.1em] uppercase drop-shadow-lg">{displayData.name}</h2>)}
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-[#4b5563]" />
            {renderDraggableField('position', <p className="text-xs font-bold text-[#9ca3af] uppercase tracking-[0.4em] italic">{displayData.position}</p>)}
          </div>
        </div>
        <Shield size={s(32)} className="text-[#374151]" />
      </div>
      <div className="grid grid-cols-2 gap-8 pt-12 border-t border-[#1f2937]">
        <div className="space-y-1.5 text-[10px] font-medium tracking-widest uppercase text-[#9ca3af]">
          {renderDraggableField('email', <p className="hover:text-white transition-colors">{displayData.email}</p>)}
          {renderDraggableField('contact', <p className="hover:text-white transition-colors">{displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end space-y-2">
          <div className="flex gap-1">
            <Star size={8} fill="currentColor" className="text-[#374151]" />
            <Star size={8} fill="currentColor" className="text-[#374151]" />
            <Star size={8} fill="currentColor" className="text-[#374151]" />
          </div>
          {renderDraggableField('location', <p className="text-[9px] font-bold text-[#4b5563] tracking-[0.5em]">{displayData.location.toUpperCase()}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

