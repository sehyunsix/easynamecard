import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const VibrantBlob: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
                    <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.accentColor }} />
                    <div className="z-10 bg-white/40 backdrop-blur-md p-10 rounded-[50px] border border-white/50 shadow-2xl space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-3 justify-center pt-6">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.primaryColor }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.accentColor }} />
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                      </div>
                      <div className="pt-6 space-y-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
