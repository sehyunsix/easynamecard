import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const Chalk: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 bg-[#1a1a1a] text-white relative overflow-hidden flex flex-col justify-center items-center text-center" style={{ border: '4px solid #fff', borderRadius: '4px', boxShadow: 'inset 0 0 50px #000' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-board.png')]" />
                    <div className="z-10 space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-bold" style={{ fontFamily: 'Chalkboard, Comic Sans MS, sans-serif' }}>{displayData.name}</h2>)}
                      <div className="w-32 h-1 bg-white mx-auto opacity-50" style={{ borderRadius: '50% / 100%' }} />
                      {renderDraggableField('position', <p className="text-lg italic opacity-80">{displayData.position}</p>)}
                      <div className="pt-6 space-y-1 text-sm opacity-60">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
);
