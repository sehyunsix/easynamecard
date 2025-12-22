import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const VintageTypewriterInk: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f2f1ef] text-[#2c3e50] font-serif relative overflow-hidden shadow-inner border-[1px] border-slate-200">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="h-full border border-slate-200 p-10 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none opacity-90 italic underline decoration-slate-900/10 underline-offset-8">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-lg font-bold text-slate-400 mt-4">{displayData.position}</p>)}
                        </div>
                        <div className="w-full h-px bg-slate-200" />
                        {renderDraggableField('goal', <p className="text-sm leading-relaxed opacity-60 max-w-[90%]">"{displayData.goal}"</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[11px] font-bold opacity-40 uppercase tracking-widest italic">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <Target size={32} strokeWidth={1} className="mb-2" />
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
