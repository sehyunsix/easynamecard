import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Embroidery: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden border-[10px] border-[#eee] shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none" />
                    <div className="absolute inset-2 border-[4px] border-dashed border-slate-200 pointer-events-none" />
                    <div className="h-full border-2 border-slate-100 bg-white shadow-lg p-10 flex flex-col justify-between items-center text-center">
                       <div className="space-y-4">
                         <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-blue-400 mb-2 mx-auto">
                            <Target size={24} />
                         </div>
                         <div className="space-y-1">
                           {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">{displayData.name}</h2>)}
                           {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                         </div>
                       </div>
                       <div className="space-y-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         <div className="w-8 h-px bg-slate-100 mx-auto my-2" />
                         {renderDraggableField('location', <p>{displayData.location}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
