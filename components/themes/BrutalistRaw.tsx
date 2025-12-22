import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const BrutalistRaw: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-black text-white relative overflow-hidden flex flex-col justify-between border-[10px] border-white">
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.75] drop-shadow-[10px_10px_0px_rgba(255,255,255,0.1)]">{displayData.name}</h2>)}
                      <div className="h-4 w-full bg-white mt-12 mb-4" />
                      {renderDraggableField('position', <p className="text-3xl font-black uppercase tracking-tighter italic text-slate-500">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end font-black uppercase tracking-tighter text-[12px] pt-8">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p className="bg-white text-black px-2 inline-block mb-1">{displayData.email}</p>)}
                        <br/>
                        {renderDraggableField('contact', <p className="bg-white text-black px-2 inline-block">{displayData.contact}</p>)}
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div className="w-16 h-16 border-8 border-white flex items-center justify-center text-5xl italic font-black">!</div>
                        {renderDraggableField('location', <p className="text-slate-500 text-sm">{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
