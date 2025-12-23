import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const ModernBauhaus: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f0ede5] text-black font-sans relative overflow-hidden border-[16px] border-black">
    <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-red-600 border-l-[8px] border-b-[8px] border-black" />
    <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-yellow-400 border-r-[8px] border-t-[8px] border-black" />
    <div className="absolute bottom-[10%] right-[10%] w-24 h-24 rounded-full bg-blue-600 border-[8px] border-black" />

    <div className="relative z-10 p-12 flex flex-col h-full justify-between">
      <div className="space-y-0">
        {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">{displayData.name}</h2>)}
        <div className="inline-block bg-black text-white px-6 py-2">
          {renderDraggableField('position', <p className="text-2xl font-black uppercase tracking-widest">{displayData.position}</p>)}
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="space-y-1 text-sm font-black uppercase tracking-tight">
          {renderDraggableField('email', <p className="border-b-4 border-black inline-block mb-1">{displayData.email}</p>)}
          <br/>
          {renderDraggableField('contact', <p className="border-b-4 border-black inline-block">{displayData.contact}</p>)}
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] mb-1">Germany 1919</p>
          {renderDraggableField('location', <p className="text-xs font-black uppercase">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




