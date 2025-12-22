import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Royal: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-gradient-to-br from-[#1a1a1a] to-black text-[#d4af37] relative overflow-hidden border-[15px] border-double border-[#d4af37]/30 shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-8">
                      <div className="w-16 h-16 border-2 border-[#d4af37] rotate-45 flex items-center justify-center mb-4">
                        <div className="text-3xl -rotate-45 font-serif italic">R</div>
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
                        <div className="flex items-center gap-4 justify-center">
                          <div className="h-px w-12 bg-[#d4af37]/30" />
                          {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.6em] text-slate-400">{displayData.position}</p>)}
                          <div className="h-px w-12 bg-[#d4af37]/30" />
                        </div>
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[8px] font-bold uppercase tracking-[0.4em] opacity-50">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
