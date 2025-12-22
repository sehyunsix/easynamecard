import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const BrutalistColor: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-yellow-400 text-black font-sans relative overflow-hidden flex flex-col border-8 border-black">
                    <div className="flex-1 p-10 flex flex-col justify-between items-start border-b-8 border-black">
                      <div className="bg-pink-400 text-white p-6 border-4 border-black rotate-[-2deg] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="bg-white p-4 border-4 border-black rotate-[3deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mt-12 self-end">
                        {renderDraggableField('position', <p className="text-2xl font-black uppercase italic leading-none">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="h-1/3 bg-cyan-400 p-8 flex justify-between items-center text-[11px] font-black uppercase italic">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p className="bg-white px-2 py-0.5 border-2 border-black inline-block mb-1">{displayData.email}</p>)}
                        <br/>
                        {renderDraggableField('contact', <p className="bg-white px-2 py-0.5 border-2 border-black inline-block">{displayData.contact}</p>)}
                      </div>
                      <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center text-4xl font-black italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">?</div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
