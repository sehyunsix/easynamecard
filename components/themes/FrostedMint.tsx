import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const FrostedMint: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#e0f2f1] text-[#00695c] relative overflow-hidden flex flex-col justify-center items-center text-center border-[1px] border-white/40 shadow-inner">
                    <div className="absolute inset-0 opacity-30 bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[size:200px_200px] pointer-events-none" />
                    <div className="z-10 bg-white/40 backdrop-blur-xl p-12 rounded-[50px] border border-white/50 shadow-2xl space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tighter text-teal-900 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-[#00695c]/60 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="w-8 h-px bg-[#00695c]/20 mx-auto mt-6" />
                      <div className="pt-6 space-y-1 text-[10px] font-bold text-[#00695c]/40 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
