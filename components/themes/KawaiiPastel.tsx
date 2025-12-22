// @label: 카와이 파스텔
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Heart, Star } from 'lucide-react';

export const KawaiiPastel: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#ffdee9] text-[#ff7eb3] font-sans relative overflow-hidden border-[8px] border-white">
    <div className="absolute top-[-10%] left-[-5%] opacity-40 animate-bounce-slow">
      <Star size={100} fill="currentColor" className="text-white" />
    </div>
    <div className="absolute bottom-[-10%] right-[-5%] opacity-40 animate-bounce-slow" style={{ animationDelay: '1s' }}>
      <Heart size={120} fill="currentColor" className="text-white" />
    </div>

    <div className="relative z-10 p-12 flex flex-col items-center justify-center text-center h-full space-y-8">
      <div className="bg-white/80 backdrop-blur-sm p-10 rounded-[50px] shadow-[0_15px_30px_rgba(255,126,179,0.2)] border-4 border-white">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
          <Star size={16} fill="currentColor" />
        </div>
        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tight uppercase mb-1 drop-shadow-sm">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-sm font-bold bg-[#ff7eb3] text-white px-4 py-1 rounded-full inline-block mt-2 tracking-widest">{displayData.position}</p>)}
      </div>

      <div className="space-y-2 text-[11px] font-black uppercase tracking-widest text-[#ff7eb3]/80">
        <div className="flex items-center justify-center gap-4">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Heart size={12} fill="currentColor" /> {displayData.email}</p>)}
          <div className="w-2 h-2 rounded-full bg-white" />
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Heart size={12} fill="currentColor" /> {displayData.contact}</p>)}
        </div>
        {renderDraggableField('location', <p className="mt-2 text-[#ff7eb3]/50 italic">{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

