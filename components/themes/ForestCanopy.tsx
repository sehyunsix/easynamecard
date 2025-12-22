import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const ForestCanopy: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#1b2b1b] text-[#d4edda] relative overflow-hidden shadow-inner border-[1px] border-white/5">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 opacity-10 rotate-[-15deg]"><Target size={300} strokeWidth={1} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="text-[8px] font-bold uppercase tracking-[0.6em] text-emerald-400 opacity-60">Professional Forest</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none">{displayData.name}</h2>)}
                        </div>
                        <div className="w-24 h-1 bg-emerald-500/30 rounded-full" />
                        {renderDraggableField('position', <p className="text-sm font-medium uppercase tracking-[0.4em] text-emerald-100/60 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-10">
                        <div className="max-w-[80%]">
                          {renderDraggableField('goal', <p className="text-xs font-serif italic leading-relaxed opacity-40">"{displayData.goal}"</p>)}
                        </div>
                        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-emerald-100/40">
                          <div className="space-y-1">
                            {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                            {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                          </div>
                          {renderDraggableField('location', <p className="text-[8px]">{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
