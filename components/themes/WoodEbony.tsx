import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const WoodEbony: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#121212] text-slate-300 relative overflow-hidden flex flex-col justify-between border-[10px] border-slate-800 shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                       <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tighter text-white leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-500 mt-2">{displayData.position}</p>)}
                       </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                       <div className="space-y-1 text-[10px] font-bold tracking-widest opacity-40">
                          {renderDraggableField('email', <p>E_MAIL // {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>C_ONTACT // {displayData.contact}</p>)}
                       </div>
                       <div className="w-16 h-16 border border-white/5 flex items-center justify-center opacity-20">
                          <Target size={40} strokeWidth={0.5} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
