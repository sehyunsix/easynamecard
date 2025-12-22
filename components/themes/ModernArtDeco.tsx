import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const ModernArtDeco: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden border-[1px] border-[#d4af37]/20 flex flex-col justify-center items-center text-center shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-6 border border-[#d4af37]/30 pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="relative inline-block">
                        <div className="absolute inset-[-20px] border border-[#d4af37]/20 rotate-45" />
                        <div className="absolute inset-[-20px] border border-[#d4af37]/20 -rotate-45" />
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase text-white leading-none px-6 py-4 drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)]">{displayData.name}</h2>)}
                      </div>
                      <div className="space-y-4">
                        {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.8em] text-[#d4af37]/60 mt-4">{displayData.position}</p>)}
                        <div className="h-px w-32 bg-[#d4af37] mx-auto opacity-20 mt-6" />
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-30">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
