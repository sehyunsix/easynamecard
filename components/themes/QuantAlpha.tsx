// @label: 퀀트 알파
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { TrendingUp } from 'lucide-react';

export const QuantAlpha: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#0a192f] text-[#ccd6f6] font-sans relative overflow-hidden">
      {/* Alpha Symbol Background */}
      <div 
        className="absolute -right-10 -bottom-20 opacity-5 text-[300px] font-serif pointer-events-none"
        style={{ color: style.primaryColor }}
      >
        α
      </div>
      
      <div className="absolute inset-0 p-8 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {renderDraggableField('name', <h1 className="text-3xl font-bold tracking-tight" style={{ color: style.primaryColor }}>{displayData.name}</h1>)}
            {renderDraggableField('position', <p className="text-sm font-medium uppercase tracking-widest opacity-70">{displayData.position}</p>)}
          </div>
          <TrendingUp style={{ color: style.primaryColor, opacity: 0.5 }} size={32} />
        </div>

        <div 
          className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-mono border-t pt-6"
          style={{ borderColor: `${style.primaryColor}33` }}
        >
          <div className="space-y-1">
            {displayData.contact && renderDraggableField('contact', <p><span style={{ color: style.primaryColor }}>CALL:</span> {displayData.contact}</p>)}
            {displayData.email && renderDraggableField('email', <p><span style={{ color: style.primaryColor }}>MAIL:</span> {displayData.email}</p>)}
          </div>
          <div className="space-y-1">
            {displayData.github && renderDraggableField('github', <p><span style={{ color: style.primaryColor }}>GIT:</span> {displayData.github}</p>)}
            {displayData.location && renderDraggableField('location', <p><span style={{ color: style.primaryColor }}>LOC:</span> {displayData.location}</p>)}
          </div>
        </div>
      </div>
      {renderQRCodeElement(isBack ? 'back' : 'front')}
    </div>
  );
};

