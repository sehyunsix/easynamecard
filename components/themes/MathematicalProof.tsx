// @label: 수학적 증명
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const MathematicalProof: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#fdf6e3] text-[#586e75] font-serif relative overflow-hidden p-12 border-[16px] border-double border-[#93a1a1]/20">
      <div className="absolute top-4 left-4 text-[10px] font-mono opacity-50 italic">
        Lemma 1.1: Development Efficiency
      </div>

      <div className="space-y-8">
        <div className="space-y-1">
          {renderDraggableField('name', <h2 className="text-4xl font-black text-[#073642]">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-lg italic opacity-80">{displayData.position}</p>)}
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="flex items-center gap-4">
            <span className="text-[#b58900]">∀</span>
            {displayData.email && renderDraggableField('email', <span>Email: {displayData.email}</span>)}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#cb4b16]">Σ</span>
            {displayData.github && renderDraggableField('github', <span>Github: {displayData.github}</span>)}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#268bd2]">lim</span>
            {displayData.location && renderDraggableField('location', <span>Location: {displayData.location}</span>)}
          </div>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 flex flex-col items-end gap-4">
        <div className="text-[60px] leading-none font-bold opacity-5 select-none pointer-events-none">
          Q.E.D.
        </div>
        <div className="w-20 h-20 border border-[#93a1a1] p-1 bg-white">
          {renderQRCodeElement(isBack ? 'back' : 'front')}
        </div>
      </div>
    </div>
  );
};

