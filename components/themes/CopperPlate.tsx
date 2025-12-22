import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CopperPlate: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#2d1a1a] text-[#b97a57] relative overflow-hidden flex flex-col justify-center items-center text-center border-[10px] border-[#3e2723] shadow-2xl">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#b97a57]/10 via-transparent to-black pointer-events-none" />
                    <div className="z-10 space-y-10">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase text-white leading-none drop-shadow-[0_4px_10px_rgba(185,122,87,0.4)]">{displayData.name}</h2>)}
                        <div className="h-px w-32 bg-[#b97a57] mx-auto opacity-30 mt-6" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-[#b97a57]/40 mt-6 italic">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] text-[#b97a57]/30">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
