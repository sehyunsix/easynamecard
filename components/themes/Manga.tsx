import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Manga: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full bg-white text-black font-sans relative overflow-hidden grid grid-cols-12 h-full border-4 border-black">
                    <div className="col-span-7 p-10 flex flex-col justify-between relative border-r-4 border-black">
                      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
                      <div className="z-10 bg-black text-white p-6 rotate-[-2deg] shadow-[10px_10px_0px_0px_#ddd]">
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase leading-none italic">{displayData.name}</h2>)}
                      </div>
                      <div className="z-10 self-end mt-12 bg-white border-4 border-black p-2 rotate-[3deg]">
                        {renderDraggableField('position', <p className="text-xl font-black uppercase italic">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="col-span-5 bg-slate-50 p-6 flex flex-col justify-between">
                      <div className="h-1/2 border-2 border-black bg-white flex items-center justify-center text-4xl font-black italic opacity-20">?!</div>
                      <div className="space-y-2 pt-6">
                        <div className="text-[9px] font-black uppercase leading-tight bg-yellow-400 p-1 border-2 border-black inline-block">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                        </div>
                        <br/>
                        <div className="text-[9px] font-black uppercase leading-tight bg-pink-400 p-1 border-2 border-black inline-block">
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
