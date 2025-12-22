import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Cyanotype: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#003366] text-[#e0f2ff] relative overflow-hidden border-2 border-[#e0f2ff]/20 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between items-start">
                      <div className="space-y-6">
                        <div className="border-l-2 border-[#e0f2ff]/40 pl-8 py-2">
                           {renderDraggableField('name', <h2 className="text-5xl font-serif italic tracking-tighter leading-none opacity-90">{displayData.name}</h2>)}
                           {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#e0f2ff]/60 mt-2">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-8 w-full">
                        <div className="max-w-[70%]">
                           {renderDraggableField('goal', <p className="text-[10px] font-medium leading-relaxed opacity-40 border-t border-[#e0f2ff]/10 pt-4">PROJECT_SPEC: {displayData.goal}</p>)}
                        </div>
                        <div className="flex justify-between items-end text-[9px] font-bold tracking-[0.3em] opacity-60">
                           <div className="space-y-1">
                             {renderDraggableField('email', <p>ADDR_01: {displayData.email}</p>)}
                             {renderDraggableField('contact', <p>ADDR_02: {displayData.contact}</p>)}
                           </div>
                           <div className="text-right">
                             <p>DATE: 2025.12.21</p>
                             <p>BATCH: #001-A</p>
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-[-50px] translate-y-[-50%] opacity-10 rotate-[-90deg] pointer-events-none">
                      <Target size={300} strokeWidth={0.5} />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
