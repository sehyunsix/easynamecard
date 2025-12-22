import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Artdeco: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#1a1a1a] text-[#c5a059] relative overflow-hidden">
                    <div className="absolute inset-0 border-[16px] border-[#c5a059]/20 pointer-events-none" />
                    <div className="absolute inset-4 border border-[#c5a059]/40 pointer-events-none" />
                    <div className="h-full border-2 border-[#c5a059]/60 flex flex-col justify-center items-center text-center p-8">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-[0.1em] uppercase leading-none">{displayData.name}</h2>)}
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
                        </div>
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.5em] font-light italic">{displayData.position}</p>)}
                      </div>
                      <div className="absolute bottom-16 w-full px-12 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold">
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
