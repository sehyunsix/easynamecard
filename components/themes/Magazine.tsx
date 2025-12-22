import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Magazine: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 flex flex-col bg-white text-black font-serif relative overflow-hidden">
                    <div className="h-1/4 bg-slate-900 flex items-center justify-center">
                      <div className="text-[10px] text-white font-black tracking-[1em] uppercase">ISSUE NO. 01 // 2025</div>
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between items-start">
                      <div className="space-y-[-10px]">
                        {renderDraggableField('name', <h2 className="text-7xl font-black italic tracking-tighter leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="w-full flex justify-between items-end border-t-4 border-black pt-4">
                        {renderDraggableField('position', <p className="text-xl font-bold uppercase">{displayData.position}</p>)}
                        <div className="text-right text-[10px] font-bold leading-tight">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
