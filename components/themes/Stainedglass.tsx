import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Stainedglass: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 bg-black relative overflow-hidden flex flex-col">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-60 pointer-events-none">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="border border-black/40" style={{
                           backgroundColor: i % 3 === 0 ? style.primaryColor : i % 3 === 1 ? style.accentColor : '#fff',
                           opacity: 0.3 + (Math.random() * 0.4)
                         }} />
                       ))}
                    </div>
                    <div className="flex-1 p-12 flex flex-col justify-center items-center text-center z-10">
                       <div className="bg-black/40 backdrop-blur-xl p-10 border border-white/20 shadow-2xl">
                         {renderDraggableField('name', <h2 className="text-5xl font-serif font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] leading-none mb-4">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-sm font-bold text-white/60 tracking-[0.4em] uppercase mb-8">{displayData.position}</p>)}
                         <div className="space-y-2 text-[9px] font-bold text-white/40 uppercase tracking-widest">
                           {renderDraggableField('email', <p>{displayData.email}</p>)}
                           {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
