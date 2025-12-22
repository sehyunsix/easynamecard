import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Patchwork: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white relative overflow-hidden grid grid-cols-2 grid-rows-2">
                    <div className="bg-slate-100 p-8 flex flex-col justify-center items-center text-center border-r-2 border-b-2 border-slate-200">
                      {renderDraggableField('name', <h2 className="text-3xl font-black tracking-tighter text-slate-900 leading-none italic uppercase">{displayData.name}</h2>)}
                    </div>
                    <div className="bg-white p-8 flex flex-col justify-center items-center text-center border-b-2 border-slate-200">
                      {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-slate-400 italic">{displayData.position}</p>)}
                    </div>
                    <div className="bg-white p-8 flex flex-col justify-center items-center text-center border-r-2 border-slate-200">
                      <Target size={40} strokeWidth={1} className="text-slate-200" />
                    </div>
                    <div className="bg-slate-50 p-8 flex flex-col justify-center items-center text-center">
                      <div className="space-y-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
