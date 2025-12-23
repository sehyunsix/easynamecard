// @label: 베이퍼웨이브
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Palmtree, Waves } from 'lucide-react';

export const Vaporwave: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#ff71ce] text-[#01cdfe] font-sans relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-[#05ffa1]/20 to-[#b967ff]/20" />
    <div className="absolute bottom-0 left-0 w-full h-32 opacity-30 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(transparent 50%, #01cdfe 50%)', backgroundSize: '100% 4px' }} />
    <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-[#fffb96] rounded-full blur-3xl opacity-40" />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          {renderDraggableField('name', <h2 className="text-7xl font-black italic uppercase tracking-tighter text-white drop-shadow-[4px_4px_0_#ff71ce]">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xl font-bold bg-[#fffb96] text-[#ff71ce] px-4 py-1 inline-block uppercase italic">{displayData.position}</p>)}
        </div>
        <Palmtree size={s(48)} className="text-[#05ffa1] drop-shadow-[0_0_10px_#05ffa1]" />
      </div>
      <div className="flex justify-between items-end">
        <div className="bg-white/10 backdrop-blur-md p-6 border-2 border-white/20 rounded-2xl space-y-1 text-xs font-black uppercase italic text-white tracking-widest">
          {renderDraggableField('email', <p className="flex items-center gap-2"><Waves size={14} /> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="flex items-center gap-2"><Waves size={14} /> {displayData.contact}</p>)}
        </div>
        <div className="text-right">
          {renderDraggableField('location', <p className="text-sm font-black uppercase text-[#fffb96] drop-shadow-md">{displayData.location}</p>)}
          <p className="text-[10px] text-white/40 mt-1 uppercase tracking-[0.5em]">AESTHETIC_2025</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




