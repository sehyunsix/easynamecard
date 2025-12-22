import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Diamond: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center border-[20px] border-slate-50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="w-20 h-20 border-2 border-slate-900 rotate-45 flex items-center justify-center mx-auto shadow-xl">
                          <div className="w-12 h-12 border border-slate-900/20 rotate-12 flex items-center justify-center">
                            <Target size={32} strokeWidth={1} className="-rotate-[57deg]" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tight text-slate-900">{displayData.name}</h2>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-900 to-transparent mx-auto opacity-20" />
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">{displayData.position}</p>)}
                       </div>
                       <div className="pt-8 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
