import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Pixelart: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#323353] text-white relative overflow-hidden flex flex-col justify-between" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')] pointer-events-none" />
                    <div className="bg-[#4fb2aa] p-6 border-b-8 border-r-8 border-[#1a1c2c] relative">
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white opacity-20" />
                      {renderDraggableField('name', <h2 className="text-4xl font-black uppercase leading-none italic">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-white mt-2 bg-[#1a1c2c] px-2 py-1 inline-block">LVL. 99 // {displayData.position}</p>)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1 text-[#f4f4f4] font-mono text-[9px] font-bold uppercase">
                        {renderDraggableField('email', <p>EMAIL_{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>PHONE_{displayData.contact}</p>)}
                      </div>
                      <div className="w-14 h-14 bg-[#ef7d57] border-4 border-[#1a1c2c] shadow-[4px_4px_0px_0px_#1a1c2c] flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rotate-45" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
