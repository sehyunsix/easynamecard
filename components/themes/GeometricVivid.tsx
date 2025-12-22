import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const GeometricVivid: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white relative overflow-hidden flex h-full">
                    <div className="w-1/2 bg-slate-900 p-10 flex flex-col justify-between text-white relative">
                      <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-gradient-to-br from-pink-500 to-blue-500 pointer-events-none" />
                      <div className="z-10 space-y-2">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-pink-500 mb-2">Portfolio_Core</div>
                        {renderDraggableField('name', <h2 className="text-4xl font-black leading-none uppercase tracking-tighter italic">{displayData.name}</h2>)}
                      </div>
                      <div className="z-10 w-12 h-12 border-2 border-white rotate-45 flex items-center justify-center opacity-40">
                        <Target size={24} className="-rotate-45" />
                      </div>
                    </div>
                    <div className="flex-1 p-12 flex flex-col justify-between bg-slate-50 relative border-l-4 border-black">
                      <div className="space-y-6">
                        {renderDraggableField('position', <p className="text-lg font-black uppercase tracking-[0.2em] text-slate-900 italic border-b-4 border-pink-500 pb-2 inline-block">{displayData.position}</p>)}
                        {renderDraggableField('goal', <p className="text-xs text-slate-500 leading-relaxed font-bold italic opacity-70">"Target: {displayData.goal}"</p>)}
                      </div>
                      <div className="space-y-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {renderDraggableField('email', <p className="hover:text-pink-500 transition-colors">{displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-blue-500 transition-colors">{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
