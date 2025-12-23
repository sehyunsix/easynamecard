import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Mail, Phone, MapPin } from 'lucide-react';

export const Creative: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-0 flex flex-col bg-slate-50 relative overflow-hidden font-montserrat">
    <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.accentColor }} />

    <div className="flex-1 p-8 flex flex-col justify-center">
      {renderDraggableField('name', <h2 className="font-black mb-2 leading-none italic" style={{ color: style.primaryColor, fontSize: `${s(40)}px` }}>{displayData.name}</h2>)}
      {renderDraggableField('position', <p className="font-bold tracking-tighter text-slate-400 mb-6" style={{ fontSize: `${s(14)}px` }}>{displayData.position}</p>)}
      <div className="max-w-[80%]">
        {renderDraggableField('goal', <p className="leading-relaxed text-slate-600 font-semibold border-l-4 pl-3" style={{ borderColor: style.accentColor, fontSize: `${s(12)}px` }}>{displayData.goal}</p>)}
      </div>
    </div>

    <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
      <div className="space-y-1">
        {renderDraggableField('contact', <p className="flex items-center gap-2" style={{ fontSize: `${s(10)}px` }}><Phone size={s(10)} className="text-slate-400"/> {displayData.contact}</p>)}
        {renderDraggableField('email', <p className="flex items-center gap-2" style={{ fontSize: `${s(10)}px` }}><Mail size={s(10)} className="text-slate-400"/> {displayData.email}</p>)}
        {renderDraggableField('location', <p className="flex items-center gap-2" style={{ fontSize: `${s(10)}px` }}><MapPin size={s(10)} className="text-slate-400"/> {displayData.location}</p>)}
      </div>
      <div className="text-right">
        <p className="font-bold text-slate-400" style={{ fontSize: `${s(10)}px` }}>CONNECT</p>
        {renderDraggableField('github', <p className="flex items-center justify-end gap-1" style={{ fontSize: `${s(10)}px` }}><Github size={s(10)} /> {displayData.github}</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);




