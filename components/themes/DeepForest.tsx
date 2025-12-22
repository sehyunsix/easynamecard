// @label: 딥 포레스트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Trees, Mountain } from 'lucide-react';

export const DeepForest: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0a1a0a] text-[#d4d4d8] font-serif relative overflow-hidden border-[15px] border-[#1a2e1a]">
    <div className="absolute inset-0 opacity-20 pointer-events-none" 
         style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/dark-wood.png")' }} />
    <div className="absolute bottom-[-10%] right-[-10%] opacity-10 text-emerald-900">
      <Trees size={400} />
    </div>
    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <div className="bg-[#1a2e1a] px-6 py-4 border-l-8 border-emerald-600">
            {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tight text-white">{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-sm font-bold text-emerald-500 uppercase tracking-[0.3em] mt-1">{displayData.position}</p>)}
          </div>
        </div>
        <Mountain size={s(40)} className="text-[#1a2e1a]" fill="currentColor" />
      </div>
      <div className="grid grid-cols-2 gap-8 text-[11px] font-bold tracking-wide border-t border-emerald-900/50 pt-8">
        <div className="space-y-2">
          {renderDraggableField('email', <p className="hover:text-emerald-400 transition-colors">>> {displayData.email}</p>)}
          {renderDraggableField('contact', <p className="hover:text-emerald-400 transition-colors">>> {displayData.contact}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end space-y-2">
          {renderDraggableField('location', <p className="italic opacity-60">{displayData.location}</p>)}
          <p className="text-[9px] font-black uppercase tracking-[0.5em] text-emerald-900">Est. MMXXV</p>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

