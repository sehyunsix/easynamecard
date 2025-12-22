import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Techno: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-slate-900 text-purple-400 font-mono relative overflow-hidden border-2 border-purple-500/20">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,_transparent_1px)] bg-[size:20px_20px]" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className="border-l-4 border-purple-500 pl-4">
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-[10px] font-bold mt-1 text-purple-300 tracking-widest">{`// USER_ROLE: ${displayData.position}`}</p>)}
                        </div>
                        <div className="text-[8px] text-purple-900 font-black px-2 py-1 bg-purple-400 rounded-sm">TECH_OS_v4.0</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase">
                        <div className="bg-slate-800/50 p-2 border border-purple-500/30">
                          <p className="text-purple-600 mb-1">CONTACT_INFO</p>
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="bg-slate-800/50 p-2 border border-purple-500/30">
                          <p className="text-purple-600 mb-1">LOCATION_DATA</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                          {renderDraggableField('github', <p>{displayData.github.replace('github.com/', 'G://')}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
