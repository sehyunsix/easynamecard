
import React, { useRef, useState, useEffect } from 'react';
import { CardData, CardStyle } from '../types';
import { Github, Globe, Mail, Phone, Briefcase, Target, ExternalLink, Repeat } from 'lucide-react';

interface CardPreviewProps {
  data: CardData;
  style: CardStyle;
  viewMode: 'flip' | 'split';
  onPositionChange: (x: number, y: number) => void;
}

const CardPreview: React.FC<CardPreviewProps> = ({ data, style, viewMode, onPositionChange }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const sizeClasses = {
    standard: 'w-[504px] h-[288px]', // 3.5" x 2"
    vertical: 'w-[288px] h-[504px]', // 2" x 3.5"
    square: 'w-[360px] h-[360px]', // 2.5" x 2.5"
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-2xl',
    full: 'rounded-[40px]',
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!data.showQrCode) return;
    setIsDragging(true);
    e.stopPropagation();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      onPositionChange(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onPositionChange]);

  const getQrUrl = () => {
    const link = data.qrUrl || '';
    const cleanLink = link.startsWith('http') ? link : `https://${link}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(cleanLink)}`;
  };

  const renderQR = () => {
    // If we are showing back side and it's logo type, don't show QR
    if (isFlipped && data.backSideType === 'logo') return null;
    if (!data.showQrCode) return null;

    return (
      <div
        className={`absolute z-20 cursor-grab active:cursor-grabbing group transition-all duration-75 ${isDragging ? 'shadow-2xl scale-110' : 'shadow-sm'}`}
        style={{
          left: `${style.qrX}%`,
          top: `${style.qrY}%`,
          width: `${style.qrSize}px`,
          height: `${style.qrSize}px`,
          transform: 'translate(-50%, -50%)',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="w-full h-full bg-white p-1 rounded-sm border border-slate-200 overflow-hidden relative">
          <img
            src={getQrUrl()}
            alt="QR Code"
            className="w-full h-full object-contain pointer-events-none"
            loading="lazy"
          />
          {/* Visual indicator for drag area in editor */}
          <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity no-print" />
        </div>
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity no-print shadow-sm" />
      </div>
    );
  };

  const renderTheme = (side: 'front' | 'back') => {
    const s = (base: number) => base * style.contentScale;
    const isBack = side === 'back';

    // Data to use based on side
    const displayData = isBack ? {
      ...data,
      name: data.nameEn || data.name,
      position: data.positionEn || data.position,
      tagline: data.taglineEn || data.tagline,
      goal: data.goalEn || data.goal,
    } : data;

    // Logo Back Side Special Rendering
    if (isBack && data.backSideType === 'logo') {
       return (
         <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-white">
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: style.primaryColor }} />
            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Brand Logo" className="max-w-[60%] max-h-[60%] object-contain" />
            ) : (
               <p className="text-slate-400 font-bold text-sm">로고를 업로드해주세요</p>
            )}
         </div>
       );
    }

    switch (style.theme) {
      case 'minimal':
        return (
          <div className="relative w-full h-full p-8 flex flex-col justify-between bg-white text-slate-900 overflow-hidden">
            <div className="w-full border-t border-slate-100 mb-4" />
            <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
              <h2 className="text-3xl font-light tracking-tight">{displayData.name}</h2>
              <p className="text-sm font-medium tracking-widest uppercase opacity-60 mt-1" style={{ color: style.primaryColor }}>{displayData.position}</p>
            </div>
            <div className="flex flex-col gap-1 uppercase tracking-wider text-slate-400 font-medium" style={{ fontSize: `${s(10)}px` }}>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Mail size={s(10)} /> {displayData.email}</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1"><Phone size={s(10)} /> {displayData.contact}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><Github size={s(10)} /> {displayData.github}</span>
                <span className="w-1 h-1 rounded-full bg-slate-200" />
                <span className="flex items-center gap-1"><Globe size={s(10)} /> {displayData.blog}</span>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: style.primaryColor }} />
            {!isBack && renderQR()}
          </div>
        );

      case 'creative':
        return (
          <div className="w-full h-full p-0 flex flex-col bg-slate-50 relative overflow-hidden font-montserrat">
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: style.primaryColor }} />
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ backgroundColor: style.accentColor }} />
            
            <div className="flex-1 p-8 flex flex-col justify-center">
               <h2 className="font-black mb-1 leading-none italic" style={{ color: style.primaryColor, fontSize: `${s(40)}px` }}>{displayData.name}</h2>
               <p className="font-bold tracking-tighter text-slate-400 mb-6" style={{ fontSize: `${s(14)}px` }}>{displayData.position}</p>
               <div className="max-w-[80%]">
                 <p className="leading-relaxed text-slate-600 font-semibold border-l-4 pl-3" style={{ borderColor: style.accentColor, fontSize: `${s(12)}px` }}>{displayData.goal}</p>
               </div>
            </div>

            <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
              <div className="space-y-1">
                <p className="flex items-center gap-2" style={{ fontSize: `${s(10)}px` }}><Phone size={s(10)} className="text-slate-400"/> {displayData.contact}</p>
                <p className="flex items-center gap-2" style={{ fontSize: `${s(10)}px` }}><Mail size={s(10)} className="text-slate-400"/> {displayData.email}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-400" style={{ fontSize: `${s(10)}px` }}>CONNECT</p>
                <p className="flex items-center justify-end gap-1" style={{ fontSize: `${s(10)}px` }}><Github size={s(10)} /> {displayData.github}</p>
              </div>
            </div>
            {!isBack && renderQR()}
          </div>
        );

      case 'professional':
        return (
          <div className="w-full h-full grid grid-cols-12 bg-white text-slate-800 shadow-inner overflow-hidden border border-slate-100">
            <div className="col-span-1 h-full" style={{ backgroundColor: style.primaryColor }} />
            <div className="col-span-11 p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
                  <h2 className="text-3xl font-bold text-slate-900 mb-1">{displayData.name}</h2>
                  <p className="text-sm font-medium tracking-wide text-slate-500">{displayData.position}</p>
                </div>
                <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-100" style={{ color: style.primaryColor, transform: `scale(${style.contentScale})` }}>
                  <Briefcase size={24} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-3 mt-6">
                <InfoItem icon={<Phone size={s(14)} />} text={displayData.contact} scale={style.contentScale} />
                <InfoItem icon={<Github size={s(14)} />} text={displayData.github} scale={style.contentScale} />
                <InfoItem icon={<Mail size={s(14)} />} text={displayData.email} scale={style.contentScale} />
                <InfoItem icon={<Globe size={s(14)} />} text={displayData.blog} scale={style.contentScale} />
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="italic text-slate-500 font-serif leading-snug" style={{ fontSize: `${s(12)}px` }}>"{displayData.goal}"</p>
              </div>
            </div>
            {!isBack && renderQR()}
          </div>
        );

      case 'dark':
        return (
          <div className="w-full h-full p-10 flex flex-col justify-between bg-slate-950 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${style.primaryColor}, ${style.accentColor})` }} />
            
            <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
              <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 mb-1 uppercase">{displayData.tagline}</p>
              <h2 className="text-4xl font-bold tracking-tight mb-1">{displayData.name}</h2>
              <div className="flex items-center gap-2">
                <div className="w-4 h-[2px]" style={{ backgroundColor: style.primaryColor }} />
                <p className="text-sm font-medium text-slate-400">{displayData.position}</p>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1.5" style={{ fontSize: `${s(12)}px` }}>
                <p className="font-mono text-slate-300 flex items-center gap-2"><Mail size={s(12)} /> {displayData.email}</p>
                <p className="font-mono text-slate-300 flex items-center gap-2"><Phone size={s(12)} /> {displayData.contact}</p>
              </div>
              <div className="text-right space-y-0.5" style={{ fontSize: `${s(12)}px` }}>
                <p className="font-bold flex items-center justify-end gap-2" style={{ color: style.accentColor }}><Github size={s(12)} /> {displayData.github}</p>
                <p className="text-slate-500" style={{ fontSize: `${s(10)}px` }}>{displayData.blog}</p>
              </div>
            </div>
            {!isBack && renderQR()}
          </div>
        );

      case 'glassmorphism':
        return (
          <div className="w-full h-full p-8 flex flex-col justify-between relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20">
            <div className="absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-40 -right-10 -top-10" style={{ backgroundColor: style.primaryColor }} />
            <div className="absolute -z-10 w-48 h-48 rounded-full blur-3xl opacity-30 -left-10 -bottom-10" style={{ backgroundColor: style.accentColor }} />
            
            <div className="space-y-1" style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
              <h2 className="text-3xl font-montserrat font-extrabold text-slate-800 drop-shadow-sm">{displayData.name}</h2>
              <p className="inline-block px-3 py-1 bg-white/40 rounded-full text-xs font-bold text-slate-600 border border-white/40 backdrop-blur-sm">
                {displayData.position}
              </p>
            </div>

            <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl border border-white/50 space-y-2" style={{ transform: `scale(${style.contentScale})` }}>
               <p className="text-xs text-slate-700 leading-relaxed font-medium">
                 <Target size={12} className="inline mr-2 text-slate-500" />
                 {displayData.goal}
               </p>
            </div>

            <div className="flex justify-between items-center font-bold text-slate-600" style={{ fontSize: `${s(11)}px` }}>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><Mail size={s(11)} /> {displayData.email.split('@')[0]}</span>
                <span className="w-[1px] h-3 bg-slate-300/50" />
                <span className="flex items-center gap-1"><Phone size={s(11)} /> {displayData.contact}</span>
              </div>
              <span className="flex items-center gap-1 hover:text-slate-900 transition-colors">
                <Github size={s(11)} /> {displayData.github.replace('github.com/', '')} <ExternalLink size={s(10)} />
              </span>
            </div>
            {!isBack && renderQR()}
          </div>
        );

      case 'modern':
      default:
        return (
          <div className="w-full h-full p-0 flex flex-col bg-white overflow-hidden shadow-2xl relative">
            <div className="h-2 w-full flex">
              <div className="flex-1" style={{ backgroundColor: style.primaryColor }} />
              <div className="flex-1" style={{ backgroundColor: style.accentColor }} />
              <div className="flex-1" style={{ backgroundColor: style.primaryColor, opacity: 0.6 }} />
            </div>
            
            <div className="flex-1 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
                  <h2 className="text-4xl font-playfair text-slate-900 mb-0.5">{displayData.name}</h2>
                  <p className="text-xs tracking-[0.2em] font-bold text-slate-400 uppercase">{displayData.position}</p>
                </div>
                <div className="text-right" style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'right top' }}>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">TAGLINE</p>
                  <p className="text-xs font-bold text-slate-800" style={{ color: style.accentColor }}>{displayData.tagline}</p>
                </div>
              </div>

              <div className="max-w-[85%] mt-4">
                 <p className="leading-relaxed text-slate-600 font-medium" style={{ fontSize: `${s(11)}px` }}>{displayData.goal}</p>
              </div>

              <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-4">
                <div className="space-y-1">
                  <p className="font-bold flex items-center gap-2 text-slate-500 uppercase" style={{ fontSize: `${s(10)}px` }}><Phone size={s(12)} style={{ color: style.primaryColor }} /> {displayData.contact}</p>
                  <p className="font-bold flex items-center gap-2 text-slate-500 uppercase" style={{ fontSize: `${s(10)}px` }}><Mail size={s(12)} style={{ color: style.primaryColor }} /> {displayData.email}</p>
                </div>
                <div className="space-y-1 text-right">
                  <p className="font-mono font-medium text-slate-500 flex items-center justify-end gap-2" style={{ fontSize: `${s(10)}px` }}><Github size={s(12)} /> {displayData.github}</p>
                  <p className="font-mono font-medium text-slate-500" style={{ fontSize: `${s(10)}px` }}>{displayData.blog}</p>
                </div>
              </div>
            </div>
            {!isBack && renderQR()}
          </div>
        );
    }
  };

  return (
    <>
      <div
        id="card-front"
        ref={cardRef}
        className={`card-wrapper relative transition-all duration-500 ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden bg-white select-none ${viewMode === 'flip' && isFlipped ? 'hidden' : ''}`}
        style={{ boxShadow: `0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)` }}
      >
        {renderTheme('front')}

        {viewMode === 'flip' && data.backSideType !== 'none' && (
          <button
            onClick={() => setIsFlipped(true)}
            className="absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-110 transition-all no-print"
            title="뒷면 보기"
          >
            <Repeat size={18} />
          </button>
        )}
      </div>

      {(viewMode === 'split' || (viewMode === 'flip' && isFlipped)) && data.backSideType !== 'none' && (
        <div
          id="card-back"
          className={`card-wrapper relative transition-all duration-500 ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden bg-white select-none`}
          style={{ boxShadow: `0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)` }}
        >
          {renderTheme('back')}

          {viewMode === 'flip' && (
            <button
              onClick={() => setIsFlipped(false)}
              className="absolute top-4 right-4 z-50 p-2 bg-white/90 rounded-full shadow-lg border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-110 transition-all no-print"
              title="앞면 보기"
            >
              <Repeat size={18} className="text-blue-600" />
            </button>
          )}
        </div>
      )}
    </>
  );
};

const InfoItem = ({ icon, text, scale }: { icon: React.ReactNode; text: string; scale: number }) => (
  <div className="flex items-center gap-2">
    <div className="text-slate-400 shrink-0">{icon}</div>
    <span className="font-medium text-slate-600 truncate" style={{ fontSize: `${11 * scale}px` }}>{text}</span>
  </div>
);

export default CardPreview;
