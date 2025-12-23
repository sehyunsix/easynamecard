import React from 'react';
import { CardData, CardStyle } from '../types';
import { renderThemeById } from './themes/Registry';

interface CardThumbnailProps {
  data: CardData;
  style: CardStyle;
  side?: 'front' | 'back';
}

const CardThumbnail: React.FC<CardThumbnailProps> = ({ data, style, side = 'front' }) => {
  const isBack = side === 'back';

  // Scale function
  const s = (base: number) => base * style.contentScale;

  // Data to display based on side
  const displayData = {
    name: (isBack && data.nameEn) ? data.nameEn : data.name,
    position: (isBack && data.positionEn) ? data.positionEn : data.position,
    goal: (isBack && data.goalEn) ? data.goalEn : data.goal,
    contact: data.contact,
    email: data.email,
    github: data.github,
    blog: data.blog,
    location: data.location,
  };

  // Simple non-draggable field wrapper (just returns children)
  const renderDraggableField = (_id: string, children: React.ReactNode, className?: string, customStyle?: React.CSSProperties) => {
    // Check visibility
    const fieldVisible = data.fieldSettings[_id]?.visible !== false;
    if (!fieldVisible) return null;

    return (
      <div className={className} style={customStyle}>
        {children}
      </div>
    );
  };

  // Simple QR code renderer (static, non-draggable)
  const renderQRCodeElement = (qrSide: 'front' | 'back') => {
    // If back side logo type, never show QR on back
    if (qrSide === 'back' && data.backSideType === 'logo') return null;

    // Check toggle for each side
    const show = qrSide === 'front' ? data.showQrCode : data.showBackQrCode;
    if (!show) return null;

    const link = data.qrUrl || data.blog || data.github || data.email || '';
    if (!link) return null;

    const cleanLink = link.startsWith('http') ? link : `https://${link}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(cleanLink)}`;

    return (
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          left: `${style.qrX}%`,
          top: `${style.qrY}%`,
          width: `${style.qrSize}px`,
          height: `${style.qrSize}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full bg-white p-1 rounded-sm border border-slate-200 overflow-hidden">
          <img
            src={qrUrl}
            alt="QR Code"
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  };

  // Size classes
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

  // Handle special back side types
  if (isBack && data.backSideType === 'logo') {
    return (
      <div className={`relative ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} overflow-hidden bg-white select-none shadow-md`}>
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white gap-4">
          <div className="absolute inset-0 opacity-10" style={{ backgroundColor: style.primaryColor }} />

          {data.logoUrl ? (
            <img src={data.logoUrl} alt="Brand Logo" className="max-w-[50%] max-h-[50%] object-contain" />
          ) : !data.logoText ? (
            <p className="text-slate-400 font-bold text-sm">Logo</p>
          ) : null}

          {data.logoText && (
            <h1 className="font-playfair font-bold text-3xl text-slate-800 text-center px-8 leading-tight" style={{ color: style.primaryColor }}>
              {data.logoText}
            </h1>
          )}
        </div>
      </div>
    );
  }

  if (isBack && data.backSideType === 'custom') {
    return (
      <div className={`relative ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} overflow-hidden bg-white select-none shadow-md`}>
        <div className="w-full h-full relative overflow-hidden bg-white">
          <div className="absolute inset-0 opacity-5 pointer-events-none"
               style={{ backgroundImage: `radial-gradient(${style.primaryColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
          />

          {data.customElements?.map(el => (
            <div
              key={el.id}
              className="absolute pointer-events-none"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                transform: 'translate(0, 0)',
                maxWidth: '100%',
                maxHeight: '100%'
              }}
            >
              {el.type === 'text' ? (
                <div
                  style={{
                    fontSize: `${el.style.fontSize || 16}px`,
                    color: el.style.color || '#000000',
                    fontWeight: el.style.fontWeight || 'normal',
                    textAlign: el.style.align || 'left',
                    fontFamily: el.style.fontFamily,
                    width: el.style.width ? `${el.style.width}px` : 'auto',
                  }}
                >
                  {el.content}
                </div>
              ) : (
                <img
                  src={el.content}
                  alt="Custom element"
                  style={{
                    width: el.style.width ? `${el.style.width}px` : 'auto',
                    height: el.style.height ? `${el.style.height}px` : 'auto',
                    maxWidth: '100%',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isBack && data.backSideType === 'none') {
    return (
      <div className={`relative ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} overflow-hidden bg-white select-none shadow-md`}>
        <div className="w-full h-full flex items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 text-slate-400">
          <p className="text-xs">No Back</p>
        </div>
      </div>
    );
  }

  // Render theme using Registry
  const themeContent = renderThemeById(style.theme, {
    data,
    style,
    displayData,
    renderDraggableField,
    renderQRCodeElement,
    s,
    isBack,
  });

  return (
    <div className={`relative ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} overflow-hidden bg-white select-none shadow-md`}>
      {themeContent}
    </div>
  );
};

// Memoize to prevent unnecessary re-renders
export default React.memo(CardThumbnail, (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data &&
    prevProps.style === nextProps.style &&
    prevProps.side === nextProps.side
  );
});




