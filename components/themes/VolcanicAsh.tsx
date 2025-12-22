import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const VolcanicAsh: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#1a1a1a] text-[#ff4e00] relative overflow-hidden flex flex-col justify-center items-center text-center border-x-[15px] border-slate-900 shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="z-10 space-y-8">
                      <div className="relative inline-block">
                        <div className="absolute inset-0 bg-[#ff4e00] blur-3xl opacity-10" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_10px_rgba(255,78,0,0.4)] leading-none italic">{displayData.name}</h2>)}
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.4em] text-[#ff4e00]/60 uppercase">{displayData.position}</p>)}
                        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#ff4e00] to-transparent mx-auto opacity-20 mt-4" />
                      </div>
                      <div className="pt-10 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-600">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
