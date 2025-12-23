// @label: 알고리즘 코드
import React from 'react';
import { ThemeComponent } from './ThemeTypes';

export const AlgorithmCode: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono relative overflow-hidden text-xs">
      <div className="absolute top-0 left-0 w-8 h-full bg-[#252526] border-r border-[#333333] flex flex-col items-center pt-4 text-[#858585] select-none">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <div key={n} className="leading-5">{n}</div>)}
      </div>
      
      <div className="pl-12 pt-4 pr-6 space-y-1">
        <div className="flex gap-2">
          <span className="text-[#569cd6]">class</span>
          <span className="text-[#4ec9b0]">Developer</span>
          <span className="text-[#d4d4d4]">{'{'}</span>
        </div>
        
        <div className="pl-4 space-y-1">
          <div className="flex gap-2">
            <span className="text-[#569cd6]">name</span>
            <span className="text-[#d4d4d4]">=</span>
            <span className="text-[#ce9178]">"{renderDraggableField('name', displayData.name)}"</span>
            <span className="text-[#d4d4d4]">;</span>
          </div>
          
          <div className="flex gap-2">
            <span className="text-[#569cd6]">role</span>
            <span className="text-[#d4d4d4]">=</span>
            <span className="text-[#ce9178]">"{renderDraggableField('position', displayData.position)}"</span>
            <span className="text-[#d4d4d4]">;</span>
          </div>

          <div className="text-[#6a9955] mt-4">// Contact methods</div>
          <div className="flex gap-2">
            <span className="text-[#569cd6]">email</span>
            <span className="text-[#d4d4d4]">=</span>
            <span className="text-[#ce9178]">"{displayData.email}"</span>
            <span className="text-[#d4d4d4]">;</span>
          </div>
          <div className="flex gap-2">
            <span className="text-[#569cd6]">github</span>
            <span className="text-[#d4d4d4]">=</span>
            <span className="text-[#ce9178]">"{displayData.github}"</span>
            <span className="text-[#d4d4d4]">;</span>
          </div>
        </div>
        
        <div className="text-[#d4d4d4]">{'}'}</div>
      </div>
      
      <div className="absolute bottom-4 right-4 opacity-30">
        {renderQRCodeElement(isBack ? 'back' : 'front')}
      </div>
    </div>
  );
};

