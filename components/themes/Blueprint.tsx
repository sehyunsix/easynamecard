import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Blueprint: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#1e3a8a] text-white font-mono relative overflow-hidden border-2 border-white/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-2 border-dashed border-white/40 p-4">
                        {renderDraggableField('name', <h2 className="text-3xl font-bold uppercase tracking-widest">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-blue-200 mt-1">[ POSITION: {displayData.position} ]</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] uppercase">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                        </div>
                        <div className="space-y-1 text-right">
                          {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                          {renderDraggableField('github', <p>G: {displayData.github}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
