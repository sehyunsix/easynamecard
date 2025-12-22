import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const PixelCity: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#1a1c2c] text-[#f4f4f4] relative overflow-hidden flex flex-col justify-between" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')] pointer-events-none" />
                    <div className="bg-[#333c57] p-6 border-b-4 border-r-4 border-black relative">
                      {renderDraggableField('name', <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none text-[#ef7d57]">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-white mt-2 bg-[#1a1c2c] px-2 py-1 inline-block uppercase tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="flex justify-between items-end border-t-2 border-black pt-4">
                      <div className="space-y-1 text-[#f4f4f4] font-mono text-[9px] font-bold uppercase tracking-widest">
                        {renderDraggableField('email', <p>EMAIL: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>COMMS: {displayData.contact}</p>)}
                      </div>
                      <div className="w-10 h-10 bg-[#ef7d57] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                        <Target size={24} strokeWidth={2} />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
