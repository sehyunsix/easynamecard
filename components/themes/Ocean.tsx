import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Ocean: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-gradient-to-br from-[#004e92] to-[#000428] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                       <div className="space-y-6">
                          <div className="border-l-[6px] border-cyan-400 pl-8">
                             {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter leading-none italic uppercase">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-xs font-bold text-cyan-400 mt-2 uppercase tracking-[0.4em]">{displayData.position}</p>)}
                          </div>
                       </div>
                       <div className="w-full space-y-8">
                          <div className="max-w-[70%]">
                             {renderDraggableField('goal', <p className="text-sm font-medium leading-relaxed text-slate-300 italic underline decoration-cyan-400/30 underline-offset-8">"{displayData.goal}"</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p className="flex items-center gap-2"><div className="w-3 h-px bg-cyan-400" /> {displayData.email}</p>)}
                                {renderDraggableField('contact', <p className="flex items-center gap-2"><div className="w-3 h-px bg-cyan-400" /> {displayData.contact}</p>)}
                             </div>
                             <div className="text-right flex flex-col items-end">
                                <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center mb-2">
                                  <Target size={20} className="text-cyan-400" />
                                </div>
                                {renderDraggableField('location', <p>{displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
