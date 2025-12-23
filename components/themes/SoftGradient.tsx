// @label: 소프트 그라디언트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { MapPin, Mail, Phone, Target } from 'lucide-react';

export const SoftGradient: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-white font-sans relative overflow-hidden">
      {/* Soft Gradient Background using theme colors */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          background: `radial-gradient(circle at top right, ${style.primaryColor} 0%, transparent 70%), radial-gradient(circle at bottom left, ${style.accentColor} 0%, transparent 70%)` 
        }} 
      />
      <div 
        className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] blur-[80px] rounded-full opacity-30" 
        style={{ backgroundColor: style.primaryColor }}
      />
      <div 
        className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] blur-[60px] rounded-full opacity-20" 
        style={{ backgroundColor: style.accentColor }}
      />

      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-800 tracking-tight">{displayData.name}</h2>)}
            <div 
              className="inline-block px-4 py-1.5 rounded-full border shadow-sm backdrop-blur-sm"
              style={{ backgroundColor: `${style.primaryColor}10`, borderColor: `${style.primaryColor}20` }}
            >
              {renderDraggableField('position', <p className="text-sm font-bold" style={{ color: style.primaryColor }}>{displayData.position}</p>)}
            </div>
          </div>
          <div className="bg-white p-2 rounded-xl shadow-lg border border-slate-50">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>

        <div className="space-y-6">
          {displayData.goal && renderDraggableField('goal', (
            <div className="bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white shadow-sm flex items-center gap-4">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${style.primaryColor}15`, color: style.primaryColor }}
              >
                <Target size={18} />
              </div>
              <p className="text-sm font-medium text-slate-600 leading-relaxed">{displayData.goal}</p>
            </div>
          ))}

          <div className="space-y-2.5 pl-2 text-slate-500 font-bold text-xs">
            {displayData.location && renderDraggableField('location', (
              <div className="flex items-center gap-3">
                <MapPin size={14} style={{ color: style.primaryColor }} />
                <span>{displayData.location}</span>
              </div>
            ))}
            {displayData.email && renderDraggableField('email', (
              <div className="flex items-center gap-3">
                <Mail size={14} style={{ color: style.primaryColor }} />
                <span>{displayData.email}</span>
              </div>
            ))}
            {displayData.contact && renderDraggableField('contact', (
              <div className="flex items-center gap-3">
                <Phone size={14} style={{ color: style.primaryColor }} />
                <span>{displayData.contact}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

