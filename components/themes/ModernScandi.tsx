import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const ModernScandi: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-800 relative overflow-hidden flex flex-col justify-between border-l-[30px]" style={{ borderColor: style.primaryColor }}>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-12 h-1" style={{ backgroundColor: style.primaryColor }} />
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
