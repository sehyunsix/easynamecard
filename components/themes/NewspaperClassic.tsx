import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const NewspaperClassic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfdf7] text-slate-900 font-serif relative overflow-hidden border-x-[1px] border-slate-200 shadow-inner">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full border-t-4 border-b-4 border-slate-900 py-8">
                      <div className="flex justify-between items-end mb-8 border-b-2 border-slate-900 pb-2">
                        <div className="text-[10px] font-black italic">EST. 2025</div>
                        <div className="text-4xl font-black tracking-tighter uppercase">Daily Card</div>
                        <div className="text-[10px] font-black italic">NO. 170</div>
                      </div>
                      <div className="flex-1 grid grid-cols-12 gap-10">
                        <div className="col-span-8 space-y-6">
                          {renderDraggableField('name', <h2 className="text-5xl font-black leading-none tracking-tight underline decoration-slate-900/10 underline-offset-8">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xl font-bold italic leading-tight text-slate-700">{displayData.position}</p>)}
                          <div className="w-full h-px bg-slate-900/20" />
                          {renderDraggableField('goal', <p className="text-xs leading-relaxed text-slate-500 italic">"{displayData.goal}"</p>)}
                        </div>
                        <div className="col-span-4 border-l-2 border-slate-900 pl-6 space-y-6 flex flex-col justify-between">
                          <div className="aspect-square bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-300 shadow-inner">
                            <Target size={40} strokeWidth={1} />
                          </div>
                          <div className="space-y-2 text-[9px] font-bold uppercase leading-tight text-slate-600">
                            {renderDraggableField('email', <p className="border-b border-slate-200 pb-1">{displayData.email}</p>)}
                            {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                            {renderDraggableField('location', <p className="pt-2 opacity-40">{displayData.location}</p>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
