import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Newspaper: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#f4f1ea] text-slate-900 font-serif relative overflow-hidden border-double border-4 border-slate-800">
                    <div className="border-b-4 border-slate-900 pb-2 mb-4 flex justify-between items-baseline">
                      <h4 className="text-[10px] font-black uppercase">Edition 2025</h4>
                      <h4 className="text-[10px] font-black uppercase">Professional Profile</h4>
                    </div>
                    <div className="flex-1">
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">{displayData.name}</h2>)}
                      <div className="grid grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                          {renderDraggableField('position', <p className="text-sm font-bold bg-slate-900 text-white px-2 py-1 leading-tight">{displayData.position}</p>)}
                          {renderDraggableField('goal', <p className="text-[11px] leading-snug text-slate-700 italic border-t border-slate-300 pt-2">{displayData.goal}</p>)}
                        </div>
                        <div className="space-y-1 text-[10px] font-bold uppercase tracking-tighter">
                          {renderDraggableField('email', <p className="border-b border-slate-300 pb-1">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="border-b border-slate-300 pb-1">{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
