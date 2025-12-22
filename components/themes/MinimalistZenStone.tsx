import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MinimalistZenStone: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[1px] border-slate-100">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-widest uppercase text-slate-900 leading-none">{displayData.name}</h2>)}
                        <div className="w-16 h-[2px] bg-slate-900/10 mx-auto mt-6" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-slate-400 mt-6">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-300">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
