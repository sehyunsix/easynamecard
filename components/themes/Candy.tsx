import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles } from 'lucide-react';

export const Candy: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-pink-100 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="bg-white/80 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white inline-block">
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-pink-500 tracking-tighter italic">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-blue-400 mt-1 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-black text-pink-600/60 uppercase tracking-widest">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>HELLO@ {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>CALL@ {displayData.contact}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-yellow-400">
                        <Sparkles size={24} fill="currentColor" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
