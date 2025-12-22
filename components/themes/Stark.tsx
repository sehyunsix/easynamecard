import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Stark: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-black text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                       {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">{displayData.name}</h2>)}
                       <div className="h-1 w-full bg-white opacity-20 mt-8" />
                       {renderDraggableField('position', <p className="text-2xl font-black uppercase tracking-tighter text-slate-500 mt-4 italic">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end font-black uppercase tracking-tighter text-[11px]">
                       <div className="space-y-1">
                          {renderDraggableField('email', <p className="hover:text-slate-400 transition-colors">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="hover:text-slate-400 transition-colors">{displayData.contact}</p>)}
                       </div>
                       <div className="text-right flex items-center gap-4">
                          <div className="w-12 h-12 border-4 border-white flex items-center justify-center text-3xl">!</div>
                          {renderDraggableField('location', <p className="text-slate-500">{displayData.location}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
