import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Matrix: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-[#00ff41] font-mono relative overflow-hidden flex flex-col justify-between border-2 border-[#00ff41]/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10">
                      <div className="text-[10px] opacity-40 mb-2">[ SYSTEM_ACCESS_AUTHORIZED ]</div>
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-widest uppercase border-b-2 border-[#00ff41]/50 pb-2 inline-block">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm mt-2 font-bold">{`> ROLE: ${displayData.position}`}</p>)}
                    </div>
                    <div className="relative z-10 grid grid-cols-2 gap-4 text-[10px] font-bold">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>ADDR: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>LINK: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right flex flex-col justify-end">
                        <div className="text-[8px] opacity-30 animate-pulse">ENCRYPTING_DATA...</div>
                        {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
