import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Concrete: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#999] text-slate-900 relative overflow-hidden border-8 border-slate-200">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter leading-none text-slate-800 uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{displayData.name}</h2>)}
                        <div className="bg-yellow-400 px-3 py-1 inline-block mt-4 shadow-lg">
                          {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1 text-[10px] font-black uppercase tracking-tighter text-slate-700">
                          {renderDraggableField('email', <p className="border-b border-slate-800">EML: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-[8px] font-bold opacity-30 uppercase">
                          <p>INDUSTRIAL_STANDARD</p>
                          <p>EST_2025_REF_01</p>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
