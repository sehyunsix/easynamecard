import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Carbon: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#111] text-white relative overflow-hidden flex flex-col justify-between border-b-8 border-slate-800">
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 50%, #222 50%, #222 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }} />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter text-slate-100 uppercase">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-red-600 tracking-[0.3em] mt-1">SUPER_TECH // {displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-6">
                      <div className="space-y-1 text-[9px] font-mono opacity-60">
                        {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                      </div>
                      <div className="w-10 h-10 border-2 border-red-600 rotate-45 flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-600 -rotate-45" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
