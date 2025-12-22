import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target, Briefcase } from 'lucide-react';

export const BotanicalArt: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf1] text-emerald-900 relative overflow-hidden flex flex-col justify-between border-[1px] border-emerald-100">
                    <div className="absolute -top-10 -right-10 opacity-10 rotate-12 pointer-events-none"><Target size={250} strokeWidth={0.5} /></div>
                    <div className="absolute bottom-[-50px] left-[-50px] opacity-10 pointer-events-none text-emerald-800"><Briefcase size={200} strokeWidth={0.5} /></div>
                    <div className="relative z-10 space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-700/60 mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-emerald-200" />
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div className="space-y-1 text-[10px] font-medium tracking-widest text-emerald-800/60">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                      <div className="text-right text-[9px] font-bold uppercase text-emerald-900/40">
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
