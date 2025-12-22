import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Sketchbook: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden shadow-2xl font-sketch">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-4 bg-slate-200 opacity-20" />
                    <div className="h-full flex flex-col justify-between">
                       <div className="space-y-6">
                          <div className="relative inline-block">
                             {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none relative z-10">{displayData.name}</h2>)}
                             <div className="absolute -bottom-2 -left-2 w-full h-4 bg-yellow-200/50 -rotate-1 z-0" />
                          </div>
                          {renderDraggableField('position', <p className="text-xl font-bold text-slate-400 -rotate-1 italic">{displayData.position}</p>)}
                          <div className="pt-4">
                             {renderDraggableField('goal', <p className="text-sm border-l-4 border-slate-200 pl-4 italic opacity-70 leading-relaxed">{displayData.goal}</p>)}
                          </div>
                       </div>
                       <div className="flex justify-between items-end text-xs font-bold text-slate-400">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                             {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                          </div>
                          <div className="text-right">
                             <Target size={48} strokeWidth={1} className="opacity-10" />
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
