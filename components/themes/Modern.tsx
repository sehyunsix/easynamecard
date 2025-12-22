import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Mail, Phone, MapPin } from 'lucide-react';

export const Modern: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 flex flex-col bg-white overflow-hidden shadow-2xl relative">
    <div className="h-2 w-full flex">
      <div className="flex-1" style={{ backgroundColor: style.primaryColor }} />
      <div className="flex-1" style={{ backgroundColor: style.accentColor }} />
      <div className="flex-1" style={{ backgroundColor: style.primaryColor, opacity: 0.6 }} />
    </div>

    <div className="flex-1 p-8 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
          {renderDraggableField('name', <h2 className="text-4xl font-playfair text-slate-900 mb-2">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-xs font-bold text-slate-400">{displayData.position}</p>)}
        </div>
      </div>

      <div className="max-w-[85%] mt-4">
        {renderDraggableField('goal', <p className="leading-relaxed text-slate-600 font-medium" style={{ fontSize: `${s(11)}px` }}>{displayData.goal}</p>)}
      </div>

      <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-4">
        <div className="space-y-1">
          {renderDraggableField('contact', <p className="font-bold flex items-center gap-2 text-slate-500 uppercase" style={{ fontSize: `${s(10)}px` }}><Phone size={s(12)} style={{ color: style.primaryColor }} /> {displayData.contact}</p>)}
          {renderDraggableField('email', <p className="font-bold flex items-center gap-2 text-slate-500 uppercase" style={{ fontSize: `${s(10)}px` }}><Mail size={s(12)} style={{ color: style.primaryColor }} /> {displayData.email}</p>)}
        </div>
        <div className="space-y-1 text-right">
          {renderDraggableField('github', <p className="font-mono font-medium text-slate-500 flex items-center justify-end gap-2" style={{ fontSize: `${s(10)}px` }}><Github size={s(12)} /> {displayData.github}</p>)}
          {renderDraggableField('location', <p className="font-mono font-medium text-slate-500 flex items-center justify-end gap-2" style={{ fontSize: `${s(10)}px` }}><MapPin size={s(12)} /> {displayData.location}</p>)}
          {renderDraggableField('blog', <p className="font-mono font-medium text-slate-500" style={{ fontSize: `${s(10)}px` }}>{displayData.blog}</p>)}
        </div>
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

