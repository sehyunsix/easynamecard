import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Futuristic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#050505] text-blue-400 relative overflow-hidden font-mono">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#1e3a8a_0%,_transparent_80%)] opacity-20" />
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 border-t border-r border-blue-500/30" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/3 border-b border-l border-blue-500/30" />
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="mb-8">
                        <div className="text-[8px] opacity-50 mb-1 tracking-[0.5em] uppercase">IDENTIFICATION_SIGNAL</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-[0.2em] text-white uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-blue-300 mt-2 bg-blue-900/30 px-2 py-0.5 inline-block border-l-2 border-blue-400">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[9px] tracking-widest uppercase">
                        {renderDraggableField('email', <p><span className="text-white">LINK:</span> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p><span className="text-white">FREQ:</span> {displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
