import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Map: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#e8d5b5] text-[#5d4037] relative overflow-hidden shadow-inner border-[1px] border-[#5d4037]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="absolute top-10 right-10 opacity-10 rotate-12"><Target size={150} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.8em] opacity-40 mb-2">NAVIGATOR_COORD</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter text-[#3e2723] leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-[#5d4037]/80 italic mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t-2 border-[#5d4037]/20 pt-6">
                        <div className="space-y-1 text-[10px] font-bold uppercase">
                          {renderDraggableField('email', <p>E_MAIL: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>C_ONTACT: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] opacity-30 font-black">N 37° 33' 59" E 126° 58' 41"</p>
                          {renderDraggableField('location', <p className="text-[10px] font-bold">{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
