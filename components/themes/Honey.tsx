import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Honey: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fffde7] text-[#5d4037] relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fbc02d 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#fbc02d] shadow-lg pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="w-20 h-20 bg-[#fbc02d] rounded-full flex items-center justify-center mx-auto shadow-xl relative">
                         <div className="w-16 h-16 rounded-full border-2 border-white/20" />
                         <div className="absolute top-[-10px] right-[-10px] text-yellow-600 opacity-20 rotate-12"><Target size={40} /></div>
                      </div>
                      <div className="space-y-2">
                         {renderDraggableField('name', <h2 className="text-5xl font-black text-[#5d4037] tracking-tighter">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-yellow-700 uppercase tracking-[0.4em]">{displayData.position}</p>)}
                      </div>
                      <div className="pt-6 space-y-1 text-[10px] font-bold text-yellow-800/40 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
