// @label: 퀀트 터미널
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const QuantTerminal: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div 
      className="w-full h-full bg-[#0c0c0c] font-mono relative overflow-hidden border-2 p-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
      style={{ color: style.primaryColor, borderColor: `${style.primaryColor}22` }}
    >
      {/* Terminal Header */}
      <div 
        className="absolute top-0 left-0 w-full h-6 flex items-center px-3 gap-1.5 border-b"
        style={{ backgroundColor: `${style.primaryColor}11`, borderColor: `${style.primaryColor}22` }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-4 text-[10px] opacity-40">quant_dev@terminal:~</div>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="opacity-40">$</span>
            <span>whoami</span>
          </div>
          <div className="pl-4">
            {renderDraggableField('name', <span className="text-white font-bold text-2xl">{displayData.name}</span>)}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="opacity-40">$</span>
            <span>grep "title" profile.json</span>
          </div>
          <div className="pl-4" style={{ color: style.accentColor }}>
            {renderDraggableField('position', <span>"{displayData.position}"</span>)}
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t" style={{ borderColor: `${style.primaryColor}22` }}>
          <div className="flex gap-2">
            <span className="opacity-40">$</span>
            <span>ls -l contact/</span>
          </div>
          <div className="grid grid-cols-1 pl-4 gap-0.5 opacity-80">
            {displayData.email && renderDraggableField('email', <div>-rw-r--r-- 1 mail  {displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div>-rw-r--r-- 1 git   {displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div>-rw-r--r-- 1 loc   {displayData.location}</div>)}
          </div>
        </div>

        <div className="flex gap-2 animate-pulse">
          <span className="opacity-40">$</span>
          <div className="w-2 h-4" style={{ backgroundColor: style.primaryColor }} />
        </div>
      </div>

      <div 
        className="absolute bottom-8 right-8 w-20 h-20 p-1 border"
        style={{ backgroundColor: `${style.primaryColor}05`, borderColor: `${style.primaryColor}33` }}
      >
        {renderQRCodeElement(isBack ? 'back' : 'front')}
      </div>
    </div>
  );
};

