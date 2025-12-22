import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const BlueprintRed: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#4a0e0e] text-[#ffcccc] font-mono relative overflow-hidden border-2 border-white/10">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-2">
                        <div className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">DESIGN_SPEC_V.R2</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-widest uppercase border-b-2 border-[#ffcccc] pb-2">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs mt-2 font-bold opacity-60 uppercase">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-bold uppercase tracking-tighter">
                        <div className="space-y-1 border-l border-[#ffcccc]/30 pl-3">
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
