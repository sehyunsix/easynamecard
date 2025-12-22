import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Zen: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-16 bg-white text-slate-900 relative overflow-hidden flex justify-between items-center">
                    <div className="absolute top-0 right-0 w-1 h-full bg-slate-100" />
                    <div className="flex flex-col gap-8">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-widest" style={{ writingMode: 'vertical-rl' }}>{displayData.name}</h2>)}
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between items-end text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                      <div className="space-y-4 pt-12" style={{ writingMode: 'vertical-rl' }}>
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                      <div className="space-y-4 pb-4">
                        {renderDraggableField('email', <p style={{ writingMode: 'vertical-rl' }}>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p style={{ writingMode: 'vertical-rl' }}>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
