import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Globe, Target } from 'lucide-react';

export const Botanical: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#faf9f6] text-[#2d3a2d] relative overflow-hidden font-serif">
                    <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 rotate-12 pointer-events-none">
                      <Globe size={200} strokeWidth={1} />
                    </div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 -rotate-12 pointer-events-none">
                      <Target size={200} strokeWidth={1} />
                    </div>
                    <div className="h-full border-2 border-[#2d3a2d]/10 flex flex-col justify-between p-8">
                      <div className="text-center">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold italic mb-1">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.3em] opacity-60 font-sans">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-center text-[10px] font-medium opacity-70 italic">
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                        <div className="flex justify-center gap-4">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
