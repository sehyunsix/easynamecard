import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const RetroCassetteTape: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#222] text-white relative overflow-hidden rounded-xl border-x-[12px] border-slate-800 shadow-2xl">
                    <div className="h-full bg-[#fafafa] rounded-lg p-6 flex flex-col text-black border-2 border-black/10">
                      <div className="border-2 border-black p-4 flex-1 flex flex-col justify-between relative shadow-[inset_4px_4px_0px_rgba(0,0,0,0.05)]">
                        <div className="absolute top-2 right-4 text-[10px] font-black italic opacity-20 tracking-tighter">HIGH_FIDELITY // 90MIN</div>
                        <div className="space-y-1">
                          <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-2 opacity-40 italic">Side A_Retro</div>
                          {renderDraggableField('name', <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none border-b-2 border-black pb-2 drop-shadow-sm">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-[10px] font-bold uppercase tracking-widest mt-2 bg-yellow-400 px-2 py-0.5 inline-block italic">{displayData.position}</p>)}
                        </div>
                        <div className="flex justify-between items-end pt-4 border-t border-black/10">
                          <div className="space-y-1 text-[9px] font-black uppercase italic text-slate-500">
                            {renderDraggableField('email', <p>{displayData.email}</p>)}
                            {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full border-4 border-black flex items-center justify-center opacity-20">
                              <div className="w-2 h-2 bg-black rounded-sm" />
                            </div>
                            <div className="w-8 h-8 rounded-full border-4 border-black flex items-center justify-center opacity-20">
                              <div className="w-2 h-2 bg-black rounded-sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
