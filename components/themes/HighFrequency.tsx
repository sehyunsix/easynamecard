// @label: 하이 프리퀀시
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Zap } from 'lucide-react';

export const HighFrequency: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#111111] text-white font-sans relative overflow-hidden">
      {/* Dynamic Sharp Lines Background using theme color */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div 
          className="absolute top-[20%] -left-[10%] w-[120%] h-[1px] rotate-12 opacity-30" 
          style={{ background: `linear-gradient(to right, transparent, ${style.primaryColor}, transparent)` }}
        />
        <div 
          className="absolute top-[40%] -left-[10%] w-[120%] h-[1px] -rotate-6 opacity-40" 
          style={{ background: `linear-gradient(to right, transparent, ${style.accentColor}, transparent)` }}
        />
        <div 
          className="absolute top-[70%] -left-[10%] w-[120%] h-[1px] rotate-3 opacity-20" 
          style={{ background: `linear-gradient(to right, transparent, ${style.primaryColor}, transparent)` }}
        />
      </div>

      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-0">
            {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter skew-x-[-10deg] leading-none">{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-[10px] font-bold tracking-[0.5em] uppercase pl-1 mt-2" style={{ color: style.accentColor }}>HFT.DEVELOPMENT.UNIT</p>)}
          </div>
          <Zap style={{ color: style.accentColor }} className="animate-pulse" size={32} />
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-4">
            <div 
              className="text-[9px] font-black text-black px-2 py-0.5 inline-block skew-x-[-10deg]"
              style={{ backgroundColor: style.accentColor }}
            >
              {displayData.position.toUpperCase()}
            </div>
            <div className="space-y-1 text-[10px] font-mono text-gray-400">
              {displayData.email && renderDraggableField('email', <div>{displayData.email}</div>)}
              {displayData.github && renderDraggableField('github', <div>{displayData.github}</div>)}
              {displayData.location && renderDraggableField('location', <div>{displayData.location}</div>)}
            </div>
          </div>
          <div className="w-16 h-16 bg-white p-0.5" style={{ border: `2px solid ${style.accentColor}` }}>
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

