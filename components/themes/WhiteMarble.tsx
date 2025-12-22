import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Crown } from 'lucide-react';

export const WhiteMarble: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-white text-slate-800 font-sans relative overflow-hidden">
    <div className="absolute inset-0 opacity-40 pointer-events-none"
         style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/marble.png')", backgroundSize: 'cover' }} />

    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
    </div>

    <div className="relative z-10 p-16 flex flex-col items-center justify-between h-full border-[1px] border-slate-100 m-4">
      <div className="flex flex-col items-center text-center space-y-6">
        <Crown size={s(24)} className="text-slate-300" />
        <div className="space-y-2">
          {renderDraggableField('name', <h2 className="text-5xl font-serif font-light tracking-[0.2em] uppercase text-slate-900">{displayData.name}</h2>)}
          <div className="h-px w-24 bg-slate-200 mx-auto" />
          {renderDraggableField('position', <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">{displayData.position}</p>)}
        </div>
      </div>

      <div className="w-full grid grid-cols-3 gap-4 pt-12 border-t border-slate-50 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
        <div className="text-center">
          <p className="mb-1 text-slate-300">Message</p>
          {renderDraggableField('email', <p className="text-slate-600 break-all">{displayData.email}</p>)}
        </div>
        <div className="text-center">
          <p className="mb-1 text-slate-300">Contact</p>
          {renderDraggableField('contact', <p className="text-slate-600">{displayData.contact}</p>)}
        </div>
        <div className="text-center">
          <p className="mb-1 text-slate-300">Base</p>
          {renderDraggableField('location', <p className="text-slate-600">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

