import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Vhs: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-black text-white font-mono relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/vhs.png')] pointer-events-none" />
                    <div className="absolute top-4 left-4 text-red-600 font-bold text-xs animate-pulse">● REC</div>
                    <div className="absolute top-4 right-4 text-xs opacity-50">SP 0:00:00</div>
                    <div className="relative z-10 mt-12">
                      <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 blur-sm opacity-50" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase relative bg-black px-2">{displayData.name}</h2>)}
                      </div>
                      <div className="bg-white text-black px-3 py-1 mt-2 inline-block font-black text-sm italic">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-black italic border-t-2 border-white/20 pt-4">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>EMAIL: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>PHONE: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400">PLAY ▶</p>
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
