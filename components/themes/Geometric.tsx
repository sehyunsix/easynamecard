import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { ExternalLink } from 'lucide-react';

export const Geometric: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50 -skew-x-12 -translate-x-16 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-2 h-full pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
                    <div className="p-12 h-full flex flex-col justify-between relative z-10">
                      <div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-slate-900 leading-none mb-2">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-tighter">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1 text-xs font-bold text-slate-400">
                          {renderDraggableField('email', <p className="hover:text-slate-900 transition-colors">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="hover:text-slate-900 transition-colors">{displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100" style={{ color: style.primaryColor }}>
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
