import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CyberpunkRed: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-[#ff0000] font-mono relative overflow-hidden border-2 border-[#ff0000]/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,0,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,0,0.2) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-red-600 mb-2 tracking-[0.5em]">Danger: High_Voltage</div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase italic text-white drop-shadow-[0_0_15px_#ff0000]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-black border-l-4 border-red-600 pl-3 mt-6">{`// KILL_ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-red-600/30 pt-4 text-[9px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-red-400">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-red-900">
                          <p className="animate-pulse">_RED_OS_CORE</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
