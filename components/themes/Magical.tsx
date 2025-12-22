import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles } from 'lucide-react';

export const Magical: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                    <div className="relative z-10 space-y-6">
                      <div className="relative">
                        <Sparkles className="absolute -top-8 -left-8 text-yellow-400 opacity-50 animate-pulse" size={32} />
                        <Sparkles className="absolute -bottom-8 -right-8 text-yellow-400 opacity-50 animate-pulse delay-700" size={24} />
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
