import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const PixelAdventure: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#323353] text-white relative overflow-hidden flex flex-col justify-between shadow-2xl border-4 border-[#1a1c2c]" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')] pointer-events-none" />
                    <div className="bg-[#4fb2aa] p-8 border-b-8 border-r-8 border-[#1a1c2c] relative shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
                      <div className="absolute top-2 right-2 w-6 h-6 bg-white opacity-10" />
                      <div className="flex justify-between items-center mb-4 border-b-2 border-white/20 pb-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#1a1c2c]">Player_Info</span>
                        <span className="text-[10px] font-bold text-white italic">LVL. 170</span>
                      </div>
                      {renderDraggableField('name', <h2 className="text-5xl font-black uppercase leading-none italic tracking-tighter drop-shadow-lg text-white">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-white mt-4 bg-[#1a1c2c] px-3 py-1 inline-block uppercase italic tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-2 text-[#f4f4f4] font-mono text-[10px] font-bold uppercase tracking-widest italic opacity-80">
                        {renderDraggableField('email', <p className="hover:text-[#ef7d57] transition-colors">{`>> EMAIL: ${displayData.email}`}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-[#ef7d57] transition-colors">{`>> PHONE: ${displayData.contact}`}</p>)}
                      </div>
                      <div className="w-16 h-16 bg-[#ef7d57] border-4 border-[#1a1c2c] shadow-[6px_6px_0px_0px_#1a1c2c] flex items-center justify-center rotate-12 group transition-all hover:rotate-0 hover:scale-110">
                        <Target size={32} strokeWidth={3} className="text-white drop-shadow-md" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
