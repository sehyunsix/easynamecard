// @label: 앱스트랙트 웨이브
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Waves } from 'lucide-react';

export const AbstractWave: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-white text-slate-800 font-sans relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none overflow-hidden">
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 animate-spin-slow blur-3xl" />
    </div>
    <div className="relative z-10 p-16 flex flex-col justify-between h-full">
      <div className="space-y-1">
        <div className="flex items-center gap-3 mb-4">
          <Waves size={s(24)} className="text-indigo-500" />
          <div className="h-[1px] flex-1 bg-slate-200" />
        </div>
        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest pl-1">{displayData.position}</p>)}
      </div>
      <div className="space-y-6 pt-12 border-t border-slate-100">
        <div className="grid grid-cols-2 gap-4 text-[11px] font-bold text-slate-500 uppercase tracking-tight">
          <div className="space-y-1">
            {renderDraggableField('email', <p className="hover:text-indigo-600 transition-colors">{displayData.email}</p>)}
            {renderDraggableField('contact', <p className="hover:text-indigo-600 transition-colors">{displayData.contact}</p>)}
          </div>
          <div className="text-right flex flex-col justify-end">
            {renderDraggableField('location', <p className="italic">{displayData.location}</p>)}
          </div>
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

