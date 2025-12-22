import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Typewriter: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f2f1ef] text-[#2c3e50] relative overflow-hidden shadow-inner font-serif">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="h-full border-2 border-slate-200 p-10 flex flex-col justify-between">
                       <div className="space-y-6">
                          <div className="space-y-1">
                             {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter opacity-90">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-lg italic text-slate-400 mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="w-full h-px bg-slate-200" />
                          {renderDraggableField('goal', <p className="text-sm leading-relaxed opacity-60 max-w-[90%]">"{displayData.goal}"</p>)}
                       </div>
                       <div className="flex justify-between items-end text-[11px] font-bold opacity-40 uppercase tracking-widest">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>{displayData.email}</p>)}
                             {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="text-right">
                             <p>Serial: #2025-1221</p>
                             {renderDraggableField('location', <p>{displayData.location}</p>)}
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
