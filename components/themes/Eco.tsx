import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const Eco: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#f1f5f1] text-emerald-900 relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="flex flex-col h-full justify-between items-start">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-bold text-emerald-950">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-medium text-emerald-700/80">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[10px] font-semibold tracking-wide border-l-2 border-emerald-200 pl-4">
                        {renderDraggableField('email', <p className="flex items-center gap-2"><Mail size={10}/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-2"><Phone size={10}/> {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-2"><MapPin size={10}/> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute top-8 right-10 text-emerald-800/20"><Globe size={80} /></div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
