import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Globe, Mail, Phone, Briefcase, MapPin } from 'lucide-react';

const InfoItem = ({ icon, text, scale }: { icon: React.ReactNode; text: string; scale: number }) => (
  <div className="flex items-center gap-2">
    <div className="text-slate-400 shrink-0">{icon}</div>
    <span className="font-medium text-slate-600 truncate" style={{ fontSize: `${11 * scale}px` }}>{text}</span>
  </div>
);

export const Professional: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full grid grid-cols-12 bg-white text-slate-800 shadow-inner overflow-hidden border border-slate-100">
    <div className="col-span-1 h-full" style={{ backgroundColor: style.primaryColor }} />
    <div className="col-span-11 p-10 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
          {renderDraggableField('name', <h2 className="text-3xl font-bold text-slate-900 mb-2">{displayData.name}</h2>)}
          {renderDraggableField('position', <p className="text-sm font-medium tracking-wide text-slate-500">{displayData.position}</p>)}
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100" style={{ color: style.primaryColor, transform: `scale(${style.contentScale})` }}>
          <Briefcase size={24} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-3 mt-6">
        {renderDraggableField('contact', <InfoItem icon={<Phone size={s(14)} />} text={displayData.contact} scale={style.contentScale} />)}
        {renderDraggableField('github', <InfoItem icon={<Github size={s(14)} />} text={displayData.github} scale={style.contentScale} />)}
        {renderDraggableField('email', <InfoItem icon={<Mail size={s(14)} />} text={displayData.email} scale={style.contentScale} />)}
        {renderDraggableField('blog', <InfoItem icon={<Globe size={s(14)} />} text={displayData.blog} scale={style.contentScale} />)}
        {renderDraggableField('location', <InfoItem icon={<MapPin size={s(14)} />} text={displayData.location} scale={style.contentScale} />)}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        {renderDraggableField('goal', <p className="italic text-slate-500 font-serif leading-snug" style={{ fontSize: `${s(12)}px` }}>"{displayData.goal}"</p>)}
      </div>
    </div>
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);

