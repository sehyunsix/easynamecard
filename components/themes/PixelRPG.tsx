// @label: 픽셀 RPG
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sword, Shield } from 'lucide-react';

export const PixelRPG: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#202020] text-white font-mono relative overflow-hidden border-[8px] border-[#404040]">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pixel-weave.png')] opacity-10 pointer-events-none" />
    
    <div className="relative z-10 p-8 flex flex-col h-full uppercase tracking-tighter">
      <div className="flex justify-between items-start mb-8 border-b-4 border-[#404040] pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-yellow-400 text-[10px] font-black italic">
            <Sword size={12} />
            <span>LVL. 99 PROFILE</span>
          </div>
          {renderDraggableField('name', <h2 className="text-5xl font-black bg-[#404040] px-4 py-1 border-2 border-[#606060]">{displayData.name}</h2>)}
        </div>
        <div className="w-16 h-16 bg-[#404040] border-4 border-[#606060] flex items-center justify-center text-red-500 shadow-[4px_4px_0_#000]">
          <Heart size={32} fill="currentColor" />
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        <div className="bg-[#101010] border-4 border-[#404040] p-4 relative">
          <div className="absolute -top-3 left-4 bg-[#202020] px-2 text-[10px] font-black text-yellow-400 border-2 border-[#404040]">CLASS_INFO</div>
          {renderDraggableField('position', <p className="text-xl font-black text-blue-400">{displayData.position}</p>)}
        </div>
        
        <div className="bg-[#101010] border-4 border-[#404040] p-4 relative">
          <div className="absolute -top-3 left-4 bg-[#202020] px-2 text-[10px] font-black text-yellow-400 border-2 border-[#404040]">CONTACT_DATA</div>
          <div className="grid grid-cols-1 gap-1 text-[11px] font-bold">
            {renderDraggableField('email', <p className="flex items-center gap-3"><span className="text-red-500">@</span> {displayData.email}</p>)}
            {renderDraggableField('contact', <p className="flex items-center gap-2"><Shield size={12} className="text-blue-500" fill="currentColor" /> {displayData.contact}</p>)}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 bg-yellow-400 border-2 border-black" />)}
        </div>
        {renderDraggableField('location', <p className="text-[10px] font-black bg-[#404040] px-2 border-2 border-[#606060]">{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

