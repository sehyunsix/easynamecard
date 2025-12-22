import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Elegant: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 flex flex-col items-center justify-center bg-white relative overflow-hidden font-playfair">
                    <div className="absolute inset-4 border border-slate-200 pointer-events-none" />
                    <div className="absolute inset-[18px] border-2 border-double border-slate-100 pointer-events-none" />
                    <div className="z-10 text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-4xl text-slate-900 tracking-widest">{displayData.name}</h2>)}
                      <div className="w-12 h-[1px] bg-slate-300 mx-auto" />
                      {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{displayData.position}</p>)}
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between text-[9px] uppercase tracking-widest text-slate-400">
                      {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      {renderDraggableField('email', <span>{displayData.email}</span>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
