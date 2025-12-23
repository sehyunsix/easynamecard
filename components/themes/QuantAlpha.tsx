// @label: 퀀트 알파
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { TrendingUp } from 'lucide-react';

export const QuantAlpha: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#0a192f] text-[#ccd6f6] font-sans relative overflow-hidden">
      {/* Alpha Symbol Background */}
      <div className="absolute -right-10 -bottom-20 opacity-5 text-[300px] font-serif pointer-events-none">
        α
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {renderDraggableField('name', <h1 className="text-3xl font-bold tracking-tight text-[#64ffda]">{displayData.name}</h1>)}
            {renderDraggableField('position', <p className="text-sm font-medium text-[#8892b0] uppercase tracking-widest">{displayData.position}</p>)}
          </div>
          <TrendingUp className="text-[#64ffda] opacity-50" size={32} />
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-mono border-t border-[#233554] pt-6">
          <div className="space-y-1">
            {displayData.contact && renderDraggableField('contact', <p>CALL: {displayData.contact}</p>)}
            {displayData.email && renderDraggableField('email', <p>MAIL: {displayData.email}</p>)}
          </div>
          <div className="space-y-1">
            {displayData.github && renderDraggableField('github', <p>GIT: {displayData.github}</p>)}
            {displayData.location && renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
          </div>
        </div>
      </div>
      {renderQRCodeElement(isBack ? 'back' : 'front')}
    </div>
  );
};

