import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const GlamGold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col justify-center items-center text-center border-[10px] border-[#d4af37]/20 shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/20 to-transparent pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="relative inline-block">
                        <div className="absolute inset-[-10px] border-2 border-[#d4af37]/30 scale-110" />
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase drop-shadow-[0_4px_10px_rgba(212,175,55,0.6)] leading-none px-6 py-4">{displayData.name}</h2>)}
                      </div>
                      <div className="space-y-4">
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.8em] text-white/60">{displayData.position}</p>)}
                        <div className="h-px w-32 bg-[#d4af37] mx-auto opacity-40 mt-4" />
                      </div>
                      <div className="pt-8 flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-[#d4af37]/60">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
