import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const WarmWoodGrain: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#4e342e] text-[#d7ccc8] relative overflow-hidden border-[10px] border-[#3e2723] shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none" />
                    <div className="h-full border-2 border-white/5 p-10 flex flex-col justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-black tracking-tighter leading-none opacity-90 text-white">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-[#d4c49c] mt-4 border-l-2 border-[#d4c49c] pl-4">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold opacity-40 tracking-widest">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E_MAIL // {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>C_ONTACT // {displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] opacity-20">EST. 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
