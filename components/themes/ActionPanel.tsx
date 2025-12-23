import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Sparkles } from 'lucide-react';

export const ActionPanel: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-white text-black font-sans relative overflow-hidden border-[12px] border-black">
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/subtle-dots.png')]" />

    <div className="h-full flex flex-col">
      <div className="flex-1 grid grid-cols-12 gap-0 border-b-8 border-black">
        <div className="col-span-8 p-8 flex flex-col justify-center bg-yellow-400 border-r-8 border-black relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 border-[20px] border-black/10 rounded-full pointer-events-none" />
          {renderDraggableField('name', <h2 className="text-7xl font-black uppercase tracking-tighter italic leading-none drop-shadow-[4px_4px_0_#000]">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xl font-black uppercase bg-black text-white px-4 py-1 inline-block mt-4 skew-x-[-10deg] tracking-wider">{displayData.position}</p>)}
        </div>
        <div className="col-span-4 p-6 bg-white flex flex-col justify-center items-center text-center gap-4">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-yellow-400">
            <Sparkles size={40} fill="currentColor" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-tighter italic">Super Profile v1</p>
        </div>
      </div>

      <div className="h-[30%] grid grid-cols-3 gap-0">
        <div className="p-6 bg-blue-500 border-r-8 border-black flex flex-col justify-center text-white">
          <p className="text-[10px] font-black uppercase mb-1">Contact</p>
          {renderDraggableField('contact', <p className="text-xs font-bold leading-tight">{displayData.contact}</p>)}
        </div>
        <div className="p-6 bg-red-500 border-r-8 border-black flex flex-col justify-center text-white">
          <p className="text-[10px] font-black uppercase mb-1">Email</p>
          {renderDraggableField('email', <p className="text-xs font-bold leading-tight break-all">{displayData.email}</p>)}
        </div>
        <div className="p-6 bg-white flex flex-col justify-center text-black">
          <p className="text-[10px] font-black uppercase mb-1">Base</p>
          {renderDraggableField('location', <p className="text-xs font-bold leading-tight">{displayData.location}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




