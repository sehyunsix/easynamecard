import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Bauhaus: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full bg-[#e5e5e5] text-black font-sans relative overflow-hidden grid grid-cols-12 h-full">
                    <div className="col-span-4 bg-yellow-400 h-full flex items-center justify-center border-r-8 border-black">
                      {renderDraggableField('name', <h2 className="text-6xl font-black -rotate-90 tracking-tighter uppercase">{displayData.name}</h2>)}
                    </div>
                    <div className="col-span-8 flex flex-col justify-between p-12">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-black" />
                        <div className="w-12 h-12 bg-blue-600 border-4 border-black" />
                      </div>
                      <div className="space-y-6">
                        <div className="bg-black text-white p-4">
                          {renderDraggableField('position', <p className="text-2xl font-black uppercase italic leading-none">{displayData.position}</p>)}
                        </div>
                        <div className="space-y-1 text-xs font-black uppercase tracking-tighter border-l-8 border-red-600 pl-4">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
