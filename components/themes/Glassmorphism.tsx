import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Mail, Phone, MapPin, Target, ExternalLink } from 'lucide-react';

export const Glassmorphism: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 flex flex-col justify-between relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
    <div className="absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-40 -right-10 -top-10 pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
    <div className="absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-30 -left-10 -bottom-10 pointer-events-none" style={{ backgroundColor: style.accentColor }} />

    <div className="space-y-1" style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
      {renderDraggableField('name', <h2 className="text-3xl font-montserrat font-extrabold text-slate-800 drop-shadow-sm mb-2">{displayData.name}</h2>)}
      {renderDraggableField('position',
      <p className="inline-block px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-slate-600 border border-white/40 backdrop-blur-sm">
          {displayData.position}
      </p>
      )}
    </div>

    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl border border-white/50 space-y-2" style={{ transform: `scale(${style.contentScale})` }}>
       {renderDraggableField('goal',
       <p className="text-xs text-slate-700 leading-relaxed font-medium">
         <Target size={12} className="inline mr-2 text-slate-500" />
           {displayData.goal}
       </p>
       )}
    </div>

    <div className="flex justify-between items-center font-bold text-slate-600" style={{ fontSize: `${s(11)}px` }}>
      <div className="flex items-center gap-3 flex-wrap">
        {renderDraggableField('email', <span className="flex items-center gap-1"><Mail size={s(11)} /> {displayData.email.split('@')[0]}</span>)}
        <span className="w-[1px] h-3 bg-slate-300/50" />
        {renderDraggableField('contact', <span className="flex items-center gap-1"><Phone size={s(11)} /> {displayData.contact}</span>)}
        <span className="w-[1px] h-3 bg-slate-300/50" />
        {renderDraggableField('location', <span className="flex items-center gap-1"><MapPin size={s(11)} /> {displayData.location}</span>)}
      </div>
      {renderDraggableField('github',
      <span className="flex items-center gap-1 hover:text-slate-900 transition-colors">
          <Github size={s(11)} /> {displayData.github.replace('github.com/', '')} <ExternalLink size={s(10)} />
      </span>
      )}
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

