import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Scroll: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-[#f5e6d3] text-[#4a3421] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-y-[20px] border-[#d2b48c]/30">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full border-x-[40px] border-transparent border-x-[#d2b48c]/10 pointer-events-none" />
                    <div className="z-10 space-y-6">
                       <div className="space-y-1">
                          <div className="text-[10px] font-serif italic opacity-40 mb-2 tracking-[0.4em]">Ancient Knowledge</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter leading-none border-b-2 border-[#4a3421]/20 pb-4">{displayData.name}</h2>)}
                       </div>
                       {renderDraggableField('position', <p className="text-sm font-serif italic text-[#7a5c3e] tracking-widest">{displayData.position}</p>)}
                       <div className="pt-8 space-y-2 text-[11px] font-serif opacity-60">
                          {renderDraggableField('email', <p className="underline decoration-[#4a3421]/20 underline-offset-4">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
