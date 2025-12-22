import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Comic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-white text-black font-black relative overflow-hidden border-4 border-black">
                    <div className="absolute top-0 right-0 w-32 h-full bg-yellow-400 -skew-x-6 translate-x-12 border-l-4 border-black pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-[-10px] transform -rotate-2">
                        <div className="bg-red-500 text-white px-4 py-2 inline-block border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                          {renderDraggableField('name', <h2 className="text-5xl uppercase italic">{displayData.name}</h2>)}
                        </div>
                        <br/>
                        <div className="bg-white text-black px-3 py-1 inline-block border-4 border-black mt-2">
                          {renderDraggableField('position', <p className="text-xl">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="bg-white p-3 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_#000]">
                          {renderDraggableField('contact', <p className="text-[10px]">{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-[10px] font-bold space-y-1">
                          {renderDraggableField('email', <p className="bg-yellow-200 px-1 border-2 border-black">{displayData.email}</p>)}
                          {renderDraggableField('location', <p className="bg-cyan-200 px-1 border-2 border-black">{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
