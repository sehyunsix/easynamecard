// @label: 다이내믹 이탤릭
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const DynamicItalic: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#1a1a1a] text-white font-sans relative overflow-hidden">
      {/* Dynamic Slanted Background */}
      <div className="absolute top-0 right-0 w-[60%] h-full bg-[#f27420] -skew-x-12 translate-x-1/4" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-center">
        <div className="space-y-0 -ml-4">
          {renderDraggableField('name', <h1 className="text-8xl font-black italic tracking-tighter uppercase leading-[0.8] mb-2">{displayData.name}</h1>)}
          <div className="flex items-center gap-4">
            <div className="h-2 w-20 bg-[#f27420]" />
            {renderDraggableField('position', <p className="text-xl font-black italic uppercase tracking-widest text-[#f27420]">{displayData.position}</p>)}
          </div>
        </div>

        <div className="absolute bottom-12 left-12 space-y-1 text-[10px] font-bold uppercase tracking-widest opacity-80">
          {displayData.email && renderDraggableField('email', <div>{displayData.email}</div>)}
          {displayData.contact && renderDraggableField('contact', <div>{displayData.contact}</div>)}
        </div>

        <div className="absolute bottom-12 right-12 w-16 h-16 border-2 border-white p-1">
          {renderQRCodeElement(isBack ? 'back' : 'front')}
        </div>
      </div>
    </div>
  );
};

