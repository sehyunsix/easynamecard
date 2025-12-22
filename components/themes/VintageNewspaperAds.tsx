import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const VintageNewspaperAds: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#f4f1e8] text-slate-900 font-serif relative overflow-hidden border-[1px] border-slate-300 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full border-2 border-slate-900 p-8 relative">
                      <div className="flex justify-center mb-8 border-b-4 border-slate-900 pb-4">
                        <div className="text-5xl font-black tracking-tighter uppercase italic leading-none">Classifieds</div>
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-6">
                          <div className="border-b-2 border-slate-900 pb-4">
                            <label className="text-[10px] font-black uppercase block mb-2 opacity-40 italic">Inquiry Subject:</label>
                            {renderDraggableField('name', <h2 className="text-4xl font-black leading-none uppercase tracking-tighter underline underline-offset-8 decoration-slate-900/20">{displayData.name}</h2>)}
                          </div>
                          <div className="bg-slate-900 text-white p-4 rotate-1 shadow-xl italic">
                            {renderDraggableField('position', <p className="text-xl font-bold leading-tight">{displayData.position}</p>)}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-8 border-t-2 border-slate-900 pt-6">
                          <div className="space-y-1 text-[10px] font-black uppercase italic leading-tight text-slate-600">
                            {renderDraggableField('email', <p className="border-b border-slate-900/10 pb-1">{displayData.email}</p>)}
                            {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="text-right flex flex-col justify-end items-end">
                            <div className="w-12 h-12 border-2 border-slate-900 flex items-center justify-center mb-2 rotate-12 opacity-20">
                              <Target size={32} strokeWidth={1} />
                            </div>
                            {renderDraggableField('location', <p className="text-[8px] font-bold opacity-30 uppercase italic">{displayData.location}</p>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
