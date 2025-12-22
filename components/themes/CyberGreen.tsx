// @label: 사이버 그린
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Terminal, Cpu } from 'lucide-react';

export const CyberGreen: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-black text-[#00ff00] font-mono relative overflow-hidden border-2 border-[#00ff00]/30">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px)', backgroundSize: '100% 3px' }} />
    <div className="relative z-10 p-10 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="flex items-center gap-2 opacity-50 text-[10px]">
          <Terminal size={12} />
          <span>AUTHENTICATED_SESSION_v4.2</span>
        </div>
        <div className="border-l-4 border-[#00ff00] pl-6 py-2">
          {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-widest drop-shadow-[0_0_10px_#00ff00] leading-none">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-sm mt-2 opacity-70">{`>> `}{displayData.position.toUpperCase()}</p>)}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-[10px] bg-[#00ff00]/5 p-4 border border-[#00ff00]/20">
        <div className="space-y-1">
          {renderDraggableField('email', <p>ADDR: {displayData.email}</p>)}
          {renderDraggableField('contact', <p>LINK: {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end">
          <Cpu size={s(20)} className="mb-2" />
          {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

