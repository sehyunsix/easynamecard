import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Globe, Mail, Phone, MapPin } from 'lucide-react';

export const Minimal: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="relative w-full h-full p-8 flex flex-col justify-between bg-white text-slate-900 overflow-hidden">
    <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: style.primaryColor }} />
    <div className="w-full border-t border-slate-100 mb-4" />
    <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
      {renderDraggableField('name', <h2 className="text-3xl font-light tracking-tight">{displayData.name}</h2>)}
      {renderDraggableField('position', <p className="text-sm font-medium opacity-60 mt-2" style={{ color: style.primaryColor }}>{displayData.position}</p>)}
    </div>
    <div className="flex flex-col gap-1 uppercase tracking-wider text-slate-400 font-medium" style={{ fontSize: `${s(10)}px` }}>
      <div className="flex items-center gap-4 flex-wrap">
        {renderDraggableField('email', <span className="flex items-center gap-1"><Mail size={s(10)} /> {displayData.email}</span>)}
        <span className="w-1 h-1 rounded-full bg-slate-200" />
        {renderDraggableField('contact', <span className="flex items-center gap-1"><Phone size={s(10)} /> {displayData.contact}</span>)}
        <span className="w-1 h-1 rounded-full bg-slate-200" />
        {renderDraggableField('location', <span className="flex items-center gap-1"><MapPin size={s(10)} /> {displayData.location}</span>)}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {renderDraggableField('github', <span className="flex items-center gap-1"><Github size={s(10)} /> {displayData.github}</span>)}
        <span className="w-1 h-1 rounded-full bg-slate-200" />
        {renderDraggableField('blog', <span className="flex items-center gap-1"><Globe size={s(10)} /> {displayData.blog}</span>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

