import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Globe, Mail, Phone, MapPin, Target } from 'lucide-react';

export const Dark: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-10 flex flex-col justify-between bg-slate-950 text-white overflow-hidden relative">
    <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${style.primaryColor}, ${style.accentColor})` }} />

    <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
      {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight mb-2">{displayData.name}</h2>)}
      <div className="flex items-center gap-2">
        <div className="w-4 h-[2px]" style={{ backgroundColor: style.primaryColor }} />
        {renderDraggableField('position', <p className="text-sm font-medium text-slate-400">{displayData.position}</p>)}
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <Target size={s(16)} style={{ color: style.primaryColor }} className="mt-1 shrink-0" />
        {renderDraggableField('goal', <p className="leading-relaxed text-slate-300" style={{ fontSize: `${s(13)}px` }}>{displayData.goal}</p>)}
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-4 border-t border-slate-800">
        {renderDraggableField('contact', <div className="flex items-center gap-2"><Phone size={s(12)} className="text-slate-600"/> <span className="text-sm">{displayData.contact}</span></div>)}
        {renderDraggableField('github', <div className="flex items-center gap-2"><Github size={s(12)} className="text-slate-600"/> <span className="text-sm">{displayData.github}</span></div>)}
        {renderDraggableField('email', <div className="flex items-center gap-2"><Mail size={s(12)} className="text-slate-600"/> <span className="text-sm">{displayData.email}</span></div>)}
        {renderDraggableField('blog', <div className="flex items-center gap-2"><Globe size={s(12)} className="text-slate-600"/> <span className="text-sm">{displayData.blog}</span></div>)}
        {renderDraggableField('location', <div className="flex items-center gap-2"><MapPin size={s(12)} className="text-slate-600"/> <span className="text-sm">{displayData.location}</span></div>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




