import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const PopRetro: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-white relative overflow-hidden grid grid-cols-2 grid-rows-2">
                    <div className="bg-pink-400 p-8 flex flex-col justify-center items-center text-center">
                       {renderDraggableField('name', <h2 className="text-3xl font-black uppercase italic text-yellow-300 drop-shadow-[3px_3px_0px_#000] leading-none">{displayData.name}</h2>)}
                    </div>
                    <div className="bg-yellow-300 p-8 flex flex-col justify-center items-center text-center">
                       {renderDraggableField('position', <p className="text-xl font-black uppercase text-pink-500 drop-shadow-[2px_2px_0px_#000]">{displayData.position}</p>)}
                    </div>
                    <div className="bg-cyan-400 p-8 flex flex-col justify-center items-center text-center">
                       <div className="text-[10px] font-black text-white uppercase tracking-widest">Contact Info</div>
                       {renderDraggableField('email', <p className="text-xs font-black text-white mt-2 italic">{displayData.email}</p>)}
                    </div>
                    <div className="bg-white p-8 flex flex-col justify-center items-center text-center border-l-4 border-t-4 border-black">
                       <Target size={48} strokeWidth={4} className="text-slate-900 mb-2" />
                       {renderDraggableField('contact', <p className="text-[10px] font-black uppercase italic">{displayData.contact}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
