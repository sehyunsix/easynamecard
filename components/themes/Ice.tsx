import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Ice: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#e0f7fa] text-[#007b8b] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[1px] border-white/40">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/ice-age.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                    <div className="z-10 bg-white/30 backdrop-blur-xl p-10 rounded-[30px] border border-white/50 shadow-xl space-y-4">
                      <div className="space-y-1">
                         {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-[#007b8b]/60 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-[#007b8b]/20 mx-auto" />
                      <div className="space-y-1 text-[10px] font-bold text-[#007b8b]/40 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
