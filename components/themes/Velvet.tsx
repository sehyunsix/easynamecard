import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Velvet: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#4a0e0e] text-[#fbe9e7] relative overflow-hidden shadow-2xl border-x-[30px] border-[#3a0b0b]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-center items-center text-center space-y-8">
                       <div className="w-16 h-px bg-white/20" />
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm uppercase tracking-[0.5em] text-[#ff8a65] mt-2 font-bold">{displayData.position}</p>)}
                       </div>
                       <div className="w-16 h-px bg-white/20" />
                       <div className="pt-4 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
