import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CyberGrid: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-cyan-400 font-mono relative overflow-hidden border-2 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px', perspective: '500px', transform: 'rotateX(60deg) translateY(-20%) scale(2)' }} />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-600 mb-2">System_Access: Granted</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold border-l-2 border-cyan-400 pl-3 mt-4">{`// ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest border-t border-cyan-500/30 pt-4">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>P: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-30">ENCRYPT_V.2</p>
                          {renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
