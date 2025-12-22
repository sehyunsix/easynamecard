import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const LiquidGold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col justify-center items-center text-center border-[1px] border-[#d4af37]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="relative inline-block">
                          <div className="absolute inset-[-10px] border border-[#d4af37]/30 rotate-12" />
                          <div className="absolute inset-[-10px] border border-[#d4af37]/30 -rotate-12" />
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)] leading-none px-6 py-4">{displayData.name}</h2>)}
                       </div>
                       <div className="space-y-4">
                          {renderDraggableField('position', <p className="text-sm font-light uppercase tracking-[0.8em] text-slate-400">{displayData.position}</p>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-40" />
                       </div>
                       <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <span>{displayData.email}</span>)}
                          {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
