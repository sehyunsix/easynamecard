import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Holographic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 relative overflow-hidden flex flex-col items-center justify-center text-white"
                       style={{ background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 mix-blend-overlay animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/glass-dots.png')] opacity-10" />
                    <div className="bg-white/20 backdrop-blur-xl p-12 rounded-[50px] border border-white/30 shadow-2xl text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight drop-shadow-lg" style={{ color: style.primaryColor }}>{displayData.name}</h2>)}
                      <div className="h-px w-12 bg-white/50 mx-auto" />
                      {renderDraggableField('position', <p className="text-sm font-bold opacity-80" style={{ color: style.accentColor }}>{displayData.position}</p>)}
                      <div className="pt-4 flex flex-col gap-1 text-[10px] font-bold text-white/70">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
