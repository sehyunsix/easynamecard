import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Origami: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden flex flex-col justify-between shadow-inner">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-black/5" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-white shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-0" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="border-l-8 pl-6" style={{ borderColor: style.primaryColor }}>
                          {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none text-slate-900">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {renderDraggableField('email', <p className="hover:text-slate-900 transition-colors">{displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-slate-900 transition-colors">{displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="hover:text-slate-900 transition-colors">{displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute bottom-12 right-12 w-16 h-16 opacity-20 pointer-events-none" style={{ color: style.accentColor }}>
                      <Target size={64} strokeWidth={1} />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
