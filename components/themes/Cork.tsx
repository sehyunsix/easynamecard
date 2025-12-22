import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Cork: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#c29c6d] text-[#4e342e] relative overflow-hidden shadow-inner border-8 border-[#a18262]">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] pointer-events-none" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-20 pointer-events-none" />
                    <div className="h-full bg-white/90 rounded-sm p-10 flex flex-col justify-between shadow-2xl relative">
                       <div className="absolute top-[-10px] right-[-10px] opacity-10 rotate-12"><Target size={80} /></div>
                       <div className="space-y-4">
                          <div className="space-y-1">
                             {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tighter uppercase leading-none italic">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">{displayData.position}</p>)}
                          </div>
                          <div className="w-full h-[2px] bg-slate-100" />
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-relaxed">- {displayData.goal}</p>)}
                       </div>
                       <div className="flex justify-between items-end text-[10px] font-bold uppercase text-slate-400">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>{displayData.email}</p>)}
                             {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="text-right opacity-30 italic">POSTED_2025</div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
