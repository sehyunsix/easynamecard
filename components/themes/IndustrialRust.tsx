// @label: 인더스트리얼 러스트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Settings, Shield } from 'lucide-react';

export const IndustrialRust: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#2a2a2a] text-[#d48d5d] font-mono relative overflow-hidden border-[10px] border-[#3a3a3a]">
    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/rust.png')] pointer-events-none" />
    <div className="absolute top-4 left-4 opacity-10">
      <Settings size={200} className="animate-spin-slow" />
    </div>
    
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-1 bg-[#d48d5d] opacity-50" />
          <span className="text-[10px] font-black tracking-[0.4em] uppercase opacity-40 italic">Heavy_Industrial_v9</span>
        </div>
        {renderDraggableField('name', <h2 className="text-7xl font-black uppercase italic tracking-tighter text-[#e2e2e2] drop-shadow-[0_4px_0_#d48d5d] leading-none">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-lg font-bold bg-[#d48d5d] text-[#1a1a1a] px-4 py-1 inline-block uppercase italic">{displayData.position}</p>)}
      </div>
      
      <div className="grid grid-cols-2 gap-12 text-[10px] font-black uppercase border-t-2 border-[#d48d5d]/20 pt-8">
        <div className="space-y-3">
          {renderDraggableField('email', <p className="flex items-center gap-3"><Shield size={14} /> ADDR: {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-3"><Shield size={14} /> LINK: {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end space-y-2">
          {renderDraggableField('location', <p className="bg-[#1a1a1a] px-3 py-1 border border-[#d48d5d]/30 text-[#d48d5d]">BASE: {displayData.location}</p>)}
          <p className="text-[8px] opacity-20 tracking-widest mt-2 font-sans">Manufactured MMXXV</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

