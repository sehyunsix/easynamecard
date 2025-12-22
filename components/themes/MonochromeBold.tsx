import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MonochromeBold: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-white text-black relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.75]">{displayData.name}</h2>)}
                      <div className="h-2 w-full bg-black mt-8" />
                      {renderDraggableField('position', <p className="text-2xl font-black uppercase tracking-tighter mt-4 italic">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[12px] font-black uppercase tracking-tighter">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                      <div className="text-right">
                        <p className="text-slate-300">EST. 2025</p>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
