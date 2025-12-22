import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles } from 'lucide-react';

export const PopVibrant: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-yellow-300 relative overflow-hidden flex flex-col border-8 border-black">
                    <div className="flex-1 p-8 flex flex-col justify-center items-start relative">
                      <div className="absolute top-[-20px] left-[-20px] text-pink-500 opacity-10 text-9xl font-black rotate-[-15deg] pointer-events-none">POP</div>
                      <div className="bg-pink-500 text-white p-6 rotate-[-2deg] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative z-10">
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="mt-8 bg-white p-3 rotate-[3deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative z-10 border-4 border-black">
                        {renderDraggableField('position', <p className="text-xl font-black uppercase text-black leading-none">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="bg-cyan-400 p-6 flex justify-between items-center border-t-8 border-black text-[11px] font-black uppercase italic">
                      <div className="space-y-1 text-black">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Sparkles size={24} strokeWidth={3} className="text-yellow-500" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
