// @label: 오렌지 볼드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const OrangeBold: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-white text-[#f27420] font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f27420]" />
      
      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="relative">
            {renderDraggableField('name', <h2 className="text-7xl font-black tracking-tighter italic uppercase leading-none mix-blend-difference text-white">{displayData.name}</h2>)}
          </div>
          <div className="inline-block bg-[#f27420] text-white px-4 py-1 text-sm font-black uppercase tracking-widest italic">
            {renderDraggableField('position', <span>{displayData.position}</span>)}
          </div>
        </div>

        <div className="flex items-end gap-12">
          <div className="space-y-2 text-[11px] font-black uppercase tracking-tighter">
            {displayData.email && renderDraggableField('email', <div className="border-b-2 border-[#f27420] pb-0.5">{displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div className="border-b-2 border-[#f27420] pb-0.5">{displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div className="border-b-2 border-[#f27420] pb-0.5">{displayData.location}</div>)}
          </div>
          <div className="ml-auto w-20 h-20 bg-[#f27420] p-1.5 rounded-lg shadow-2xl">
            <div className="w-full h-full bg-white p-1 rounded-md">
              {renderQRCodeElement(isBack ? 'back' : 'front')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

