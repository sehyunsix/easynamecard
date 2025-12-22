import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Rust: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2d2421] text-[#b97a57] relative overflow-hidden border-[1px] border-white/10 shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[#b97a57]/10 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between items-start">
                       <div className="space-y-6">
                          <div className="border-l-4 border-[#b97a57] pl-8 py-2">
                             {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-white/90 italic">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-xs font-bold text-[#b97a57]/60 mt-2 uppercase tracking-[0.4em]">{`// STATUS: ${displayData.position}`}</p>)}
                          </div>
                       </div>
                       <div className="w-full space-y-12">
                          <div className="max-w-[70%]">
                             {renderDraggableField('goal', <p className="text-xs font-mono leading-relaxed opacity-40 border-t border-white/10 pt-6">CORE_OBJECTIVE: {displayData.goal}</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest text-[#b97a57]/40">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p>ADDR: {displayData.email}</p>)}
                                {renderDraggableField('contact', <p>LINK: {displayData.contact}</p>)}
                             </div>
                             <div className="text-right">
                                <p>HARDENED_SHELL_V.9</p>
                                {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
