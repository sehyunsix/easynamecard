import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { MapPin } from 'lucide-react';

export const Organic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#f8fafc] flex flex-col items-center justify-between text-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/50 rounded-full translate-y-24 -translate-x-24 pointer-events-none" />

                    <div className="text-center z-10 mt-8">
                      {renderDraggableField('name', <h2 className="text-4xl font-serif text-emerald-900 mb-1">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-medium text-emerald-600/70 italic">{displayData.position}</p>)}
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-center text-[10px] font-medium text-slate-400 z-10 mb-4">
                      {renderDraggableField('location', <p className="flex items-center justify-center gap-1"><MapPin size={10} /> {displayData.location}</p>)}
                      <div className="flex gap-4 justify-center">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
