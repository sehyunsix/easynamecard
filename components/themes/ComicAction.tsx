import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const ComicAction: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-yellow-400 relative overflow-hidden flex flex-col border-8 border-black shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
                    <div className="absolute top-[-30px] right-[-30px] text-pink-500 font-black text-9xl italic opacity-20 pointer-events-none rotate-12">POW!</div>
                    <div className="flex-1 p-8 flex flex-col justify-center items-start relative">
                      <div className="bg-black text-white p-8 rotate-[-3deg] shadow-[12px_12px_0px_0px_#ff0055] relative z-10 border-4 border-white">
                        {renderDraggableField('name', <h2 className="text-6xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="mt-10 bg-white text-black p-4 rotate-[4deg] shadow-[8px_8px_0px_0px_#000] relative z-10 border-4 border-black">
                        {renderDraggableField('position', <p className="text-2xl font-black uppercase italic leading-none">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="bg-white p-6 flex justify-between items-center border-t-8 border-black text-[12px] font-black uppercase italic">
                      <div className="space-y-1">
                        <div className="bg-pink-500 text-white px-3 py-0.5 border-2 border-black inline-block mb-1 italic">{renderDraggableField('email', <span>{displayData.email}</span>)}</div>
                        <br/>
                        <div className="bg-cyan-400 text-black px-3 py-0.5 border-2 border-black inline-block italic">{renderDraggableField('contact', <span>{displayData.contact}</span>)}</div>
                      </div>
                      <div className="w-16 h-16 bg-yellow-400 border-4 border-black rotate-12 flex items-center justify-center shadow-[6px_6px_0px_0px_#000]">
                        <Target size={32} strokeWidth={4} className="text-black" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
