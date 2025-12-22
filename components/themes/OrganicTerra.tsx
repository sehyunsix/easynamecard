import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const OrganicTerra: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf5] text-[#5d4037] relative overflow-hidden flex flex-col justify-between border-l-[30px] border-[#d4c49c] shadow-inner">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tighter text-[#2d2d2d] leading-none italic">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#d4c49c] mt-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-12 h-[2px] bg-[#d4c49c]" />
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-medium tracking-widest text-[#5d4037]/60">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
