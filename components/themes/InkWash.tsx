import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const InkWash: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-[#f7f3ed] text-[#2c2c2c] font-serif relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] pointer-events-none" />
                    <div className="absolute top-10 left-10 w-48 h-48 bg-black/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="z-10 space-y-8">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter leading-none opacity-90">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.6em] text-slate-500 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="w-1 h-20 bg-gradient-to-b from-slate-900 to-transparent mx-auto opacity-10" />
                      <div className="space-y-1 text-[11px] font-medium tracking-[0.2em] text-slate-400 italic">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
