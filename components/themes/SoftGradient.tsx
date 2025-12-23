// @label: 소프트 그라디언트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { MapPin, Mail, Phone, Target } from 'lucide-react';

export const SoftGradient: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-white font-sans relative overflow-hidden">
      {/* Soft Peach/Beige Gradient Background */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_right,_#ffeadb_0%,_#ffffff_60%,_#fff5f0_100%)]" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#ffeadb] blur-[80px] rounded-full opacity-60" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fff5f0] blur-[60px] rounded-full opacity-50" />

      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            {renderDraggableField('name', <h2 className="text-4xl font-black text-[#1e293b] tracking-tight">{displayData.name}</h2>)}
            <div className="inline-block bg-[#f8fafc]/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-100 shadow-sm">
              {renderDraggableField('position', <p className="text-sm font-bold text-[#475569]">{displayData.position}</p>)}
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-50">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>

        <div className="space-y-6">
          {displayData.goal && renderDraggableField('goal', (
            <div className="bg-white/40 backdrop-blur-md p-5 rounded-2xl border border-white/60 shadow-sm flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Target size={18} />
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">{displayData.goal}</p>
            </div>
          ))}

          <div className="space-y-2.5 pl-2">
            {displayData.location && renderDraggableField('location', (
              <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                <MapPin size={14} className="text-slate-400" />
                <span>{displayData.location}</span>
              </div>
            ))}
            {displayData.email && renderDraggableField('email', (
              <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                <Mail size={14} className="text-slate-400" />
                <span>{displayData.email}</span>
              </div>
            ))}
            {displayData.contact && renderDraggableField('contact', (
              <div className="flex items-center gap-3 text-slate-500 font-bold text-xs">
                <Phone size={14} className="text-slate-400" />
                <span>{displayData.contact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

