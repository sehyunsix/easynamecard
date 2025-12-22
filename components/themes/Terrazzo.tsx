import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Terrazzo: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf5] text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fecaca 10%, transparent 10%), radial-gradient(circle, #bfdbfe 15%, transparent 15%), radial-gradient(circle, #fde68a 12%, transparent 12%)', backgroundSize: '100px 100px', backgroundPosition: '0 0, 50px 50px, 20px 80px' }} />
                    <div className="z-10 bg-white/90 backdrop-blur-sm p-12 rounded-[50px] shadow-2xl border border-white space-y-4">
                       <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                       </div>
                       <div className="w-12 h-px bg-slate-200 mx-auto" />
                       <div className="pt-4 space-y-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
