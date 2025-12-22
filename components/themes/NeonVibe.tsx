import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const NeonVibe: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-[#ff00ff] font-mono relative overflow-hidden border-2 border-[#ff00ff]/20 shadow-[0_0_20px_rgba(255,0,255,0.1)]">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_0%,rgba(255,0,255,0.2)_50%,transparent_100%)] bg-[size:100%_4px] pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase italic drop-shadow-[0_0_10px_rgba(255,0,255,0.8)] text-white">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-cyan-400 mt-4 tracking-widest">{`[ ROLE: ${displayData.position} ]`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-[#ff00ff]/30 pt-4 text-[10px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-cyan-300">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-pink-400">
                          <p className="animate-pulse">_VIBE_OS</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
