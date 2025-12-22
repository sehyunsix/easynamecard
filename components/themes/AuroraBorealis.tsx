import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const AuroraBorealis: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-emerald-900/40 to-black pointer-events-none animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="relative">
                        <div className="absolute inset-[-30px] bg-emerald-500/10 blur-3xl rounded-full" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-[0.3em] relative text-emerald-100 leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="space-y-1">
                        {renderDraggableField('position', <p className="text-xs font-bold text-emerald-300 uppercase tracking-[0.8em]">{displayData.position}</p>)}
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-emerald-400 to-transparent mx-auto opacity-30 mt-6" />
                      </div>
                      <div className="pt-10 flex gap-10 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
