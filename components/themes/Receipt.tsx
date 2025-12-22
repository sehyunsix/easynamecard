import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Receipt: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#f8f8f8] text-[#333] font-mono relative overflow-hidden shadow-inner border-t-[30px] border-slate-200">
                    <div className="absolute top-[-25px] left-0 w-full flex justify-around opacity-50">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />
                      ))}
                    </div>
                    <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 mb-4">
                      <div className="text-[10px] font-black opacity-40 uppercase mb-1">*** OFFICIAL RECEIPT ***</div>
                      {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                    </div>
                    <div className="space-y-2 text-[11px] font-bold uppercase">
                      <div className="flex justify-between">
                        <span>POSITION:</span>
                        {renderDraggableField('position', <span className="text-right">{displayData.position}</span>)}
                      </div>
                      <div className="flex justify-between">
                        <span>EMAIL:</span>
                        {renderDraggableField('email', <span className="text-right">{displayData.email}</span>)}
                      </div>
                      <div className="flex justify-between">
                        <span>CONTACT:</span>
                        {renderDraggableField('contact', <span className="text-right">{displayData.contact}</span>)}
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300 text-center">
                      <div className="text-[14px] font-black mb-1 tracking-[0.2em]">{`$ ${displayData.name.length * 1000}.00`}</div>
                      <div className="text-[8px] opacity-40">THANK YOU FOR VISITING!</div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
