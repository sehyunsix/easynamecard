import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Industrial: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-[#333] text-[#ddd] relative overflow-hidden font-sans uppercase">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="border-4 border-[#555] p-6 inline-block">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-yellow-500 mt-2">UNIT // {displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-mono">
                        <div className="space-y-1">
                          {renderDraggableField('contact', <p>PH: {displayData.contact}</p>)}
                          {renderDraggableField('email', <p>EM: {displayData.email}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-30 mb-1">SPEC_01 // 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
