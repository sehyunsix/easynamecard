// @label: 스토캐스틱 프로세스
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const StochasticProcess: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#f4f1ea] text-[#2c3e50] font-sans relative overflow-hidden">
      {/* Stochastic Random Walk Pattern Background using primary color */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 400 228" preserveAspectRatio="none" style={{ color: style.primaryColor }}>
        <path d="M0 100 L20 110 L40 90 L60 120 L80 115 L100 130 L120 110 L140 140 L160 120 L180 150 L200 130 L220 160 L240 140 L260 170 L280 150 L300 180 L320 160 L340 190 L360 170 L380 200 L400 180" stroke="currentColor" fill="none" strokeWidth="2" />
        <path d="M0 150 L20 140 L40 160 L60 130 L80 135 L100 110 L120 130 L140 100 L160 120 L180 90 L200 110 L220 80 L240 100 L260 70 L280 90 L300 60 L320 80 L340 50 L360 70 L380 40 L400 60" stroke="currentColor" fill="none" strokeWidth="2" />
      </svg>

      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-4xl font-serif font-black text-[#1a252f]">{displayData.name}</h2>)}
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8" style={{ backgroundColor: style.primaryColor }} />
            {renderDraggableField('position', <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: style.primaryColor }}>{displayData.position}</p>)}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <div 
            className="grid grid-cols-2 gap-x-8 gap-y-2 text-[10px] font-medium opacity-80 border-t pt-6"
            style={{ borderColor: `${style.primaryColor}33` }}
          >
            {displayData.email && renderDraggableField('email', <div className="flex flex-col"><span className="opacity-60">EMAIL</span><span className="text-[9px] font-bold">{displayData.email}</span></div>)}
            {displayData.github && renderDraggableField('github', <div className="flex flex-col"><span className="opacity-60">GITHUB</span><span className="text-[9px] font-bold">{displayData.github}</span></div>)}
            {displayData.location && renderDraggableField('location', <div className="flex flex-col"><span className="opacity-60">LOCATION</span><span className="text-[9px] font-bold">{displayData.location}</span></div>)}
            {displayData.contact && renderDraggableField('contact', <div className="flex flex-col"><span className="opacity-60">CONTACT</span><span className="text-[9px] font-bold">{displayData.contact}</span></div>)}
          </div>
          <div className="w-16 h-16 bg-white shadow-lg p-1">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

