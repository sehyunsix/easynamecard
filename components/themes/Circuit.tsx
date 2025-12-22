import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Circuit: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#0a1a0a] text-emerald-400 font-mono relative overflow-hidden border-2 border-emerald-500/30">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #34d399 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-l-4 border-emerald-500 pl-6 py-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-emerald-600 mt-1 uppercase">{`> CORE_MODULE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-bold">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p><span className="opacity-40">@:</span> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p><span className="opacity-40">#:</span> {displayData.contact}</p>)}
                        </div>
                        <div className="text-right border-r-4 border-emerald-500 pr-4">
                          <p className="opacity-30">SYSTEM_UPTIME: 100%</p>
                          {renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
