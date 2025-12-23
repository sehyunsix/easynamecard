// @label: 소프트 파스텔
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Cloud, Heart } from 'lucide-react';

export const SoftPastel: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#fdf2f8] text-[#9d174d] font-sans relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#fce7f3] rounded-full blur-3xl opacity-60" />
    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-[#fdf2f8] rounded-full blur-3xl opacity-60" />
    <div className="relative z-10 p-12 flex flex-col items-center justify-center text-center h-full space-y-6">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#ec4899]">
        <Cloud size={32} fill="currentColor" />
      </div>
      <div className="space-y-1">
        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tight text-[#831843]">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-bold text-[#be185d] uppercase tracking-[0.3em]">{displayData.position}</p>)}
      </div>
      <div className="w-12 h-1 bg-[#fbcfe8] rounded-full" />
      <div className="space-y-2 text-[11px] font-medium text-[#9d174d]/70">
        {renderDraggableField('email', <p>{displayData.email}</p>)}
        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        {renderDraggableField('location', <p className="flex items-center justify-center gap-2"><Heart size={10} fill="currentColor" /> {displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




