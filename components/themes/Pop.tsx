import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const Pop: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full flex flex-col relative overflow-hidden bg-yellow-400">
                    <div className="h-1/3 bg-slate-900 p-8 flex items-end">
                      {renderDraggableField('name', <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none">{displayData.name}</h2>)}
                    </div>
                    <div className="h-2/3 p-8 flex flex-col justify-between">
                      {renderDraggableField('position', <p className="text-2xl font-black text-slate-900 uppercase tracking-tight -mt-12 bg-white px-4 py-1 inline-block self-start shadow-[6px_6px_0px_0px_#be185d]">{displayData.position}</p>)}

                      <div className="flex justify-between items-end font-black text-slate-900">
                        <div className="text-sm space-y-1">
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('email', <p className="underline">{displayData.email}</p>)}
                        </div>
                        <div className="w-16 h-16 bg-white border-4 border-slate-900 flex items-center justify-center -rotate-12">
                          <Target size={32} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
