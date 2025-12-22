import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const UrbanIndustrial: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2d2d2d] text-slate-100 relative overflow-hidden border-8 border-slate-800 flex flex-col justify-between shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="bg-yellow-400 text-black px-6 py-2 inline-block shadow-xl italic">
                        {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
                      </div>
                      <br/>
                      {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-6 border-l-4 border-yellow-400 pl-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t border-slate-700 pt-6">
                      <div className="space-y-1 text-[10px] font-black uppercase tracking-tighter text-slate-500">
                        {renderDraggableField('email', <p>E_ADDR: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T_LINE: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right text-[8px] font-bold opacity-20">
                        <p>INDUSTRIAL_CORE_V.1</p>
                        {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
