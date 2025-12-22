import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Bold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full bg-slate-950 flex overflow-hidden">
                    <div className="w-1/3 h-full p-8 flex flex-col justify-between text-white relative z-10" style={{ backgroundColor: style.primaryColor }}>
                      <div className="text-4xl font-black leading-none break-all">
                        {renderDraggableField('name', <h2>{displayData.name}</h2>)}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-tighter opacity-80">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="w-2/3 h-full p-12 flex flex-col justify-center gap-6 bg-white">
                      <div className="space-y-4">
                        {renderDraggableField('goal', <p className="text-lg font-bold text-slate-900 leading-tight">"{displayData.goal}"</p>)}
                        <div className="space-y-1 text-xs font-medium text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
