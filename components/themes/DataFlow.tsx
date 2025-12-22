import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Cpu, Network } from 'lucide-react';

export const DataFlow: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#001529] text-[#4dd0e1] font-mono relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(90deg, #4dd0e1 1px, transparent 1px), linear-gradient(#4dd0e1 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="absolute top-[10%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4dd0e1]/50 to-transparent" />
      <div className="absolute bottom-[10%] left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4dd0e1]/50 to-transparent" />
      <div className="absolute top-0 left-[20%] w-px h-full bg-gradient-to-b from-transparent via-[#4dd0e1]/50 to-transparent" />
    </div>

    <div className="relative z-10 p-12 flex flex-col justify-between h-full border border-[#4dd0e1]/30 m-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 mb-2 opacity-50">
            <Cpu size={s(14)} />
            <span className="text-[8px] tracking-[0.3em]">CORE_PROCESSOR_CONNECTED</span>
          </div>
          {renderDraggableField('name', <h2 className="text-6xl font-bold tracking-widest uppercase text-white drop-shadow-[0_0_8px_#4dd0e1]">{displayData.name}</h2>)}
          <div className="mt-4 flex items-center gap-4">
            <div className="px-3 py-1 border border-[#4dd0e1] rounded-sm bg-[#4dd0e1]/10">
              {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-widest">RANK: {displayData.position}</p>)}
            </div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <div key={i} className="w-1.5 h-1.5 bg-[#4dd0e1]/50" />)}
            </div>
          </div>
        </div>
        <Network size={s(48)} className="text-[#4dd0e1]/20" />
      </div>

      <div className="grid grid-cols-2 gap-8 text-[10px] font-bold bg-black/40 p-6 rounded-lg border border-[#4dd0e1]/20">
        <div className="space-y-2">
          {renderDraggableField('email', <p className="flex items-center gap-2"><span className="text-white/40">ID:</span> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><span className="text-white/40">CH:</span> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end space-y-1">
          {renderDraggableField('location', <p className="opacity-60">{`NODE_${displayData.location.toUpperCase()}`}</p>)}
          <p className="text-[8px] text-[#4dd0e1]/30">ENCRYPTED_STREAM_ACTIVE</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

