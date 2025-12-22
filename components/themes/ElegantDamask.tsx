import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const ElegantDamask: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[20px] border-slate-50">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="z-10 space-y-8">
                      <div className="w-16 h-16 border border-slate-200 rotate-45 flex items-center justify-center mx-auto opacity-40 shadow-xl bg-white">
                        <div className="text-3xl -rotate-45 font-serif italic text-slate-900">E</div>
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.1em] text-slate-900 leading-none">{displayData.name}</h2>)}
                        <div className="h-px w-24 bg-slate-200 mx-auto mt-4" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-slate-400 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
