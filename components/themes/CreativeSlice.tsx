// @label: 크리에이티브 슬라이스
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const CreativeSlice: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full text-white font-sans relative overflow-hidden" style={{ backgroundColor: style.primaryColor }}>
      {/* Visual Slices */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[100%] bg-black/10 -rotate-12" />
        <div className="absolute bottom-[-50%] right-[-10%] w-[120%] h-[100%] bg-white/10 rotate-12" />
      </div>

      <div className="absolute inset-0 p-12 flex flex-col justify-between items-start">
        <div className="w-full">
          <div className="bg-white px-6 py-4 inline-block mb-4 shadow-2xl" style={{ color: style.primaryColor }}>
            {renderDraggableField('name', <h1 className="text-6xl font-black italic uppercase tracking-tighter leading-none">{displayData.name}</h1>)}
          </div>
          <div className="pl-2">
            {renderDraggableField('position', <p className="text-xl font-bold italic uppercase tracking-[0.3em] opacity-90">{displayData.position}</p>)}
          </div>
        </div>

        <div className="w-full flex justify-between items-end">
          <div className="space-y-2 text-[11px] font-bold uppercase tracking-wider">
            {displayData.email && renderDraggableField('email', <div className="flex items-center gap-2"><div className="w-4 h-[2px] bg-white" /> {displayData.email}</div>)}
            {displayData.contact && renderDraggableField('contact', <div className="flex items-center gap-2"><div className="w-4 h-[2px] bg-white" /> {displayData.contact}</div>)}
            {displayData.location && renderDraggableField('location', <div className="flex items-center gap-2"><div className="w-4 h-[2px] bg-white" /> {displayData.location}</div>)}
          </div>
          <div className="bg-white p-1 rounded-sm shadow-2xl">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

