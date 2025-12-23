import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Moon, Star, Sparkles } from 'lucide-react';

export const CosmicDust: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => (
  <div className="w-full h-full bg-[#0a0a1a] text-white relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none"
         style={{ backgroundImage: `radial-gradient(circle at 20% 30%, ${style.primaryColor} 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${style.accentColor} 0%, transparent 50%)` }} />

    <div className="absolute inset-0 opacity-20 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <Star key={i} size={Math.random() * 4} className="absolute text-white animate-pulse"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 5}s` }} fill="currentColor" />
      ))}
    </div>

    <div className="relative z-10 p-12 flex flex-col items-center justify-center text-center h-full space-y-6">
      <div className="w-20 h-20 rounded-full border-2 border-white/20 flex items-center justify-center relative">
        <div className="absolute inset-0 rounded-full animate-spin-slow border-t-2 border-white/40" />
        <Moon size={32} className="text-yellow-200 drop-shadow-[0_0_10px_rgba(255,255,200,0.5)]" fill="currentColor" />
      </div>

      <div className="space-y-2">
        {renderDraggableField('name', <h2 className="text-5xl font-extrabold tracking-[0.1em] uppercase bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">{displayData.name}</h2>)}
        {renderDraggableField('position', <p className="text-xs font-bold text-yellow-200/80 uppercase tracking-[0.5em]">{displayData.position}</p>)}
      </div>

      <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="grid grid-cols-1 gap-2 text-[10px] font-medium tracking-widest text-white/60">
        {renderDraggableField('email', <p>{displayData.email.toUpperCase()}</p>)}
        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
        {renderDraggableField('location', <p className="flex items-center justify-center gap-2"><Sparkles size={s(10)} /> {displayData.location.toUpperCase()}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




