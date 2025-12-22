import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Clay: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-blue-50 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 pointer-events-none" />
                    <div className="z-10 bg-white p-10 rounded-[40px] shadow-[20px_20px_40px_rgba(0,0,0,0.05),-10px_-10px_20px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.02)] border border-white/50 space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-800 tracking-tight">{displayData.name}</h2>)}
                        <div className="bg-blue-500/10 px-4 py-1 rounded-full inline-block">
                          {renderDraggableField('position', <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="pt-4 space-y-1 text-[10px] font-bold text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
