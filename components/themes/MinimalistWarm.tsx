import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MinimalistWarm: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf5] text-[#5d4037] relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tighter text-[#2d2d2d] leading-none">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#d4c49c] mt-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-1 text-[10px] font-medium tracking-widest text-[#5d4037]/60">
                      {renderDraggableField('email', <p>{displayData.email}</p>)}
                      {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      {renderDraggableField('location', <p>{displayData.location}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
