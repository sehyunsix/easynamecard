import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CyberPulse: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#0a0a0f] text-[#00f2ff] font-mono relative overflow-hidden border-2 border-[#00f2ff]/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(90deg, #00f2ff 1px, transparent 1px)', backgroundSize: '100px 100%' }} />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-cyan-700 mb-2">PULSE_LINK_ESTABLISHED</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_0_15px_#00f2ff]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold border-l-4 border-[#00f2ff] pl-3 mt-4">{`// ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-[#00f2ff]/30 pt-4 text-[9px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-cyan-300">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-cyan-700">
                          <p className="animate-pulse">V.90_TECH</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
