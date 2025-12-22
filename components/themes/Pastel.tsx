import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Pastel: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#fff5f5] text-slate-600 relative overflow-hidden rounded-[40px]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full translate-y-8 -translate-x-8 opacity-50" />
                    <div className="flex flex-col h-full justify-between items-center text-center z-10 relative">
                      <div className="space-y-2 pt-8">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[30px] shadow-sm border border-pink-100">
                          {renderDraggableField('name', <h2 className="text-4xl font-bold text-pink-400">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm font-medium text-blue-300 mt-1">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-1 text-xs font-semibold pb-4 text-slate-400">
                        {renderDraggableField('email', <p className="bg-white px-3 py-1 rounded-full">{displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="bg-white px-3 py-1 rounded-full">{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
