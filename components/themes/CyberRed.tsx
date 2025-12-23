// @label: 사이버 레드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Zap, AlertTriangle } from 'lucide-react';

export const CyberRed: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0a0000] text-[#ff0000] font-mono relative overflow-hidden border-4 border-[#ff0000]/20">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(rgba(255, 0, 0, 0.2) 1px, transparent 1px)', backgroundSize: '100% 4px' }} />
    <div className="relative z-10 p-10 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="animate-pulse" />
            <span className="text-[10px] font-black tracking-widest italic">SECURITY_BYPASS_ACTIVE</span>
          </div>
          {renderDraggableField('name', <h2 className="text-7xl font-black uppercase italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,0,0,0.8)] leading-none">{displayData.name}</h2>)}
          <div className="bg-[#ff0000] text-black px-4 py-1 inline-block skew-x-[-15deg]">
            {renderDraggableField('position', <p className="text-sm font-black uppercase tracking-widest skew-x-[15deg]">{displayData.position}</p>)}
          </div>
        </div>
        <Zap size={s(48)} fill="currentColor" className="opacity-20" />
      </div>
      <div className="grid grid-cols-2 gap-8 text-[11px] font-bold border-t border-[#ff0000]/30 pt-6">
        <div className="space-y-1">
          {renderDraggableField('email', <p>{`> EML: ${displayData.email.toUpperCase()}`}</p>)}
          {renderDraggableField('contact', <p>{`> TEL: ${displayData.contact}`}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          {renderDraggableField('location', <p>{`LOC: ${displayData.location}`}</p>)}
          <p className="text-[8px] opacity-30 mt-1">CONNECTION_SECURE_2025</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




