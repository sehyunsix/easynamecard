// @label: 모던 임팩트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const ModernImpact: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-white text-black font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-4 bg-[#f27420]" />
      <div className="absolute bottom-0 left-0 w-full h-4 bg-[#f27420]" />
      
      <div className="absolute inset-0 p-16 flex flex-col justify-between">
        <div className="space-y-2">
          {renderDraggableField('name', <h2 className="text-6xl font-black italic uppercase tracking-tighter leading-none border-b-8 border-black pb-4">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-lg font-black italic text-[#f27420] uppercase tracking-[0.2em]">{displayData.position}</p>)}
        </div>

        <div className="flex justify-between items-center">
          <div className="grid grid-cols-1 gap-1 text-xs font-bold uppercase">
            {displayData.email && renderDraggableField('email', <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#f27420]" /> {displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#f27420]" /> {displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#f27420]" /> {displayData.location}</div>)}
          </div>
          <div className="w-20 h-20 bg-black p-1">
            <div className="w-full h-full bg-white p-1">
              {renderQRCodeElement(isBack ? 'back' : 'front')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

