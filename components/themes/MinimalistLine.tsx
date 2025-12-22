// @label: 미니멀리스트 라인
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { PenTool } from 'lucide-react';

export const MinimalistLine: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-white text-slate-800 font-sans relative overflow-hidden">
    <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 504 288">
      <path d="M0,144 Q126,10 252,144 T504,144" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
    <div className="relative z-10 p-16 flex flex-col justify-between h-full">
      <div className="flex flex-col items-center text-center space-y-4">
        <PenTool size={s(24)} className="text-slate-300" />
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-5xl font-light tracking-[0.2em] uppercase text-slate-900">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.6em] italic">{displayData.position}</p>)}
        </div>
      </div>
      <div className="flex justify-between items-end text-[9px] font-medium tracking-[0.3em] uppercase text-slate-400">
        <div className="flex gap-8">
          {renderDraggableField('email', <p>{displayData.email}</p>)}
          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        </div>
        {renderDraggableField('location', <p>{displayData.location}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

