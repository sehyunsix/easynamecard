// @label: 코믹 할프톤
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Zap, MessageCircle } from 'lucide-react';

export const ComicHalftone: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#facc15] text-black font-sans relative overflow-hidden border-8 border-black">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'radial-gradient(black 2px, transparent 0)', backgroundSize: '10px 10px' }} />
    <div className="relative z-10 p-8 h-full flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white border-4 border-black p-6 shadow-[10px_10px_0_#000] relative">
          <div className="absolute -top-6 -left-6 bg-red-600 text-white border-4 border-black px-4 py-1 font-black italic text-xl uppercase skew-x-[-15deg] shadow-[4px_4px_0_#000]">
            POW!
          </div>
          {renderDraggableField('name', <h2 className="text-7xl font-black uppercase tracking-tighter italic leading-none mb-2">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xl font-black uppercase bg-black text-white px-3 py-1 inline-block skew-x-[-10deg]">{displayData.position}</p>)}
        </div>
      </div>
      <div className="mt-8 flex justify-between items-end">
        <div className="bg-blue-500 text-white border-4 border-black p-4 shadow-[6px_6px_0_#000] rotate-[-2deg]">
          {renderDraggableField('email', <p className="text-[10px] font-black uppercase break-all">{displayData.email}</p>)}
          {renderDraggableField('contact', <p className="text-[10px] font-black uppercase">{displayData.contact}</p>)}
        </div>
        <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0_#000]">
          <Zap size={32} fill="currentColor" className="text-red-600" />
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




