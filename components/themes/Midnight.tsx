import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Midnight: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-slate-950 flex flex-col justify-between items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.15),_transparent_70%)]" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

                    <div className="z-10 space-y-4 pt-12">
                      <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-indigo-500/20 blur-xl rounded-full" />
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-white tracking-tighter leading-none relative">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">{displayData.position}</p>)}
                    </div>

                    <div className="z-10 w-full flex justify-between items-center px-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      {renderDraggableField('email', <span>{displayData.email}</span>)}
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      {renderDraggableField('location', <span>{displayData.location}</span>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
