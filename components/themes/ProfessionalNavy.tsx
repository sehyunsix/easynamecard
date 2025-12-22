import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Briefcase, Mail, Phone, MapPin, Github } from 'lucide-react';

export const ProfessionalNavy: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#001f3f] text-white relative overflow-hidden flex flex-col justify-between border-t-[8px] border-[#0074d9]">
                    <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight text-white leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-medium tracking-[0.2em] text-[#0074d9] mt-2 uppercase">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg border border-white/10 shadow-xl">
                        <Briefcase size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-16 h-1 bg-[#0074d9]" />
                      <div className="grid grid-cols-2 gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        <div className="space-y-2">
                          {renderDraggableField('email', <p className="flex items-center gap-2 text-white/80"><Mail size={12} className="text-[#0074d9]" /> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="flex items-center gap-2 text-white/80"><Phone size={12} className="text-[#0074d9]" /> {displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end space-y-2">
                          {renderDraggableField('location', <p className="flex items-center justify-end gap-2 text-white/80"><MapPin size={12} className="text-[#0074d9]" /> {displayData.location}</p>)}
                          {renderDraggableField('github', <p className="flex items-center justify-end gap-2 text-white/80"><Github size={12} className="text-[#0074d9]" /> {displayData.github.split('/').pop()}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
