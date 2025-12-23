// @label: 블루프린트 블루
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Ruler, Pencil } from 'lucide-react';

export const BlueprintBlue: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0a1f44] text-white/90 font-mono relative overflow-hidden border-2 border-white/20">
    <div className="absolute inset-0 opacity-20 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    <div className="absolute inset-0 opacity-10 pointer-events-none"
         style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '8px 8px' }} />

    <div className="relative z-10 p-12 flex flex-col justify-between h-full">
      <div className="border border-white/30 p-8 relative">
        <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-white" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-white" />
        {renderDraggableField('name', <h2 className="text-6xl font-bold uppercase tracking-widest">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-medium uppercase tracking-[0.5em] mt-4 opacity-60 italic">{`// TITLE: ${displayData.position}`}</p>)}
      </div>
      <div className="grid grid-cols-2 gap-8 text-[10px] font-bold">
        <div className="space-y-2 border-l-2 border-white/20 pl-4">
          {renderDraggableField('email', <p>{`E-MAIL: ${displayData.email}`}</p>)}
          {renderDraggableField('contact', <p>{`CONTACT: ${displayData.contact}`}</p>)}
        </div>
        <div className="text-right flex flex-col justify-end items-end space-y-2">
          <div className="flex gap-2 opacity-30">
            <Ruler size={16} />
            <Pencil size={16} />
          </div>
          {renderDraggableField('location', <p>{`COORDS: ${displayData.location.toUpperCase()}`}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




