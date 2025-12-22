import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const FuturisticWhite: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center border-[2px] border-slate-200 shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-[0.2em] uppercase leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)]">{displayData.name}</h2>)}
                        <div className="h-px w-32 bg-slate-900 mx-auto opacity-10 mt-6" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400 mt-6">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
