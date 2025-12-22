import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Poker: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-white text-slate-900 relative overflow-hidden border-[16px] border-slate-50 shadow-inner rounded-xl">
                    <div className="absolute top-4 left-4 flex flex-col items-center leading-none text-red-600 font-bold">
                      <div className="text-xl">A</div>
                      <div className="text-2xl">♥</div>
                    </div>
                    <div className="absolute bottom-4 right-4 flex flex-col items-center leading-none text-red-600 font-bold rotate-180">
                      <div className="text-xl">A</div>
                      <div className="text-2xl">♥</div>
                    </div>
                    <div className="h-full border-2 border-red-600/10 rounded-lg flex flex-col justify-center items-center text-center space-y-4">
                      <div className="w-24 h-32 border-2 border-red-600 rounded-md flex items-center justify-center mb-4">
                        <div className="text-6xl text-red-600">♥</div>
                      </div>
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-black uppercase tracking-tighter text-slate-800">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-red-600 uppercase tracking-[0.3em]">{displayData.position}</p>)}
                      </div>
                      <div className="pt-4 text-[9px] font-bold text-slate-400 uppercase">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
