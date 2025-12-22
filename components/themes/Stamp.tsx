import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { MapPin } from 'lucide-react';

export const Stamp: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-12 bg-[#fdfaf1] text-[#3e2723] relative overflow-hidden border-[1px] border-slate-200 shadow-inner">
                    <div className="absolute top-8 right-8 w-24 h-28 bg-[#fafafa] border-[4px] border-white shadow-md rotate-[5deg] flex flex-col items-center justify-center p-2">
                       <div className="w-full h-full bg-[#3e2723]/10 border-[1px] border-dashed border-[#3e2723]/20 flex items-center justify-center text-[#3e2723]/30">
                         <MapPin size={32} />
                       </div>
                    </div>
                    <div className="absolute top-12 right-24 opacity-10 rotate-[-15deg] pointer-events-none">
                      <div className="w-20 h-20 border-2 border-red-900 rounded-full flex flex-col items-center justify-center text-red-900 font-bold">
                        <div className="text-[8px]">POSTAL SERVICE</div>
                        <div className="text-xs">2025.12.21</div>
                      </div>
                    </div>
                    <div className="h-full flex flex-col justify-between max-w-[60%]">
                      <div className="space-y-4">
                         <div className="space-y-1">
                           <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-30">Registered Mail</div>
                           {renderDraggableField('name', <h2 className="text-4xl font-serif italic font-bold tracking-tight">{displayData.name}</h2>)}
                         </div>
                         <div className="w-12 h-px bg-[#3e2723]/20" />
                         {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-widest text-[#5d4037]">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[10px] font-serif italic text-slate-500">
                        {renderDraggableField('email', <p className="border-b border-slate-200 pb-1 flex items-center gap-3">To: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="border-b border-slate-200 pb-1 flex items-center gap-3">P: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-3">Loc: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
