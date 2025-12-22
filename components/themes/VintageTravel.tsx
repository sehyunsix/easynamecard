import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const VintageTravel: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f4e4bc] text-[#3e2723] relative overflow-hidden border-[1px] border-slate-300 shadow-2xl flex flex-col justify-between">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="relative z-10">
                      <div className="bg-[#3e2723] text-[#f4e4bc] px-6 py-2 inline-block shadow-xl italic">
                        {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                      </div>
                      <br/>
                      {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-[#3e2723]/60 mt-4 border-b-2 border-[#3e2723]/20 pb-2 inline-block italic">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-bold uppercase tracking-[0.2em] text-[#3e2723]/40">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>E_MAIL: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>P_HONE: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right">
                        <p className="opacity-20 font-black italic">EST_1978</p>
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
