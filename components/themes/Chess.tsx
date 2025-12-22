import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Chess: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white text-slate-900 font-serif relative overflow-hidden flex h-full">
                    <div className="w-1/3 bg-slate-900 p-8 flex flex-col justify-between text-white">
                       <div className="grid grid-cols-2 gap-1 opacity-20">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="aspect-square border border-white/10" style={{ backgroundColor: i % 3 === 0 ? 'white' : 'transparent' }} />
                          ))}
                       </div>
                       <div className="space-y-2">
                          <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-40">Grandmaster</div>
                          {renderDraggableField('name', <h2 className="text-3xl font-black leading-none uppercase tracking-tighter">{displayData.name}</h2>)}
                       </div>
                    </div>
                    <div className="flex-1 p-12 flex flex-col justify-between bg-slate-50">
                       <div className="space-y-4">
                          {renderDraggableField('position', <p className="text-lg font-bold uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 inline-block">{displayData.position}</p>)}
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-relaxed">Strategy: {displayData.goal}</p>)}
                       </div>
                       <div className="space-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {renderDraggableField('email', <p className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-900" /> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-300" /> {displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
