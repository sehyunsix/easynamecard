import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Gazette: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfdf7] text-slate-900 font-serif relative overflow-hidden border-x-[1px] border-slate-200">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full border-t-4 border-b-4 border-slate-900 py-8">
                       <div className="flex justify-between items-end mb-6 border-b-2 border-slate-900 pb-2">
                          <div className="text-[10px] font-black italic">EDITION: 2025.12.21</div>
                          <div className="text-4xl font-black tracking-tighter uppercase">Gazette</div>
                          <div className="text-[10px] font-black italic">VOL. 01 // NO. 100</div>
                       </div>
                       <div className="flex-1 grid grid-cols-12 gap-8">
                          <div className="col-span-8 space-y-4">
                             {renderDraggableField('name', <h2 className="text-5xl font-black leading-none tracking-tight">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-lg font-bold italic leading-tight text-slate-700">{displayData.position}</p>)}
                             <div className="w-full h-[2px] bg-slate-900" />
                             {renderDraggableField('goal', <p className="text-[10px] leading-relaxed opacity-70 italic">"{displayData.goal}"</p>)}
                          </div>
                          <div className="col-span-4 border-l-2 border-slate-900 pl-4 space-y-4">
                             <div className="aspect-square bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-300">
                                <Target size={32} strokeWidth={1} />
                             </div>
                             <div className="space-y-1 text-[9px] font-bold uppercase leading-tight">
                                {renderDraggableField('email', <p>{displayData.email}</p>)}
                                {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                                {renderDraggableField('location', <p>{displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
