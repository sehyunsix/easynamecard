import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const StuccoWhite: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-[#fafafa] text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[1px] border-slate-200">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-widest uppercase leading-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.05)] text-slate-900">{displayData.name}</h2>)}
                        <div className="h-px w-24 bg-slate-200 mx-auto mt-6" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-slate-400 mt-6">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-300">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
