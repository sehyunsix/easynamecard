import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Architect: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-900 font-sans relative overflow-hidden border-l-[24px] border-slate-900">
                    <div className="h-full flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="relative">
                          {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tighter leading-none">{displayData.name}</h2>)}
                          <div className="absolute -left-12 top-1/2 w-8 h-px bg-slate-400" />
                        </div>
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400 border-b border-slate-100 pb-4 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        <div className="space-y-2">
                          {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                        </div>
                        <div className="space-y-2">
                          {renderDraggableField('location', <p>L. {displayData.location}</p>)}
                          {renderDraggableField('github', <p>G. {displayData.github}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
