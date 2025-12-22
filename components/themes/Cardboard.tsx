import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Cardboard: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#c2a38e] text-[#4a3728] relative overflow-hidden" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")' }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-black/5" />
                    <div className="h-full border-4 border-[#4a3728]/20 flex flex-col justify-between p-8 border-dashed">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter bg-[#4a3728] text-[#c2a38e] px-4 py-1 inline-block">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold border-2 border-[#4a3728] px-2 py-0.5 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-xs font-bold font-mono">
                        {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
