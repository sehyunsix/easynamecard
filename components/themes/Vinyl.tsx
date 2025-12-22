import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Vinyl: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-[#121212] text-white relative overflow-hidden flex">
                    <div className="w-2/3 h-full relative flex items-center justify-center bg-black">
                      <div className="w-[240px] h-[240px] rounded-full bg-[#111] border-[1px] border-white/5 relative flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="absolute rounded-full border border-white/5" style={{ width: `${(i+1)*20}px`, height: `${(i+1)*20}px` }} />
                        ))}
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black p-4 text-center">
                          <div className="text-[8px] font-black uppercase leading-tight">{displayData.name}</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-black z-10" />
                      </div>
                    </div>
                    <div className="w-1/3 p-8 flex flex-col justify-between border-l border-white/10 bg-gradient-to-br from-[#1a1a1a] to-black">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-4 pt-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
