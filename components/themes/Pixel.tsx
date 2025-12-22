import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Pixel: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#1a1c2c] text-[#5d275d] relative overflow-hidden flex flex-col justify-between" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')]" />
                    <div className="bg-[#f4f4f4] p-6 border-b-8 border-r-8 border-[#333] relative">
                      {renderDraggableField('name', <h2 className="text-4xl font-black text-[#1a1c2c] uppercase leading-none">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-[#ef7d57] mt-2 font-mono">{`> ${displayData.position}`}</p>)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1 text-[#b13e53] font-mono text-[9px] font-black">
                        {renderDraggableField('email', <p>@: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>#: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-[#ef7d57] flex items-center justify-center border-4 border-[#1a1c2c] shadow-[4px_4px_0px_0px_#333]">
                        <div className="w-4 h-4 bg-white" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
