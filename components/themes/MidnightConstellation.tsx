import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MidnightConstellation: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#050510] text-white relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl border-[1px] border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-purple-900/30 pointer-events-none" />
                    <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="relative">
                        <div className="absolute inset-[-40px] bg-blue-500/10 blur-3xl rounded-full animate-pulse" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-[0.3em] relative text-white leading-none drop-shadow-[0_0_20px_#0074d9] italic">{displayData.name}</h2>)}
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('position', <p className="text-sm font-bold text-blue-300 uppercase tracking-[0.8em] italic opacity-80">{displayData.position}</p>)}
                        <div className="h-px w-48 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto opacity-30 mt-8" />
                      </div>
                      <div className="pt-12 flex gap-12 text-[10px] font-bold text-slate-500 uppercase tracking-widest italic">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
