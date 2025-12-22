import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Cassette: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#222] text-white relative overflow-hidden rounded-xl border-x-[12px] border-slate-800 shadow-2xl">
                    <div className="h-full bg-[#fafafa] rounded-lg p-6 flex flex-col text-black">
                       <div className="border-2 border-black p-4 flex-1 flex flex-col justify-between relative">
                          <div className="absolute top-2 right-4 text-[10px] font-black italic opacity-20">HIGH BIAS // 90</div>
                          <div className="space-y-1">
                            <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Side A</div>
                            {renderDraggableField('name', <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none border-b-2 border-black pb-2">{displayData.name}</h2>)}
                            {renderDraggableField('position', <p className="text-[10px] font-bold uppercase tracking-widest mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="flex justify-between items-end pt-4">
                             <div className="space-y-1 text-[9px] font-black uppercase italic">
                               {renderDraggableField('email', <p>{displayData.email}</p>)}
                               {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                             </div>
                             <div className="flex gap-2">
                               <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                                 <div className="w-2 h-2 bg-black rounded-sm" />
                               </div>
                               <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                                 <div className="w-2 h-2 bg-black rounded-sm" />
                               </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
