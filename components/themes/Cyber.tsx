import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Cyber: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-black text-lime-400 font-mono relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] opacity-30">ENCRYPTED_ID: {Math.random().toString(16).slice(2, 10)}</div>
                    <div className="relative z-10 space-y-8">
                      <div className="border-b-2 border-lime-500 pb-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold italic tracking-tighter"> {displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-white bg-lime-600 px-2 inline-block"> {displayData.position} </p>)}
                      </div>
                      <div className="space-y-1 text-xs">
                        {renderDraggableField('email', <p><span className="opacity-50">#</span> {displayData.email}</p>)}
                        {renderDraggableField('github', <p><span className="opacity-50">#</span> {displayData.github}</p>)}
                        {renderDraggableField('location', <p><span className="opacity-50">#</span> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-lime-500" />
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
