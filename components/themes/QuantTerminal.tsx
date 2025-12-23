// @label: 퀀트 터미널
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const QuantTerminal: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#0c0c0c] text-[#33ff33] font-mono relative overflow-hidden border-2 border-[#1e1e1e] p-10 shadow-[inset_0_0_20px_rgba(51,255,51,0.1)]">
      {/* Terminal Header */}
      <div className="absolute top-0 left-0 w-full h-6 bg-[#1e1e1e] flex items-center px-3 gap-1.5 border-b border-[#333]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div className="ml-4 text-[10px] text-gray-500">quant_dev@terminal:~</div>
      </div>

      <div className="mt-4 space-y-4 text-xs">
        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="text-gray-500">$</span>
            <span>whoami</span>
          </div>
          <div className="pl-4">
            {renderDraggableField('name', <span className="text-white font-bold text-2xl">{displayData.name}</span>)}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex gap-2">
            <span className="text-gray-500">$</span>
            <span>grep "title" profile.json</span>
          </div>
          <div className="pl-4 text-yellow-400">
            {renderDraggableField('position', <span>"{displayData.position}"</span>)}
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t border-[#1e1e1e]">
          <div className="flex gap-2">
            <span className="text-gray-500">$</span>
            <span>ls -l contact/</span>
          </div>
          <div className="grid grid-cols-1 pl-4 gap-0.5 opacity-80">
            {displayData.email && renderDraggableField('email', <div>-rw-r--r-- 1 mail  {displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div>-rw-r--r-- 1 git   {displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div>-rw-r--r-- 1 loc   {displayData.location}</div>)}
          </div>
        </div>

        <div className="flex gap-2 animate-pulse">
          <span className="text-gray-500">$</span>
          <div className="w-2 h-4 bg-[#33ff33]" />
        </div>
      </div>

      <div className="absolute bottom-8 right-8 w-20 h-20 bg-[#33ff33]/5 p-1 border border-[#33ff33]/20">
        {renderQRCodeElement(isBack ? 'back' : 'front')}
      </div>
    </div>
  );
};

