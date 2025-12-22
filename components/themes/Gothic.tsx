import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Gothic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center border-[20px] border-double border-white/10">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="w-16 h-16 border-2 border-white/20 rotate-45 flex items-center justify-center mx-auto opacity-40 shadow-2xl">
                          <div className="text-3xl -rotate-45 font-serif italic">G</div>
                       </div>
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-widest uppercase italic border-b-2 border-white/10 pb-4 leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.8em] text-slate-500 mt-4">{displayData.position}</p>)}
                       </div>
                       <div className="pt-12 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
