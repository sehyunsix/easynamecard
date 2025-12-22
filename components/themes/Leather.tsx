import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Leather: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#3e2723] text-[#d7ccc8] relative overflow-hidden flex flex-col justify-between border-[12px] border-[#2b1b17] shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />
                    <div className="absolute inset-0 border-[1px] border-white/10 m-2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1 border-l-4 border-yellow-700/50 pl-6">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tighter uppercase drop-shadow-md">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-yellow-700/80 uppercase tracking-[0.4em] italic">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold opacity-60">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>EML // {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL // {displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border border-white/20" />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
