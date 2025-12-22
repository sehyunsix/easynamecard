import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Mail, Phone, Sparkles } from 'lucide-react';

export const Gradient: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 text-white relative overflow-hidden flex flex-col justify-between"
                       style={{ background: `linear-gradient(135deg, ${style.primaryColor}, ${style.accentColor}, #7c3aed)` }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tight leading-none mb-2">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div className="space-y-1 text-[10px] font-bold">
                        {renderDraggableField('email', <p className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md backdrop-blur-md border border-white/20"><Mail size={10}/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md backdrop-blur-md border border-white/20"><Phone size={10}/> {displayData.contact}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg rotate-12">
                        <Sparkles size={24} style={{ color: style.primaryColor }} />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
