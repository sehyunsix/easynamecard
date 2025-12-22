import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MetalSteel: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-slate-200 text-slate-900 relative overflow-hidden border-8 border-slate-300 flex flex-col justify-between shadow-2xl">
                    <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 pointer-events-none" />
                    <div className="relative z-10">
                       <div className="bg-slate-900 text-white px-6 py-2 inline-block shadow-lg italic">
                          {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                       </div>
                       <br/>
                       {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-4 border-l-4 border-slate-900 pl-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t-2 border-slate-900 pt-6">
                       <div className="space-y-1 text-[10px] font-black uppercase tracking-tighter opacity-60">
                          {renderDraggableField('email', <p>ID_001: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL_782: {displayData.contact}</p>)}
                       </div>
                       <div className="text-right text-[8px] font-bold opacity-30">
                          <p>HARDWARE_INTERFACE_V1</p>
                          <p>ALL_RIGHTS_RESERVED</p>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
