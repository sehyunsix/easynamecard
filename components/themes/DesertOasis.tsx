import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const DesertOasis: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f4e4bc] text-[#2d4a22] relative overflow-hidden flex flex-col justify-between border-b-[20px] border-[#2d4a22]/10 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 opacity-10 text-emerald-900 rotate-[-15deg] pointer-events-none"><Target size={300} /></div>
                    <div className="relative z-10">
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold uppercase tracking-[0.6em] text-[#2d4a22]/40 mb-2">Hidden_Paradise_V.1</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-700/60 mt-4">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-emerald-900/40">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                      </div>
                      {renderDraggableField('location', <p className="text-[8px] italic opacity-30">{displayData.location}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
