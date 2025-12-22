import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const TechBlueprint: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#1a2b3c] text-[#4dd0e1] font-mono relative overflow-hidden border-2 border-[#4dd0e1]/20">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(77,208,225,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(77,208,225,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Technical_Spec_V.1</div>
                          {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase border-b-2 border-[#4dd0e1] pb-2">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs mt-2 font-bold">{`[ CORE_ROLE: ${displayData.position} ]`}</p>)}
                        </div>
                        <div className="text-[10px] border border-[#4dd0e1] px-2 py-1 rotate-12 opacity-30">REF: 2025-A</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-bold uppercase tracking-tighter">
                        <div className="space-y-1 border-l border-[#4dd0e1]/30 pl-3">
                          {renderDraggableField('email', <p>{`E_ADDR: ${displayData.email}`}</p>)}
                          {renderDraggableField('contact', <p>{`T_LINE: ${displayData.contact}`}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-20 mb-1 italic">Dimensions: 3.5" x 2"</p>
                          {renderDraggableField('location', <p>{`COORDS: ${displayData.location}`}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
