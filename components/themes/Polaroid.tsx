import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Polaroid: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white shadow-2xl flex flex-col items-center border-[1px] border-slate-200">
                    <div className="w-full aspect-square p-8 pb-4">
                       <div className="w-full h-full bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-yellow-50 opacity-50" />
                          <div className="z-10 text-center">
                            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">IMAGE_PLACEHOLDER</div>
                            <Target size={48} strokeWidth={1} className="text-slate-200 mx-auto" />
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 w-full p-8 pt-0 flex flex-col justify-center font-sketch">
                       {renderDraggableField('name', <h2 className="text-3xl font-black text-slate-800 leading-none mb-1">{displayData.name}</h2>)}
                       {renderDraggableField('position', <p className="text-sm font-bold text-blue-600 mb-4">{displayData.position}</p>)}
                       <div className="flex justify-between items-end text-[10px] font-bold text-slate-400">
                         <div className="space-y-0.5">
                           {renderDraggableField('email', <p>{displayData.email}</p>)}
                           {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         </div>
                         <div className="text-right italic opacity-50">2025.12.21</div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
