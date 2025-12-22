import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Nebula: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 pointer-events-none animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="relative">
                          <div className="absolute inset-[-20px] bg-blue-500/10 blur-3xl rounded-full" />
                          {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-[0.2em] relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{displayData.name}</h2>)}
                       </div>
                       <div className="space-y-1">
                          {renderDraggableField('position', <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.8em]">{displayData.position}</p>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-20 mt-4" />
                       </div>
                       <div className="pt-10 flex gap-8 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          {renderDraggableField('email', <span>{displayData.email}</span>)}
                          {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
