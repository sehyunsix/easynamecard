import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CharcoalSketch: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#333] text-[#eee] font-sketch relative overflow-hidden flex flex-col justify-between shadow-2xl border-[1px] border-white/5">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter text-white leading-none rotate-[-1deg]">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xl font-bold text-slate-400 rotate-[1deg] mt-4 italic">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-4">
                      <div className="w-16 h-px bg-white/20" />
                      <div className="space-y-1 text-xs font-bold text-slate-500 uppercase tracking-widest italic">
                        {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                        {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
