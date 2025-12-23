// @label: 바이너리 매트릭스
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const BinaryMatrix: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  const binaryString = "01001000 01001001 01010010 01000101 00100000 01001101 01000101"; // "HIRE ME"

  return (
    <div className="w-full h-full bg-[#000000] font-mono relative overflow-hidden" style={{ color: style.primaryColor }}>
      <div
        className="absolute inset-0 opacity-10 text-[8px] leading-[8px] break-all p-2 select-none pointer-events-none uppercase"
        style={{ color: style.primaryColor }}
      >
        {Array(20).fill(binaryString).join(' ')}
      </div>

      <div className="absolute inset-0 p-12 flex flex-col justify-center items-center text-center space-y-6">
        <div
          className="space-y-2 border-y py-6 px-10"
          style={{ borderColor: `${style.primaryColor}4d` }}
        >
          {renderDraggableField('name', <h1 className="text-5xl font-bold tracking-[0.2em]">{displayData.name}</h1>)}
          {renderDraggableField('position', <p className="text-sm opacity-80">[{displayData.position.toUpperCase()}]</p>)}
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-[10px] tracking-widest opacity-70">
          {displayData.email && renderDraggableField('email', <div>E: {displayData.email}</div>)}
          {displayData.github && renderDraggableField('github', <div>G: {displayData.github}</div>)}
          {displayData.contact && renderDraggableField('contact', <div>T: {displayData.contact}</div>)}
          {displayData.location && renderDraggableField('location', <div>L: {displayData.location}</div>)}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 p-1 bg-black/50" style={{ border: `1px solid ${style.primaryColor}` }}>
        {renderQRCodeElement(isBack ? 'back' : 'front')}
      </div>
    </div>
  );
};

