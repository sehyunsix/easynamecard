// @label: 피치 킨
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Heart, Sparkles } from 'lucide-react';

export const PeachyKeen: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#fff5f0] text-[#fb923c] font-sans relative overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-[#ffedd5] rounded-full blur-3xl opacity-60" />
    <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-[#ffedd5] rounded-full blur-3xl opacity-60" />
    <div className="relative z-10 p-16 flex h-full">
      <div className="w-[15%] h-full flex flex-col items-center">
        <div className="w-[2px] h-full bg-orange-200 relative">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-2xl bg-white border-2 border-orange-100 flex items-center justify-center rotate-45">
            <Heart size={20} className="-rotate-45 fill-[#fb923c]" />
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between pl-12">
        <div className="space-y-4">
          <div className="space-y-1">
            {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter text-[#7c2d12]">{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-xs font-bold text-[#ea580c] uppercase tracking-[0.4em] italic pl-1">{displayData.position}</p>)}
          </div>
          <div className="w-16 h-1.5 bg-[#fb923c] rounded-full opacity-30" />
        </div>
        <div className="flex justify-between items-end">
          <div className="space-y-2 text-[11px] font-bold tracking-tight text-[#9a3412]/70">
            {renderDraggableField('email', <p className="hover:text-[#ea580c] transition-colors">{displayData.email}</p>)}
            {renderDraggableField('contact', <p className="hover:text-[#ea580c] transition-colors">{displayData.contact}</p>)}
            {renderDraggableField('location', <p className="text-[#fb923c]/40">{displayData.location}</p>)}
          </div>
          <Sparkles size={s(32)} className="text-orange-200" fill="currentColor" />
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




