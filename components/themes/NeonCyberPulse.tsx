import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const NeonCyberPulse: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#0a0a0f] text-[#00f2ff] font-mono relative overflow-hidden border-2 border-[#00f2ff]/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#00f2ff_1px,_transparent_1px)] bg-[size:30px_30px]" />
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-cyan-700 mb-2 tracking-[0.4em]">PULSE_SYNC: ENABLED</div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_15px_#00f2ff] leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-cyan-400 mt-6 tracking-widest">{`[ ADDR_ROLE: ${displayData.position} ]`}</p>)}
                      </div>
                      <div className="flex justify-between items-end w-full border-t border-[#00f2ff]/30 pt-4 text-[9px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-white/40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-cyan-700">
                          <p className="animate-pulse">V.170_CORE</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
