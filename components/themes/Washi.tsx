import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Washi: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdf9f2] text-[#4d4d4d] relative overflow-hidden border-y-[24px] border-[#e6dcc7]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full justify-between items-start">
                       <div className="space-y-6">
                          <div className="space-y-1">
                             <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-2">TRADITIONAL_MINIMAL</div>
                             {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-[#2d2d2d] leading-none">{displayData.name}</h2>)}
                          </div>
                          {renderDraggableField('position', <p className="text-sm font-medium uppercase tracking-[0.4em] border-b border-slate-200 pb-4 inline-block">{displayData.position}</p>)}
                       </div>
                       <div className="space-y-4 w-full">
                          <div className="max-w-[80%]">
                             {renderDraggableField('goal', <p className="text-xs font-serif italic leading-relaxed opacity-50 border-l-2 border-slate-200 pl-4">"{displayData.goal}"</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
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
