import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Goldleaf: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <div className="absolute inset-6 border border-[#d4af37]/40 pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.1em] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{displayData.name}</h2>)}
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.5em] font-light text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
