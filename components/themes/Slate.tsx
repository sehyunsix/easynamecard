import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Slate: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#263238] text-slate-100 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl border-y-[1px] border-white/5">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                       <div className="space-y-4">
                          <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-[0.2em] uppercase leading-none">{displayData.name}</h2>)}
                          <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                       </div>
                       {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.6em] text-slate-500 italic">{displayData.position}</p>)}
                       <div className="pt-12 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
