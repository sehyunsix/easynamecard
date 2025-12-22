import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Space: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-slate-950 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60" />
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500" />
                    <div className="z-10 space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full" />
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-widest uppercase relative">{displayData.name}</h2>)}
                      </div>
                      <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-30" />
                      {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.5em] text-slate-400 uppercase">{displayData.position}</p>)}
                      <div className="pt-8 text-[9px] font-bold tracking-[0.2em] text-slate-500 flex gap-4">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
