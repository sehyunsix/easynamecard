import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MinimalistDarkRed: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2b0c0c] text-white relative overflow-hidden flex flex-col justify-between border-r-[30px] border-[#4a0e0e] shadow-2xl">
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none text-white italic uppercase">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#ffcccc]/40 mt-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-1 text-[10px] font-bold tracking-widest text-[#ffcccc]/20 uppercase">
                      {renderDraggableField('email', <p>{displayData.email}</p>)}
                      {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      {renderDraggableField('location', <p className="mt-4 text-white/10">{displayData.location}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
