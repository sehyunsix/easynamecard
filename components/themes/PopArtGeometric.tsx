// @label: 팝아트 지오메트릭
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Circle, Square, Triangle } from 'lucide-react';

export const PopArtGeometric: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#ffffff] text-black font-black relative overflow-hidden border-[16px] border-black">
    <div className="absolute top-0 right-0 w-48 h-full bg-yellow-400 border-l-8 border-black -z-0" />
    <div className="absolute bottom-0 left-0 w-full h-24 bg-red-600 border-t-8 border-black -z-0" />
    <div className="absolute top-[10%] left-[5%] opacity-10">
      <Circle size={200} fill="currentColor" className="text-blue-600" />
    </div>
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-4">
        <div className="bg-blue-600 text-white border-8 border-black inline-block p-6 shadow-[12px_12px_0_#000] rotate-[-2deg]">
          {renderDraggableField('name', <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
        </div>
        <br/>
        <div className="bg-white border-4 border-black inline-block px-4 py-1 rotate-[3deg] shadow-[6px_6px_0_#000] ml-8">
          {renderDraggableField('position', <p className="text-xl font-black uppercase tracking-widest italic">{displayData.position}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1 text-sm font-black uppercase tracking-tight bg-white border-4 border-black p-4 shadow-[8px_8px_0_#000]">
          {renderDraggableField('email', <p>{displayData.email}</p>)}
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        </div>
        <div className="flex gap-4 mb-4 mr-12">
          <Triangle size={32} fill="currentColor" className="text-red-600 rotate-12" />
          <Square size={32} fill="currentColor" className="text-yellow-400 -rotate-12" />
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




