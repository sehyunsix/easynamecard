import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Swiss: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full bg-[#f3f4f6] text-black font-sans relative overflow-hidden grid grid-cols-12 grid-rows-12">
                    <div className="col-span-12 row-span-1 bg-red-600" />
                    <div className="col-span-1 row-span-11 bg-black" />
                    <div className="col-span-11 row-span-11 p-12 flex flex-col justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xl font-bold mt-4 lowercase opacity-40">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t-2 border-black pt-6">
                        <div className="space-y-1 text-xs font-bold uppercase tracking-tighter">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-[10px] font-black leading-none text-right">
                          <p>CH-2025</p>
                          <p>DESIGN_STD</p>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
