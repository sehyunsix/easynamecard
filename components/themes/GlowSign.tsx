import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Zap, Moon } from 'lucide-react';

export const GlowSign: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#000] text-white font-sans relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')] opacity-40" />

    <div className="relative z-10 p-12 flex flex-col justify-center items-center h-full space-y-10">
      <div className="text-center relative">
        <div className="absolute -inset-4 bg-blue-500/20 blur-xl animate-pulse" />
        {renderDraggableField('name',
          <h2 className="text-7xl font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ color: '#fff', WebkitTextStroke: '1px rgba(59,130,246,0.5)' }}>
            {displayData.name}
          </h2>
        )}
        {renderDraggableField('position',
          <p className="text-sm font-bold text-blue-400 mt-2 tracking-[0.5em] uppercase drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]">
            {displayData.position}
          </p>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center gap-6 text-[11px] font-black italic tracking-[0.2em] text-white/40">
          {renderDraggableField('email', <p className="flex items-center gap-2 hover:text-white transition-colors"><Zap size={s(12)} fill="currentColor" /> {displayData.email.toUpperCase()}</p>)}
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
          {renderDraggableField('contact', <p className="flex items-center gap-2 hover:text-white transition-colors"><Zap size={s(12)} fill="currentColor" /> {displayData.contact}</p>)}
        </div>

        <div className="px-6 py-2 border border-white/10 rounded-full backdrop-blur-md bg-white/5 flex items-center gap-3">
          <Moon size={s(14)} className="text-yellow-400" fill="currentColor" />
          {renderDraggableField('location', <p className="text-[10px] font-bold text-white/60 tracking-widest">{displayData.location.toUpperCase()}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

