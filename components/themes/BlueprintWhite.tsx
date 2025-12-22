import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const BlueprintWhite: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-white text-blue-600 font-mono relative overflow-hidden border-2 border-blue-100 shadow-inner">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,116,217,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,116,217,0.05) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-[8px] font-black uppercase tracking-[0.4em] text-blue-300 mb-2">Technical_Blueprint_V.170</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-widest uppercase border-b-4 border-blue-600 pb-2 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 mt-4">{`[ MODULE_LEAD: ${displayData.position} ]`}</p>)}
                      </div>
                      <div className="flex justify-between items-end w-full border-t-2 border-blue-100 pt-6 text-[10px] font-bold uppercase tracking-tighter text-blue-400">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{`E_ADDR: ${displayData.email}`}</p>)}
                          {renderDraggableField('contact', <p>{`T_LINE: ${displayData.contact}`}</p>)}
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-[8px] opacity-30 italic mb-2 tracking-widest">EST_2025_PROJECT</p>
                          {renderDraggableField('location', <p>{`COORDS: ${displayData.location}`}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
