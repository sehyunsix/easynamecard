// @label: 얼라이크 브랜드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const AlikeBrand: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#f27420] text-white font-sans relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="flex flex-col items-center justify-center flex-1 space-y-2">
          {renderDraggableField('name', <h1 className="text-6xl font-black italic tracking-tighter uppercase leading-none">{displayData.name}</h1>)}
          <div className="h-1.5 w-24 bg-white" />
          {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.3em] opacity-90 uppercase mt-2">{displayData.position}</p>)}
        </div>

        <div className="flex justify-between items-end border-t border-white/30 pt-8">
          <div className="space-y-1 text-[10px] font-bold tracking-wider">
            {displayData.email && renderDraggableField('email', <div>{displayData.email}</div>)}
            {displayData.contact && renderDraggableField('contact', <div>{displayData.contact}</div>)}
          </div>
          <div className="w-16 h-16 bg-white p-1 rounded-sm shadow-xl">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

