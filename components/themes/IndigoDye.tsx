import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const IndigoDye: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#001f3f] text-[#0074d9] relative overflow-hidden border-[1px] border-white/5 shadow-2xl flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/20 via-transparent to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold text-[#0074d9]/40 uppercase tracking-[0.6em] mb-2">TRADITIONAL_INDIGO_CRAFT</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-[#0074d9]/60 mt-4">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#0074d9]/40">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center mb-2">
                           <Target size={24} strokeWidth={1} className="text-[#0074d9]/40" />
                        </div>
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
