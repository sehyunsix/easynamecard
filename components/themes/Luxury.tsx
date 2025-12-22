import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Luxury: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 flex flex-col justify-center items-center bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-6 border border-[#d4af37]/30 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full" />
                    <div className="text-center z-10 space-y-6">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif tracking-[0.2em] text-[#d4af37]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-light">{displayData.position}</p>)}
                      </div>
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
                      <div className="space-y-1 text-[9px] uppercase tracking-widest text-slate-500 font-medium">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
