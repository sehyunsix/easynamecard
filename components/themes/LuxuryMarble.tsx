import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const LuxuryMarble: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden border-[15px] border-slate-900 shadow-2xl">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-black pointer-events-none" />
                    <div className="h-full border border-[#d4af37]/20 p-10 flex flex-col justify-center items-center text-center space-y-8">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">{displayData.name}</h2>)}
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-40 mt-4" />
                        {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.6em] text-slate-400 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-50">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
