import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Note: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-yellow-100/50 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-10 bg-slate-100 flex items-center px-12 border-b border-slate-200 opacity-50">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="mt-8 relative z-10 font-sketch">
                      <div className="absolute -left-4 top-0 w-1 h-full bg-red-400 opacity-30" />
                      <div className="space-y-6">
                        <div>
                          {renderDraggableField('name', <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-none rotate-[-1deg]">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-lg font-bold text-blue-600 rotate-[1deg] mt-2 italic underline decoration-blue-200 underline-offset-4">{displayData.position}</p>)}
                        </div>
                        <div className="space-y-3 pt-4 text-slate-600 font-bold">
                          {renderDraggableField('goal', <p className="text-sm leading-relaxed max-w-[80%] opacity-80 italic">- {displayData.goal}</p>)}
                          <div className="space-y-1 text-xs">
                             {renderDraggableField('email', <p className="flex items-center gap-2">@ {displayData.email}</p>)}
                             {renderDraggableField('contact', <p className="flex items-center gap-2"># {displayData.contact}</p>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-8 right-10 opacity-10 pointer-events-none">
                      <Target size={120} strokeWidth={1} className="text-slate-900" />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
