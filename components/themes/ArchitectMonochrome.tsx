import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const ArchitectMonochrome: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-900 relative overflow-hidden border-[1px] border-slate-200 shadow-inner flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="text-[10px] font-black uppercase tracking-[0.8em] text-slate-300 mb-4 italic">Architectural_Index_170</div>
                      <div className="space-y-1 border-l-8 border-slate-900 pl-10">
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase leading-none italic">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xl font-bold uppercase tracking-widest text-slate-400 mt-4 italic">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t-2 border-slate-100 pt-8">
                      <div className="space-y-2 text-[11px] font-black uppercase tracking-tighter text-slate-500">
                        {renderDraggableField('email', <p className="hover:text-slate-900 transition-colors">E: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-slate-900 transition-colors">T: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <Target size={48} strokeWidth={1} className="opacity-10 mb-4" />
                        {renderDraggableField('location', <p className="text-[10px] font-bold opacity-30 italic">{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
