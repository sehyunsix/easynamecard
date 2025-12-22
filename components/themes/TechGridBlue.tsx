import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const TechGridBlue: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#0a0a1a] text-[#0074d9] font-mono relative overflow-hidden border-2 border-[#0074d9]/20 shadow-[0_0_30px_rgba(0,116,217,0.1)]">
                    <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#0074d9_1px,_transparent_1px)] bg-[size:40px_40px]" />
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase text-[#0074d9]/40 mb-2 tracking-[0.4em]">GRID_INTERFACE_CONNECTED</div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase text-white drop-shadow-[0_0_15px_#0074d9] leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-[#0074d9] mt-6 tracking-widest">{`[ ROLE_DATA: ${displayData.position} ]`}</p>)}
                      </div>
                      <div className="flex justify-between items-end w-full border-t border-[#0074d9]/30 pt-4 text-[9px] font-black uppercase tracking-widest">
                        <div className="space-y-1 text-white/40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-[#0074d9]">
                          <p className="animate-pulse">V.1.0_BLUE</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
