import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const PastelDreams: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-blue-100/40 to-yellow-100/40 pointer-events-none animate-pulse" />
                    <div className="z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[60px] border border-white/60 shadow-2xl space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tighter text-slate-800 leading-none italic">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-4 justify-center pt-8">
                        <div className="w-2 h-2 rounded-full bg-pink-200" />
                        <div className="w-2 h-2 rounded-full bg-blue-200" />
                        <div className="w-2 h-2 rounded-full bg-yellow-200" />
                      </div>
                      <div className="pt-8 space-y-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
