import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const RetroTerminal: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#0c1a0c] text-[#33ff33] font-mono relative overflow-hidden border-4 border-[#1a3a1a] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] opacity-40 mb-2">{`[ LOGIN_SUCCESSFUL: ${new Date().toISOString().slice(0,10)} ]`}</div>
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase bg-[#33ff33] text-[#0c1a0c] px-3 py-1 inline-block">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm mt-4 font-bold">{`>> CURRENT_ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="space-y-1 text-[10px] font-bold">
                        {renderDraggableField('email', <p>{`MAILTO: ${displayData.email}`}</p>)}
                        {renderDraggableField('contact', <p>{`COMMS: ${displayData.contact}`}</p>)}
                        <div className="pt-4 text-[8px] opacity-30 animate-pulse">_CONNECTED_TO_HOST</div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
