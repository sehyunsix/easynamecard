import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Brutalist: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#e2e8f0] text-black font-black relative overflow-hidden border-[12px] border-black">
                    <div className="flex flex-col h-full justify-between uppercase">
                      <div className="space-y-[-10px]">
                        {renderDraggableField('name', <h2 className="text-7xl leading-none tracking-tighter break-all">{displayData.name}</h2>)}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="bg-yellow-400 p-2 shadow-[8px_8px_0px_0px_#000]">
                          {renderDraggableField('position', <p className="text-xl">{displayData.position}</p>)}
                        </div>
                        <div className="text-right text-[10px] space-y-1">
                          {renderDraggableField('email', <p className="bg-white px-1">MAIL_{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="bg-white px-1">TEL_{displayData.contact}</p>)}
                          {renderDraggableField('location', <p className="bg-white px-1">LOC_{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
