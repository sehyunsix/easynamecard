// @label: 정밀 그리드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Target } from 'lucide-react';

export const PrecisionGrid: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#f8f9fa] text-[#212529] font-mono relative overflow-hidden border border-[#dee2e6]">
      {/* Precision Grid Lines */}
      <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      
      {/* Coordinate Markers */}
      <div className="absolute top-1 left-1 text-[8px] opacity-30 select-none">X:0.00 Y:0.00</div>
      <div className="absolute top-1 right-1 text-[8px] opacity-30 select-none">X:1.00 Y:0.00</div>
      <div className="absolute bottom-1 left-1 text-[8px] opacity-30 select-none">X:0.00 Y:1.00</div>
      <div className="absolute bottom-1 right-1 text-[8px] opacity-30 select-none">X:1.00 Y:1.00</div>

      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="border-l-4 border-black pl-6 py-2">
              {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
              {renderDraggableField('position', <p className="text-xs mt-2 font-bold opacity-60">SYSTEM.ENGINEER / QUANT.DEV</p>)}
            </div>
            {renderDraggableField('role', <p className="text-[10px] bg-black text-white px-2 py-0.5 inline-block">{displayData.position}</p>)}
          </div>
          <Target className="text-black/20" size={48} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-[10px] bg-white/80 backdrop-blur-sm p-4 border border-[#dee2e6]">
          <div className="space-y-1">
            {displayData.email && renderDraggableField('email', <div>EMAIL: {displayData.email}</div>)}
            {displayData.contact && renderDraggableField('contact', <div>TEL: {displayData.contact}</div>)}
          </div>
          <div className="space-y-1 border-l border-[#dee2e6] pl-4">
            {displayData.github && renderDraggableField('github', <div>GITHUB: {displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div>LOCATION: {displayData.location}</div>)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 scale-75 opacity-80">
        {renderQRCodeElement(isBack ? 'back' : 'front')}
      </div>
    </div>
  );
};

