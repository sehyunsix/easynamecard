import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Medal: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-gradient-to-br from-slate-900 to-black text-[#d4af37] relative overflow-hidden border-[1px] border-[#d4af37]/30 shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-red-700 to-red-900 border-x-[12px] border-white/20 shadow-2xl z-0" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-8">
                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f9e29c] to-[#d4af37] border-[6px] border-[#a68a2d] shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center text-black font-black text-3xl">1</div>
                       </div>
                       <div className="space-y-2">
                         <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-2">The Excellence Award</div>
                         {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter drop-shadow-md">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-white/60 tracking-[0.4em] uppercase">{displayData.position}</p>)}
                       </div>
                       <div className="pt-8 flex gap-6 text-[9px] font-black uppercase opacity-40">
                         {renderDraggableField('email', <span>{displayData.email}</span>)}
                         <span className="w-[1px] h-4 bg-white/20" />
                         {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
