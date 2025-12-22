import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const EcoFriendly: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfdf7] text-[#2d4a22] relative overflow-hidden shadow-inner border-[1px] border-slate-200">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="absolute bottom-[-50px] right-[-50px] opacity-10 rotate-[-15deg] pointer-events-none text-emerald-900"><Target size={300} strokeWidth={0.5} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="text-[8px] font-bold uppercase tracking-[0.5em] text-emerald-600/60 mb-2 italic">100% SUSTAINABLE_CRAFT</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950 leading-none">{displayData.name}</h2>)}
                        </div>
                        <div className="w-16 h-1 bg-emerald-500/20 rounded-full" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-emerald-800/40">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-10 w-full">
                        <div className="max-w-[80%]">
                          {renderDraggableField('goal', <p className="text-xs font-serif italic leading-relaxed opacity-40">"{displayData.goal}"</p>)}
                        </div>
                        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-emerald-900/30">
                          <div className="space-y-1">
                            {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                            {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                          </div>
                          <div className="text-right">
                             {renderDraggableField('location', <p>{displayData.location}</p>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
