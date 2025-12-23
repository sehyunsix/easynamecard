import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Terminal } from 'lucide-react';

export const Terminal80s: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0c0c0c] text-[#33ff33] font-mono relative overflow-hidden border-4 border-[#1a1a1a] shadow-inner">
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '2px 2px' }} />
    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-black/10 to-transparent"
         style={{ backgroundSize: '100% 4px', backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))' }} />

    <div className="relative z-10 p-10 flex flex-col h-full uppercase tracking-wider">
      <div className="flex items-center gap-3 border-b-2 border-[#33ff33]/30 pb-4 mb-8">
        <Terminal size={s(24)} className="animate-pulse" />
        <span className="text-sm font-black">SYSTEM_USER_PROFILE_EXTRACT_v1.0</span>
      </div>

      <div className="space-y-6 flex-1">
        <div className="space-y-1">
          <p className="text-[10px] opacity-50 font-bold">{`> USER_IDENTIFIER:`}</p>
          {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-widest bg-[#33ff33] text-black px-4 inline-block">{displayData.name}</h2>)}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] opacity-50 font-bold">{`> ASSIGNED_ROLE:`}</p>
          {renderDraggableField('position', <p className="text-xl font-bold border-2 border-[#33ff33] px-3 py-1 inline-block">{displayData.position}</p>)}
        </div>

        <div className="space-y-1">
          <p className="text-[10px] opacity-50 font-bold">{`> MISSION_STATEMENT:`}</p>
          {renderDraggableField('goal', <p className="text-xs font-bold leading-relaxed lowercase">-- {displayData.goal}</p>)}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 text-[10px] font-black border-t-2 border-[#33ff33]/30 pt-6">
        <div className="space-y-1">
          {renderDraggableField('email', <p>{`EMAIL: ${displayData.email}`}</p>)}
          {renderDraggableField('contact', <p>{`PHONE: ${displayData.contact}`}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end">
          {renderDraggableField('location', <p>{`LOCATION: ${displayData.location}`}</p>)}
          <p className="text-[#33ff33]/30 animate-pulse mt-1">_CURSOR_BLINKING...</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




