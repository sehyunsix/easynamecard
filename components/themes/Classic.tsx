import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Classic: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafaf9] flex flex-col items-center justify-between text-slate-800 border-[12px] border-white shadow-inner">
                    <div className="text-center space-y-2">
                      {renderDraggableField('name', <h2 className="text-4xl font-serif italic text-slate-900">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                    </div>
                    <div className="w-full h-px bg-slate-200" />
                    <div className="w-full flex justify-between items-end text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                      <div className="space-y-1">
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                      <div className="text-right space-y-1">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('blog', <p>{displayData.blog}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
);
