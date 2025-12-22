import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const BentoCleanCut: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-6 bg-slate-100 relative overflow-hidden grid grid-cols-12 grid-rows-12 gap-3 h-full">
                    <div className="col-span-8 row-span-8 bg-white p-10 rounded-[30px] shadow-sm flex flex-col justify-between border border-slate-200/50">
                      <div className="space-y-2">
                        <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2 opacity-40 italic">Overview_Panel</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none italic">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-xl font-bold text-slate-400 italic tracking-tighter border-l-4 border-blue-500 pl-6 mt-6">{displayData.position}</p>)}
                    </div>
                    <div className="col-span-4 row-span-4 bg-blue-600 p-8 rounded-[30px] shadow-lg flex items-center justify-center text-white text-center border-4 border-white/10 group transition-all hover:scale-[1.02]">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase opacity-60 tracking-widest">Status</div>
                        <div className="text-2xl font-black italic tracking-tighter">ONLINE</div>
                      </div>
                    </div>
                    <div className="col-span-4 row-span-8 bg-slate-900 p-8 rounded-[30px] shadow-2xl flex flex-col justify-between text-white border border-white/10 group transition-all hover:scale-[1.02]">
                      <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Connect_V8</div>
                      <div className="space-y-6 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {renderDraggableField('email', <p className="hover:text-blue-400 transition-colors">{displayData.email.split('@')[0]}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-blue-400 transition-colors">{displayData.contact}</p>)}
                      </div>
                    </div>
                    <div className="col-span-8 row-span-4 bg-white p-8 rounded-[30px] shadow-sm flex items-center justify-between border border-slate-200/50 group transition-all hover:scale-[1.02]">
                      <div className="max-w-[75%] border-r border-slate-100 pr-8">
                        {renderDraggableField('goal', <p className="text-sm text-slate-500 italic leading-tight font-medium opacity-80">"{displayData.goal}"</p>)}
                      </div>
                      <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 shadow-inner group-hover:text-blue-500 transition-colors">
                        <Target size={32} strokeWidth={1} />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
