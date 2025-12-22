import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Lava: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#1a0a05] text-[#ff4e00] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl border-[1px] border-[#ff4e00]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff4e00]/20 to-transparent pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="relative inline-block">
                         <div className="absolute inset-0 bg-[#ff4e00] blur-2xl opacity-20 animate-pulse" />
                         {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase relative drop-shadow-[0_0_15px_rgba(255,78,0,0.5)] italic">{displayData.name}</h2>)}
                      </div>
                      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ff4e00] to-transparent mx-auto" />
                      {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.4em] text-orange-400 uppercase">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[10px] font-black uppercase tracking-widest text-[#ff4e00]/40">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
