// @label: 뉴럴 노드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Network } from 'lucide-react';

export const NeuralNode: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-slate-950 text-white font-sans relative overflow-hidden">
      {/* Abstract Network Background using primary color */}
      <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 400 228" style={{ color: style.primaryColor }}>
        <circle cx="50" cy="50" r="2" fill="currentColor" />
        <circle cx="150" cy="80" r="2" fill="currentColor" />
        <circle cx="250" cy="40" r="2" fill="currentColor" />
        <circle cx="350" cy="120" r="2" fill="currentColor" />
        <circle cx="100" cy="180" r="2" fill="currentColor" />
        <circle cx="300" cy="200" r="2" fill="currentColor" />
        <path d="M50 50 L150 80 L250 40 L350 120 L300 200 L100 180 Z" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M50 50 L100 180" stroke="currentColor" fill="none" strokeWidth="0.5" />
        <path d="M150 80 L300 200" stroke="currentColor" fill="none" strokeWidth="0.5" />
      </svg>

      <div className="absolute inset-0 p-12 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            {renderDraggableField('name', <h2 className="text-4xl font-light tracking-widest leading-none">{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: style.accentColor }}>{displayData.position}</p>)}
          </div>
          <Network style={{ color: style.primaryColor, opacity: 0.5 }} size={40} />
        </div>

        <div className="flex justify-between items-end">
          <div 
            className="space-y-2 text-[10px] font-mono tracking-tight text-slate-400 border-l pl-6"
            style={{ borderColor: `${style.primaryColor}80` }}
          >
            {displayData.email && renderDraggableField('email', <div className="flex items-center gap-2"><span style={{ color: style.primaryColor }}>[E]</span> {displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div className="flex items-center gap-2"><span style={{ color: style.primaryColor }}>[G]</span> {displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div className="flex items-center gap-2"><span style={{ color: style.primaryColor }}>[L]</span> {displayData.location}</div>)}
          </div>
          <div className="relative group">
            <div 
              className="absolute inset-0 blur-xl opacity-10 group-hover:opacity-20 transition-opacity" 
              style={{ backgroundColor: style.primaryColor }}
            />
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

