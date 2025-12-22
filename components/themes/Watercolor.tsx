import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Watercolor: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
                    <div className="z-10 space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold text-slate-800 drop-shadow-sm">{displayData.name}</h2>)}
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
                      {renderDraggableField('position', <p className="text-sm font-medium text-slate-500 italic tracking-widest">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
