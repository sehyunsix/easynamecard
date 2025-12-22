import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const RetroFuture: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#1a0a2e] text-[#ff00ff] font-mono relative overflow-hidden border-4 border-indigo-900 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[linear-gradient(rgba(255,0,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-indigo-400 mb-2 tracking-[0.4em]">FUTURE_LOADED: 2025_V8</div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_20px_#ff00ff] leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-cyan-400 mt-6 tracking-widest">{`[ ADDR_ROLE: ${displayData.position} ]`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-indigo-500/30 pt-4 text-[9px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-white/40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-pink-400">
                          <p className="animate-pulse">_RETRO_ 미래_V1</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
