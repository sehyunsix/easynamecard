import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Wood: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#5d4037] text-[#fbe9e7] relative overflow-hidden shadow-inner border-8 border-[#4e342e]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                    <div className="h-full border-2 border-white/10 p-8 flex flex-col justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none opacity-90">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-[#d7ccc8] mt-2 italic">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold opacity-70">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="opacity-30">SINCE 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
