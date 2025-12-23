// @label: 모던 브루탈리스트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Square } from 'lucide-react';

export const ModernBrutalist: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f0f0f0] text-black font-sans relative overflow-hidden border-[12px] border-black">
    <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
    <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-red-600 rotate-12 -z-0" />
    <div className="absolute bottom-[-5%] left-[20%] w-48 h-12 bg-blue-600 -rotate-6 -z-0" />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="space-y-0">
        {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.75] mb-6">{displayData.name}</h2>)}
        <div className="inline-block bg-black text-white px-8 py-3">
          {renderDraggableField('position', <p className="text-2xl font-black uppercase tracking-widest italic">{displayData.position}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div className="space-y-1 text-sm font-black uppercase tracking-tighter">
          {renderDraggableField('email', <p className="bg-white border-2 border-black px-3 py-1 mb-2 inline-block shadow-[4px_4px_0_#000]">{displayData.email}</p>)}
          <br/>
          {renderDraggableField('contact', <p className="bg-white border-2 border-black px-3 py-1 inline-block shadow-[4px_4px_0_#000]">{displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col items-end">
          <Square size={s(32)} fill="currentColor" className="mb-4" />
          {renderDraggableField('location', <p className="text-xs font-black uppercase border-b-4 border-black inline-block">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




