import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Glitch: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                    <div className="relative z-10">
                      <div className="relative inline-block">
                        <div className="absolute -top-1 -left-1 w-full h-full text-red-500 opacity-70 translate-x-1 translate-y-1 select-none pointer-events-none text-5xl font-black tracking-tighter italic">{displayData.name}</div>
                        <div className="absolute -top-1 -left-1 w-full h-full text-cyan-500 opacity-70 -translate-x-1 -translate-y-1 select-none pointer-events-none text-5xl font-black tracking-tighter italic">{displayData.name}</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter relative">{displayData.name}</h2>)}
                      </div>
                      <div className="mt-4 bg-white text-black px-4 py-1 font-bold text-sm uppercase tracking-[0.3em]">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                      <div className="mt-12 space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
