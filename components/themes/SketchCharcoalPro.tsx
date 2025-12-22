import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const SketchCharcoalPro: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2c2c2c] text-[#eee] font-sketch relative overflow-hidden flex flex-col justify-between shadow-2xl border-[1px] border-white/10">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="relative inline-block">
                        <div className="absolute -bottom-2 -left-2 w-full h-6 bg-white/5 -rotate-1" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter text-white leading-none rotate-[-1deg] drop-shadow-lg">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-2xl font-bold text-slate-400 rotate-[1deg] mt-6 italic opacity-80 underline decoration-white/10 underline-offset-8">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div className="space-y-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic">
                        {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                        {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                      </div>
                      <div className="text-right">
                        <Target size={64} strokeWidth={1} className="opacity-10 text-white" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
