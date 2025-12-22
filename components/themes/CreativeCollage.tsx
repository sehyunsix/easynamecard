import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const CreativeCollage: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-slate-50 relative overflow-hidden flex h-full border-4 border-slate-900">
                    <div className="w-1/2 bg-white p-8 border-r-4 border-slate-900 flex flex-col justify-between relative">
                      <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
                      <div className="space-y-4">
                        <div className="bg-slate-900 text-white p-4 -rotate-2 shadow-xl inline-block">
                          {renderDraggableField('name', <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                        </div>
                        {renderDraggableField('position', <p className="text-lg font-black uppercase text-slate-900 mt-4 italic">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-100 p-8 flex flex-col justify-between items-center text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/newspaper.png')] pointer-events-none" />
                      <div className="z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900 rotate-12">
                        <Target size={48} strokeWidth={2} className="text-slate-900" />
                      </div>
                      <div className="z-10 bg-white p-4 border-2 border-slate-900 rotate-[-3deg] shadow-md">
                        {renderDraggableField('goal', <p className="text-[10px] font-black leading-tight italic">"{displayData.goal}"</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
