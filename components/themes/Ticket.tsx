import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Ticket: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full flex bg-[#1a1a1a] text-white font-mono relative overflow-hidden border-2 border-white/10 rounded-xl">
                    <div className="w-1/4 bg-yellow-500 text-black p-6 flex flex-col justify-between border-r-4 border-dashed border-black/20">
                      <div className="text-[8px] font-black rotate-[-90deg] origin-left translate-x-4 mt-8">ADM-001-2025</div>
                      <div className="text-2xl font-black">21 <br/> DEC</div>
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between relative">
                      <div className="absolute top-4 right-10 text-[8px] font-black opacity-30">CINEMA PREVIEW // NO. 7821</div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-yellow-500 mb-2 uppercase tracking-[0.4em]">NOW SHOWING:</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 mt-2 italic">{`DIRECTED BY: ${displayData.position}`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-white/10 pt-6">
                        <div className="space-y-1 text-[9px] font-bold uppercase text-slate-500">
                          {renderDraggableField('email', <p>SCREEN: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>SEAT: {displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center text-yellow-500 opacity-20">
                          <Target size={48} strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
