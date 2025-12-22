import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Sticker: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#f0f0f0] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
                    <div className="z-10 relative flex flex-col h-full gap-4">
                      <div className="bg-white p-6 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#000] rotate-[-2deg] self-start">
                        {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 uppercase">{displayData.name}</h2>)}
                      </div>
                      <div className="bg-blue-500 text-white p-3 rounded-xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_#000] rotate-[3deg] self-end mt-4">
                        {renderDraggableField('position', <p className="text-lg font-bold">{displayData.position}</p>)}
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="bg-yellow-400 p-2 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] inline-block">
                          {renderDraggableField('email', <p className="text-[10px] font-bold">{displayData.email}</p>)}
                        </div>
                        <br/>
                        <div className="bg-pink-400 p-2 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] inline-block">
                          {renderDraggableField('contact', <p className="text-[10px] font-bold">{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
