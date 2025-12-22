import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Sketch: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-white text-slate-800 relative overflow-hidden font-serif" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}>
                    <div className="absolute inset-4 border-2 border-slate-800 rounded-lg pointer-events-none" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                    <div className="z-10 flex flex-col h-full justify-center items-center text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-tighter" style={{ fontFamily: 'Brush Script MT, cursive' }}>{displayData.name}</h2>)}
                      <div className="w-24 h-px bg-slate-400 rotate-2" />
                      {renderDraggableField('position', <p className="text-lg opacity-80 italic">{displayData.position}</p>)}
                      <div className="pt-4 space-y-1 text-sm font-sans">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
