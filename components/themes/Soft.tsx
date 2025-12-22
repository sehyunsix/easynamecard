import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Mail, Phone } from 'lucide-react';

export const Soft: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-slate-50 text-slate-800 relative overflow-hidden">
                    <div className="h-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 flex flex-col justify-between border border-slate-100">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-semibold text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-2xl flex items-center justify-center">
                            <Mail size={14} className="text-slate-400" />
                          </div>
                          {renderDraggableField('email', <p className="text-[10px] font-bold text-slate-600">{displayData.email}</p>)}
                        </div>
                        <div className="space-y-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-2xl flex items-center justify-center">
                            <Phone size={14} className="text-slate-400" />
                          </div>
                          {renderDraggableField('contact', <p className="text-[10px] font-bold text-slate-600">{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
