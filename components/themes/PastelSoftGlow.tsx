import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const PastelSoftGlow: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-blue-50/50 to-emerald-50/50 pointer-events-none animate-pulse" />
                    <div className="z-10 bg-white/60 backdrop-blur-2xl p-14 rounded-[80px] border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)] space-y-6">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-slate-800 leading-none italic">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.4em] mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-6 justify-center pt-8 opacity-40">
                        <div className="w-2 h-2 rounded-full bg-pink-300" />
                        <div className="w-2 h-2 rounded-full bg-blue-300" />
                        <div className="w-2 h-2 rounded-full bg-emerald-300" />
                      </div>
                      <div className="pt-8 space-y-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
