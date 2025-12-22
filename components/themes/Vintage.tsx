import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Vintage: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#ece0d1] text-[#432818] font-serif relative overflow-hidden border-[16px] border-[#967e76]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />
                    <div className="relative z-10 h-full flex flex-col justify-between border-2 border-[#432818]/30 p-8">
                      <div className="text-center space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">EST. 2025</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-bold uppercase tracking-tight">{displayData.name}</h2>)}
                        <div className="w-full h-[1px] bg-[#432818]/40" />
                        {renderDraggableField('position', <p className="text-sm italic">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[9px] font-bold uppercase text-center tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
