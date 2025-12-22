import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Neon: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-slate-950 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                    <div className="relative z-10 space-y-6">
                      <div style={{ filter: `drop-shadow(0 0 10px ${style.primaryColor})` }}>
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter" style={{ color: 'white' }}>{displayData.name}</h2>)}
                      </div>
                      <div className="inline-block px-4 py-1 border-2" style={{ borderColor: style.accentColor, boxShadow: `0 0 15px ${style.accentColor}` }}>
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: style.accentColor }}>{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-4 text-[9px] font-bold text-slate-400">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        <span>•</span>
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
