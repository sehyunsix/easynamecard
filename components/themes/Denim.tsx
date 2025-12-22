import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Globe } from 'lucide-react';

export const Denim: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#2c3e50] text-white relative overflow-hidden flex flex-col justify-between border-[10px] border-[#34495e] shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/denim.png')] pointer-events-none" />
                    <div className="absolute bottom-4 right-4 text-yellow-600/30 opacity-50"><Globe size={120} strokeWidth={4} /></div>
                    <div className="relative z-10">
                      <div className="bg-yellow-600 p-4 border-2 border-white/20 inline-block rotate-[-1deg]">
                        {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                      </div>
                      <br/>
                      {renderDraggableField('position', <p className="text-xs font-bold text-yellow-600 mt-2 bg-white/10 px-2 py-1 inline-block uppercase tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-1 text-[10px] font-bold tracking-widest text-slate-300">
                      {renderDraggableField('contact', <p>P: {displayData.contact}</p>)}
                      {renderDraggableField('email', <p>M: {displayData.email}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
