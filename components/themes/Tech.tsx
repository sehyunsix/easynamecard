import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Tech: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-slate-900 text-cyan-400 font-mono relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                         style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee 1px, transparent 1px), linear-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-l-4 border-cyan-500 pl-4 py-2">
                        {renderDraggableField('name', <h2 className="text-3xl font-bold tracking-tighter text-white">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs opacity-70">SYSTEM_DEVELOPER // {displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[10px]">
                        {renderDraggableField('email', <p className="flex items-center gap-2"><span className="text-cyan-600">EMAIL:</span> {displayData.email}</p>)}
                        {renderDraggableField('github', <p className="flex items-center gap-2"><span className="text-cyan-600">SOURCE:</span> {displayData.github}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-2"><span className="text-cyan-600">COORD:</span> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-[8px] text-cyan-900 font-bold opacity-50">VER_2.5_PRO</div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
