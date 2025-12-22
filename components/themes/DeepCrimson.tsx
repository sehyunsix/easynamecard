import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const DeepCrimson: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2b0c0c] text-[#ffcccc] relative overflow-hidden flex flex-col justify-center items-center text-center border-[15px] border-[#3a0b0b] shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-4">
                        <div className="w-12 h-1 bg-white/10 mx-auto rounded-full" />
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-[0.15em] uppercase text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
                        <div className="w-12 h-1 bg-white/10 mx-auto rounded-full" />
                      </div>
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-[#ffcccc]/40 mt-6">{displayData.position}</p>)}
                      <div className="pt-12 flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-[#ffcccc]/20">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
