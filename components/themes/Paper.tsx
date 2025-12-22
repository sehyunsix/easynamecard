import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Paper: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfdfd] text-[#2c3e50] relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                    <div className="absolute top-0 left-0 w-full h-full border-t-[40px] border-l-[40px] border-transparent border-t-white border-l-white drop-shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-6">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-slate-200" />
                      <div className="space-y-1 text-[10px] font-bold text-slate-500">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
