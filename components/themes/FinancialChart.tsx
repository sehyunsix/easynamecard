// @label: 파이낸셜 차트
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { BarChart3 } from 'lucide-react';

export const FinancialChart: ThemeComponent = ({ displayData, style, renderDraggableField, renderQRCodeElement, s, isBack }) => {
  return (
    <div className="w-full h-full bg-white text-slate-900 font-sans relative overflow-hidden">
      {/* Background Grid and Trend Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      <div className="absolute bottom-0 left-0 w-full h-1/3 flex items-end gap-1 px-4 pb-2 opacity-10 pointer-events-none">
        {[40, 70, 45, 90, 65, 80, 55, 100, 75, 85, 60].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: style.primaryColor }} />
        ))}
      </div>

      <div className="absolute inset-0 p-10 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tighter leading-none" style={{ color: style.primaryColor }}>{displayData.name}</h2>)}
            {renderDraggableField('position', <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: style.accentColor }}>{displayData.position}</p>)}
          </div>
          <BarChart3 style={{ color: style.primaryColor }} size={32} />
        </div>

        <div className="flex justify-between items-end">
          <div className="space-y-2 text-[11px] font-medium text-slate-500 border-l-2 pl-4" style={{ borderColor: style.primaryColor }}>
            {displayData.email && renderDraggableField('email', <div>{displayData.email}</div>)}
            {displayData.github && renderDraggableField('github', <div>{displayData.github}</div>)}
            {displayData.location && renderDraggableField('location', <div className="uppercase tracking-widest">{displayData.location}</div>)}
          </div>
          <div className="w-16 h-16 bg-white border border-slate-100 p-1 rounded-lg shadow-sm">
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        </div>
      </div>
    </div>
  );
};

