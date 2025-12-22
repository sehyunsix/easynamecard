import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Globe } from 'lucide-react';

export const Passport: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#e8e4d8] text-[#2c3e50] relative overflow-hidden border-[1px] border-slate-300 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-12 bg-[#2c3e50]/10 flex items-center px-12 justify-between pointer-events-none">
                      <div className="text-[8px] font-black tracking-widest uppercase">Republic of Card</div>
                      <div className="text-[8px] font-black">P &lt; CARD &lt; {displayData.name.toUpperCase()} &lt;&lt; 2025</div>
                    </div>
                    <div className="mt-10 flex gap-8">
                      <div className="w-24 h-32 bg-slate-300/30 border-2 border-slate-400/50 flex flex-col items-center justify-center relative">
                        <div className="text-[8px] font-bold opacity-30 text-center uppercase">PHOTO<br/>REQUIRED</div>
                        <div className="absolute inset-0 border-[1px] border-slate-400/20 m-1" />
                        <div className="absolute bottom-1 right-1 opacity-20"><Globe size={24} /></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="border-b border-slate-300">
                          <label className="text-[7px] font-bold text-slate-400 uppercase">Surname / Given Name</label>
                          {renderDraggableField('name', <h2 className="text-2xl font-serif font-black uppercase leading-none">{displayData.name}</h2>)}
                        </div>
                        <div className="border-b border-slate-300">
                          <label className="text-[7px] font-bold text-slate-400 uppercase">Occupation / Position</label>
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase">{displayData.position}</p>)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-b border-slate-300">
                            <label className="text-[7px] font-bold text-slate-400 uppercase">Nationality</label>
                            <p className="text-[10px] font-bold">CARDHOLDER</p>
                          </div>
                          <div className="border-b border-slate-300">
                            <label className="text-[7px] font-bold text-slate-400 uppercase">Date of Issue</label>
                            <p className="text-[10px] font-bold">21 DEC 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-12 right-12 opacity-10 rotate-[-20deg] pointer-events-none">
                      <div className="w-20 h-20 border-4 border-blue-900 rounded-full flex flex-col items-center justify-center text-blue-900 font-black">
                        <div className="text-[8px]">IMMIGRATION</div>
                        <div className="text-lg italic">PASSED</div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
