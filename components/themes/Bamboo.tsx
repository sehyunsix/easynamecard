import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Bamboo: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf1] text-[#2d3a2d] relative overflow-hidden border-r-[24px] border-[#e8dfc5]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] rotate-90 pointer-events-none" />
                    <div className="flex flex-col h-full justify-between items-start">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-40">PROFESSIONAL_MINIMAL</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950">{displayData.name}</h2>)}
                        </div>
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.4em] font-medium border-b border-emerald-900/20 pb-4 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[9px] font-bold uppercase tracking-widest text-emerald-900/60">
                        {renderDraggableField('email', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
