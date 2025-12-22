import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const DesertSand: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f4e4bc] text-[#7a5c3e] relative overflow-hidden flex flex-col justify-center items-center text-center border-b-[20px] border-[#d4c49c]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tight leading-none text-[#5d4037]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#7a5c3e]/60 mt-4 italic">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-[2px] bg-[#7a5c3e]/20 mx-auto mt-6" />
                      <div className="pt-8 space-y-1 text-[10px] font-bold uppercase tracking-widest text-[#7a5c3e]/40">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
