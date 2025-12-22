import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Gameboy: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#9ca04c] text-[#0f380f] font-mono relative overflow-hidden border-[10px] border-[#8b9331] shadow-inner flex flex-col gap-6">
                    <div className="bg-[#8bac0f] p-6 border-[4px] border-[#0f380f] flex-1 flex flex-col justify-between shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
                       <div className="space-y-1">
                          <div className="text-[10px] font-bold mb-2 flex justify-between uppercase">
                             <span>Player 1</span>
                             <span>HP: 99/99</span>
                          </div>
                          {renderDraggableField('name', <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-[10px] font-bold border-b border-[#0f380f] pb-2 mt-2">{`CLASS: ${displayData.position}`}</p>)}
                       </div>
                       <div className="space-y-1 text-[10px] font-bold uppercase">
                          {renderDraggableField('email', <p>EMAIL_{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>LINK_{displayData.contact}</p>)}
                       </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                       <div className="w-12 h-12 relative">
                          <div className="absolute top-1/2 left-0 w-full h-4 bg-[#0f380f] -translate-y-1/2" />
                          <div className="absolute left-1/2 top-0 h-full w-4 bg-[#0f380f] -translate-x-1/2" />
                       </div>
                       <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#0f380f] shadow-md" />
                          <div className="w-8 h-8 rounded-full bg-[#0f380f] shadow-md" />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
