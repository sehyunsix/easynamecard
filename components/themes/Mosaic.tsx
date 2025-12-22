import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Mosaic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white relative overflow-hidden flex flex-col">
                    <div className="h-1/3 w-full grid grid-cols-12 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-full" style={{ backgroundColor: i % 2 === 0 ? style.primaryColor : style.accentColor, opacity: 0.2 + (i * 0.05) }} />
                      ))}
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between items-center text-center">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">{displayData.position}</p>)}
                      </div>
                      <div className="w-full flex justify-between items-end text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.primaryColor }} />
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
