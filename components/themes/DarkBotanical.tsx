import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target, Briefcase } from 'lucide-react';

export const DarkBotanical: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4edda] relative overflow-hidden border-[1px] border-white/5 shadow-2xl flex flex-col justify-between">
                    <div className="absolute top-[-50px] right-[-50px] opacity-10 rotate-12 pointer-events-none text-emerald-400"><Target size={250} strokeWidth={0.5} /></div>
                    <div className="absolute bottom-[-50px] left-[-50px] opacity-10 pointer-events-none text-emerald-800"><Briefcase size={200} strokeWidth={0.5} /></div>
                    <div className="relative z-10">
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold text-emerald-500/40 uppercase tracking-[0.6em] mb-2">LUXURY_DARK_FLORA</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-700/60 mt-4">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-16 h-px bg-white/10" />
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
