import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Retro: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#fdf2f8] flex flex-col justify-between border-8 border-white shadow-[10px_10px_0px_0px_#fbcfe8] relative overflow-hidden font-mono">
                    <div className="absolute top-4 right-4 w-12 h-12 border-4 border-yellow-400 rounded-full opacity-20 pointer-events-none" />
                    <div className="absolute bottom-12 left-12 w-8 h-8 border-4 border-blue-400 rotate-45 opacity-20 pointer-events-none" />

                    <div className="space-y-4">
                      <div className="bg-white p-4 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#1e293b]">
                        {renderDraggableField('name', <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-pink-600">{displayData.position}</p>)}
                      </div>
                    </div>

                    <div className="space-y-2 text-[10px] font-bold text-slate-700">
                      {renderDraggableField('contact', <p className="bg-yellow-200 inline-block px-2">TEL: {displayData.contact}</p>)}
                      <br/>
                      {renderDraggableField('email', <p className="bg-cyan-200 inline-block px-2">MAIL: {displayData.email}</p>)}
                      <br/>
                      {renderDraggableField('github', <p className="bg-pink-200 inline-block px-2">GITHUB: {displayData.github}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
