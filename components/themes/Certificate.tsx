import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Certificate: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfdfd] text-[#2c3e50] relative overflow-hidden border-[15px] border-double border-slate-200 shadow-2xl">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="h-full border-[1px] border-slate-200 p-8 flex flex-col justify-between items-center text-center">
                       <div className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-4">Certificate of Professional</div>
                       <div className="space-y-6 flex-1 flex flex-col justify-center items-center">
                          <div className="space-y-1">
                            <div className="text-[8px] font-bold text-slate-400 uppercase italic mb-2">This is to certify that</div>
                            {renderDraggableField('name', <h2 className="text-5xl font-serif font-black text-slate-900 border-b-2 border-slate-900 pb-2 mb-2 inline-block leading-none">{displayData.name}</h2>)}
                            {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="max-w-[80%]">
                            {renderDraggableField('goal', <p className="text-[10px] font-serif italic text-slate-400 leading-relaxed">"{displayData.goal}"</p>)}
                          </div>
                       </div>
                       <div className="w-full flex justify-between items-end pt-8">
                          <div className="text-left space-y-1">
                             <div className="w-20 h-px bg-slate-200" />
                             {renderDraggableField('email', <p className="text-[8px] font-bold text-slate-400">{displayData.email}</p>)}
                          </div>
                          <div className="w-12 h-12 rounded-full border-2 border-red-900/10 flex items-center justify-center text-red-900/20 rotate-[-15deg]">
                             <Target size={32} strokeWidth={1} />
                          </div>
                          <div className="text-right space-y-1">
                             <div className="w-20 h-px bg-slate-200" />
                             {renderDraggableField('contact', <p className="text-[8px] font-bold text-slate-400">{displayData.contact}</p>)}
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
