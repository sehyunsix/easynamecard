import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Graffiti: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#121212] text-white relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="absolute top-[-40px] left-[-40px] text-yellow-400 opacity-20 rotate-[-15deg] font-black text-9xl select-none pointer-events-none">YO</div>
                    <div className="relative z-10 space-y-2">
                       <div className="relative inline-block">
                          <div className="absolute top-1 left-1 text-pink-600 opacity-50 blur-sm select-none pointer-events-none text-7xl font-black italic tracking-tighter uppercase">{displayData.name}</div>
                          {renderDraggableField('name', <h2 className="text-7xl font-black italic tracking-tighter uppercase relative drop-shadow-[5px_5px_0px_#ff0055]">{displayData.name}</h2>)}
                       </div>
                       <div className="bg-yellow-400 text-black p-2 rotate-[2deg] shadow-[5px_5px_0px_#000] inline-block font-black text-xl italic uppercase">
                          {renderDraggableField('position', <p>{displayData.position}</p>)}
                       </div>
                    </div>
                    <div className="relative z-10 mt-12 flex justify-between items-end border-t-4 border-white pt-4">
                       <div className="space-y-1 text-xs font-black uppercase italic tracking-widest text-slate-400">
                          {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                          {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                       </div>
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                          <Target size={32} strokeWidth={3} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
