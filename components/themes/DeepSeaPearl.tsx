import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const DeepSeaPearl: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-gradient-to-br from-[#001f3f] via-[#0074d9]/40 to-[#7fdbff]/20 text-white relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/ice-age.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-[0.1em] text-white leading-none drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-blue-300 mt-6">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    <div className="absolute bottom-10 right-10 opacity-10 pointer-events-none"><Target size={150} strokeWidth={0.5} /></div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
