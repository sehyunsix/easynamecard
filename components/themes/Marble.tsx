import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Marble: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden border-[20px] border-slate-50 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/marble.png')]" />
                    <div className="h-full border border-slate-200 p-8 flex flex-col justify-between items-center text-center">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-800">{displayData.name}</h2>)}
                        <div className="w-8 h-px bg-slate-300 mx-auto" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[9px] font-medium text-slate-500 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
