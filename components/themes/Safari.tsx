import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Globe } from 'lucide-react';

export const Safari: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f4e4bc] text-[#3d2b1f] relative overflow-hidden border-[12px] border-[#d4c49c] shadow-inner">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none" />
                    <div className="absolute -right-10 -bottom-10 opacity-10 rotate-[-15deg]"><Globe size={200} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="bg-[#3d2b1f] text-[#f4e4bc] px-6 py-2 inline-block shadow-xl">
                          {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                        </div>
                        <br/>
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-[#3d2b1f] pb-2 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#3d2b1f]/60">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E_MAIL: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>P_HONE: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="opacity-30">EST. 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
