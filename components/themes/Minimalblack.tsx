import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Minimalblack: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-white flex flex-col items-center justify-center text-center relative">
                    <div className="space-y-6">
                      {renderDraggableField('name', <h2 className="text-4xl font-extralight tracking-[0.4em] uppercase">{displayData.name}</h2>)}
                      <div className="w-8 h-px bg-white/30 mx-auto" />
                      {renderDraggableField('position', <p className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">{displayData.position}</p>)}
                    </div>
                    <div className="absolute bottom-12 space-y-1 text-[8px] font-bold uppercase tracking-widest opacity-30">
                      {renderDraggableField('email', <p>{displayData.email}</p>)}
                      {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
