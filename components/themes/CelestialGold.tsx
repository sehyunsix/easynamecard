import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CelestialGold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col justify-center items-center text-center border-[1px] border-[#d4af37]/20 shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
                    <div className="z-10 space-y-10">
                      <div className="w-20 h-20 border border-[#d4af37]/40 rotate-45 flex items-center justify-center mx-auto shadow-2xl bg-black">
                        <div className="text-3xl -rotate-45 font-serif italic">C</div>
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase text-white leading-none drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)]">{displayData.name}</h2>)}
                        <div className="h-px w-32 bg-[#d4af37] mx-auto opacity-30 mt-6" />
                        {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.8em] text-[#d4af37]/60 mt-6 italic">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[8px] font-bold uppercase tracking-[0.4em] text-white/20">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
