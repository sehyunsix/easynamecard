import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Bento: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-4 bg-slate-50 relative overflow-hidden grid grid-cols-12 grid-rows-12 gap-2 h-full">
                    <div className="col-span-8 row-span-8 bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-slate-100">
                       <div className="space-y-1">
                          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Introduction</div>
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{displayData.name}</h2>)}
                       </div>
                       {renderDraggableField('position', <p className="text-lg font-bold text-slate-400 italic tracking-tighter">{displayData.position}</p>)}
                    </div>
                    <div className="col-span-4 row-span-4 bg-blue-500 p-6 rounded-2xl shadow-lg flex items-center justify-center text-white text-center">
                       <div className="space-y-1">
                          <div className="text-[10px] font-black uppercase opacity-60">Status</div>
                          <div className="text-lg font-black italic">ACTIVE</div>
                       </div>
                    </div>
                    <div className="col-span-4 row-span-8 bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between text-white border border-white/10">
                       <div className="text-[10px] font-black text-slate-500 uppercase">Connect</div>
                       <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                          {renderDraggableField('email', <p>{displayData.email.split('@')[0]}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    <div className="col-span-8 row-span-4 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100">
                       <div className="max-w-[70%]">
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-tight">"{displayData.goal}"</p>)}
                       </div>
                       <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                          <Target size={24} strokeWidth={1} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
