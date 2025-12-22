import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const AbstractPaint: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #ff0055 0%, transparent 40%), radial-gradient(circle at 80% 70%, #00ffcc 0%, transparent 40%), radial-gradient(circle at 50% 50%, #ffcc00 0%, transparent 50%)' }} />
                    <div className="z-10 bg-white/60 backdrop-blur-md p-10 border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">{displayData.name}</h2>)}
                      <div className="w-16 h-2 bg-slate-900 mx-auto" />
                      {renderDraggableField('position', <p className="text-sm font-black uppercase tracking-widest text-slate-600">{displayData.position}</p>)}
                      <div className="pt-6 text-[10px] font-bold text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
