import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const LuxuryVelvetGold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#4a0e0e] text-[#d4af37] relative overflow-hidden shadow-2xl border-x-[30px] border-[#3a0b0b]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-center items-center text-center space-y-10">
                      <div className="w-16 h-px bg-[#d4af37]/30" />
                      <div className="space-y-4">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_10px_rgba(212,175,55,0.6)]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.6em] text-[#d4af37]/60 mt-4 font-light">{displayData.position}</p>)}
                      </div>
                      <div className="w-16 h-px bg-[#d4af37]/30" />
                      <div className="pt-6 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
