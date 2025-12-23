// @label: 옛날 신문
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Newspaper } from 'lucide-react';

export const OldNewspaper: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#f4f1ea] text-[#2d2a26] font-serif relative overflow-hidden shadow-inner border-[1px] border-[#dcd9d0]">
    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
    <div className="relative z-10 p-10 flex flex-col h-full border-x-2 border-[#2d2a26]/10 m-4">
      <div className="border-b-4 border-[#2d2a26] pb-4 mb-6 flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest mb-1">Vol. CXXV No. 36,452</span>
          {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
        </div>
        <div className="text-right flex flex-col items-end">
          <Newspaper size={s(24)} className="mb-2" />
          <span className="text-[9px] font-bold uppercase tracking-widest italic">Since 1895</span>
        </div>
      </div>
      <div className="flex-1 grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="border-b border-[#2d2a26]/20 pb-4">
            {renderDraggableField('position', <p className="text-xl font-bold italic tracking-tight leading-tight">{displayData.position}</p>)}
          </div>
          {renderDraggableField('goal', <p className="text-xs leading-relaxed text-justify font-medium">{displayData.goal}</p>)}
        </div>
        <div className="col-span-1 border-l border-[#2d2a26]/20 pl-6 space-y-6 text-[10px] font-black uppercase italic tracking-tight">
          <div className="space-y-3">
            <div>
              <p className="text-[8px] opacity-40 mb-1">Communication</p>
              {renderDraggableField('email', <p className="break-all">{displayData.email}</p>)}
            </div>
            <div>
              <p className="text-[8px] opacity-40 mb-1">Direct Line</p>
              {renderDraggableField('contact', <p>{displayData.contact}</p>)}
            </div>
            <div>
              <p className="text-[8px] opacity-40 mb-1">Headquarters</p>
              {renderDraggableField('location', <p>{displayData.location}</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




