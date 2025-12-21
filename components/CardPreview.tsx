
import React, { useRef, useState, useEffect } from 'react';
import { CardData, CardStyle } from '../types';
import { Github, Globe, Mail, Phone, Briefcase, Target, ExternalLink, Repeat, MapPin, Sparkles } from 'lucide-react';

interface CardPreviewProps {
  data: CardData;
  style: CardStyle;
  viewMode: 'flip' | 'split';
  onPositionChange: (x: number, y: number) => void;
  selectedElementId?: string | null;
  onSelectElement?: (id: string | null) => void;
  onUpdateElement?: (id: string, updates: any) => void;
  onFieldUpdate?: (field: string, updates: { x: number; y: number }) => void; // New prop for field positioning
}

const CardPreview: React.FC<CardPreviewProps> = ({ data, style, viewMode, onPositionChange, selectedElementId, onSelectElement, onUpdateElement, onFieldUpdate }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Refs for callbacks
  const onFieldUpdateRef = useRef(onFieldUpdate);
  const onUpdateElementRef = useRef(onUpdateElement);
  const onPositionChangeRef = useRef(onPositionChange);

  useEffect(() => { onFieldUpdateRef.current = onFieldUpdate; }, [onFieldUpdate]);
  useEffect(() => { onUpdateElementRef.current = onUpdateElement; }, [onUpdateElement]);
  useEffect(() => { onPositionChangeRef.current = onPositionChange; }, [onPositionChange]);

  // Field Dragging State
  const [isFieldDragging, setIsFieldDragging] = useState(false);
  const draggedFieldIdRef = useRef<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialFieldPos = useRef({ x: 0, y: 0 });

  // Custom Element Dragging & Resizing State
  const [draggedElementId, setDraggingElementId] = useState<string | null>(null);
  const [resizingElementId, setResizingElementId] = useState<string | null>(null);
  const [resizeDirection, setResizeDirection] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const initialResizeState = useRef({ width: 0, height: 0, x: 0, y: 0, mouseX: 0, mouseY: 0 });

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

  const handleElementMouseDown = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (onSelectElement) onSelectElement(id);

    const el = data.customElements.find(el => el.id === id);
    if (!el || !cardRef.current) return; // Note: In split view, we need to know WHICH cardRef.
    // Actually, dragging custom elements in split view might be tricky if we don't know the container context.
    // For MVP, dragging works best on the active preview area.

    const target = e.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement?.getBoundingClientRect();

    if (!parentRect) return;

    // Calculate offset from the element's top-left corner
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };

    setDraggingElementId(id);
  };

  const handleResizeMouseDown = (e: React.MouseEvent, id: string, direction: string) => {
    e.stopPropagation();
    if (onSelectElement) onSelectElement(id);

    const el = data.customElements.find(el => el.id === id);
    if (!el) return;

    // We need pixel values for resizing calculations
    const elementNode = document.getElementById(`element-${id}`);
    const container = elementNode?.parentElement;
    if (!elementNode || !container) return;

    const elRect = elementNode.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    initialResizeState.current = {
      width: elRect.width,
      height: elRect.height,
      x: el.x, // keep as percentage
      y: el.y, // keep as percentage
      mouseX: e.clientX,
      mouseY: e.clientY
    };

    setResizingElementId(id);
    setResizeDirection(direction);
  };

  const handleFieldMouseDown = (e: React.MouseEvent, fieldId: string) => {
    e.stopPropagation();
    e.preventDefault();

    console.log(`MouseDown on field: ${fieldId}`);
    draggedFieldIdRef.current = fieldId;
    setIsFieldDragging(true);

    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialFieldPos.current = {
      x: data.fieldSettings?.[fieldId]?.x || 0,
      y: data.fieldSettings?.[fieldId]?.y || 0
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // QR Code Dragging
      if (isDragging && cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
        onPositionChangeRef.current(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
      }

      // Field Dragging
      if (isFieldDragging && draggedFieldIdRef.current) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        const scale = style.contentScale || 1;

        if (onFieldUpdateRef.current) {
          onFieldUpdateRef.current(draggedFieldIdRef.current, {
            x: initialFieldPos.current.x + (deltaX / scale),
            y: initialFieldPos.current.y + (deltaY / scale)
          });
        }
      }

      // Custom Element Resizing
      if (resizingElementId && onUpdateElement && resizeDirection) {
        const elNode = document.getElementById(`element-${resizingElementId}`);
        const container = elNode?.parentElement;
        if (!container) return;

        const containerRect = container.getBoundingClientRect();
        const deltaX = e.clientX - initialResizeState.current.mouseX;
        const deltaY = e.clientY - initialResizeState.current.mouseY;

        let newWidth = initialResizeState.current.width;
        let newHeight = initialResizeState.current.height;
        let newX = initialResizeState.current.x; // %
        let newY = initialResizeState.current.y; // %

        // Horizontal Resizing
        if (resizeDirection.includes('e')) {
          newWidth += deltaX;
        } else if (resizeDirection.includes('w')) {
          newWidth -= deltaX;
          // When growing left, we need to adjust X to keep right side stationary visually
          // X is %, Width is px.
          // New X% = Old X% + (deltaX / containerWidth * 100)
          newX += (deltaX / containerRect.width) * 100;
        }

        // Vertical Resizing
        if (resizeDirection.includes('s')) {
          newHeight += deltaY;
        } else if (resizeDirection.includes('n')) {
          newHeight -= deltaY;
          newY += (deltaY / containerRect.height) * 100;
        }

        const updates: any = {
          style: { width: Math.max(20, newWidth), height: Math.max(20, newHeight) }
        };

        if (resizeDirection.includes('w')) updates.x = newX;
        if (resizeDirection.includes('n')) updates.y = newY;

        onUpdateElement(resizingElementId, updates);

        // Note: updating X/Y during W/N resize is tricky because of the mixed units.
        // For simple MVP, maybe restrict to E/S/SE resizing?
        // User asked for "corners... sideways... up/down".
        // Let's support at least SE (corner), E (right), S (bottom) first which is stable.
        // For full support we need to update X/Y.
      }

      // Custom Element Dragging
      if (draggedElementId && onUpdateElement && !resizingElementId) {
         // ... (existing drag logic)
         const elNode = document.getElementById(`element-${draggedElementId}`);
         const container = elNode?.parentElement;

         if (container) {
            const rect = container.getBoundingClientRect();
            const x = ((e.clientX - rect.left - dragOffset.current.x) / rect.width) * 100;
            const y = ((e.clientY - rect.top - dragOffset.current.y) / rect.height) * 100;

            onUpdateElement(draggedElementId, { x, y });
         }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsFieldDragging(false);
      setDraggingElementId(null);
      setResizingElementId(null);
      setResizeDirection(null);
      draggedFieldIdRef.current = null;
    };

    if (isDragging || draggedElementId || resizingElementId || isFieldDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, draggedElementId, resizingElementId, resizeDirection, isFieldDragging, style.contentScale]);

  // Helper to render draggable fields - defined as a regular function to avoid component remount issues
  const renderDraggableField = (id: string, children: React.ReactNode, className: string = '', customStyle: React.CSSProperties = {}) => {
    const setting = data.fieldSettings?.[id];
    if (setting && !setting.visible) return null;

    const x = setting?.x || 0;
    const y = setting?.y || 0;

    return (
      <div
        onMouseDown={(e) => {
          console.log(`Dragging field: ${id}`);
          handleFieldMouseDown(e, id);
        }}
        className={`cursor-move hover:outline hover:outline-1 hover:outline-blue-400 hover:bg-blue-50/10 rounded px-1 -mx-1 transition-colors relative z-10 ${className}`}
        style={{
          transform: `translate(${x}px, ${y}px)`,
          ...customStyle
        }}
        title="드래그하여 위치 이동"
      >
        {children}
      </div>
    );
  };

  const getQrUrl = () => {
    const link = data.qrUrl || '';
    const cleanLink = link.startsWith('http') ? link : `https://${link}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(cleanLink)}`;
  };

  const renderQR = () => {
    // Determine visibility based on side
    const isBack = isFlipped || (style.theme === 'minimal' && false); // Hacky way to access local scope variable if needed, but actually we need 'side' context
    // Actually, renderTheme calls renderQR without args, but we can pass args or check context.
    // Wait, renderTheme calls renderQR inside it.
    // Let's modify renderQR to accept 'side' argument.
    return null; // Implementation moved to new function below
  };

  const renderQRCodeElement = (side: 'front' | 'back') => {
    // If back side logo type, never show QR on back
    if (side === 'back' && data.backSideType === 'logo') return null;

    // Check toggle for each side
    const show = side === 'front' ? data.showQrCode : data.showBackQrCode;
    if (!show) return null;

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

    // Logo Back Side Special Rendering
    if (isBack && data.backSideType === 'logo') {
       return (
         <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-white gap-4">
            <div className="absolute inset-0 opacity-10" style={{ backgroundColor: style.primaryColor }} />

            {data.logoUrl ? (
              <img src={data.logoUrl} alt="Brand Logo" className="max-w-[50%] max-h-[50%] object-contain" />
            ) : !data.logoText ? (
               <p className="text-slate-400 font-bold text-sm">로고를 업로드하거나 텍스트를 입력해주세요</p>
            ) : null}

            {data.logoText && (
              <h1 className="font-playfair font-bold text-3xl text-slate-800 text-center px-8 leading-tight" style={{ color: style.primaryColor }}>
                {data.logoText}
              </h1>
            )}
         </div>
       );
    }

    // Custom Back Side Rendering
    if (isBack && data.backSideType === 'custom') {
      return (
        <div className="w-full h-full relative overflow-hidden bg-white">
           {/* Background Grid for Edit Mode (Optional) */}
           <div className="absolute inset-0 opacity-5 pointer-events-none"
                style={{ backgroundImage: `radial-gradient(${style.primaryColor} 1px, transparent 1px)`, backgroundSize: '20px 20px' }}
           />

           {data.customElements?.map(el => (
             <div
               key={el.id}
               id={`element-${el.id}`}
               onMouseDown={(e) => handleElementMouseDown(e, el.id)}
               className={`absolute cursor-move group hover:outline hover:outline-1 hover:outline-blue-300 ${selectedElementId === el.id ? 'outline outline-2 outline-blue-500 z-50' : 'z-10'}`}
               style={{
                 left: `${el.x}%`,
                 top: `${el.y}%`,
                 transform: 'translate(0, 0)', // Position top-left at x,y
                 maxWidth: '100%',
                 maxHeight: '100%'
               }}
             >
               {el.type === 'text' ? (
                 <div style={{
                   fontSize: `${el.style.fontSize}px`,
                   color: el.style.color,
                   fontWeight: el.style.fontWeight,
                   fontFamily: el.style.fontFamily,
                   textAlign: el.style.align,
                   whiteSpace: 'pre-wrap',
                   lineHeight: 1.2
                 }}>
                   {el.content}
                 </div>
               ) : (
                 <img
                   src={el.content}
                   alt="Custom Element"
                   style={{
                     width: el.style.width ? `${el.style.width}px` : 'auto',
                     height: el.style.height ? `${el.style.height}px` : 'auto',
                     pointerEvents: 'none', // Prevent native drag
                     objectFit: 'fill' // Stretch to fill dimensions as requested
                   }}
                 />
               )}

               {/* Selection Indicators (Resize Handles) */}
               {selectedElementId === el.id && el.type === 'image' && (
                 <>
                           {/* Corners */}
                           <div
                             className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-nw-resize z-50 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'nw')}
                           />
                           <div
                             className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ne-resize z-50 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'ne')}
                           />
                           <div
                             className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-sw-resize z-50 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'sw')}
                           />
                           <div
                             className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-se-resize z-50 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'se')}
                           />

                           {/* Edges */}
                           <div
                             className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-4 h-2 bg-transparent cursor-n-resize z-40 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'n')}
                           />
                           <div
                             className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-4 h-2 bg-transparent cursor-s-resize z-40 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 's')}
                           />
                           <div
                             className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 h-4 w-2 bg-transparent cursor-w-resize z-40 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'w')}
                           />
                           <div
                             className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 h-4 w-2 bg-transparent cursor-e-resize z-40 no-print"
                             onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'e')}
                           />
                 </>
               )}
             </div>
           ))}

           {(!data.customElements || data.customElements.length === 0) && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <p className="text-slate-400 font-bold text-sm">요소를 추가하여 꾸며보세요</p>
              </div>
           )}
        </div>
      );
    }

    switch (style.theme) {
      case 'minimal':
        return (
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

      case 'creative':
        return (
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

      case 'professional':
        return (
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

      case 'dark':
        return (
          <div className="w-full h-full p-10 flex flex-col justify-between bg-slate-950 text-white overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(to right, ${style.primaryColor}, ${style.accentColor})` }} />

            <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
              {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight mb-2">{displayData.name}</h2>)}
              <div className="flex items-center gap-2">
                <div className="w-4 h-[2px]" style={{ backgroundColor: style.primaryColor }} />
                {renderDraggableField('position', <p className="text-sm font-medium text-slate-400">{displayData.position}</p>)}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="space-y-1.5" style={{ fontSize: `${s(12)}px` }}>
                {renderDraggableField('email', <p className="font-mono text-slate-300 flex items-center gap-2"><Mail size={s(12)} /> {displayData.email}</p>)}
                {renderDraggableField('contact', <p className="font-mono text-slate-300 flex items-center gap-2"><Phone size={s(12)} /> {displayData.contact}</p>)}
                {renderDraggableField('location', <p className="font-mono text-slate-300 flex items-center gap-2"><MapPin size={s(12)} /> {displayData.location}</p>)}
              </div>
              <div className="text-right space-y-0.5" style={{ fontSize: `${s(12)}px` }}>
                {renderDraggableField('github', <p className="font-bold flex items-center justify-end gap-2" style={{ color: style.accentColor }}><Github size={s(12)} /> {displayData.github}</p>)}
                {renderDraggableField('blog', <p className="text-slate-500" style={{ fontSize: `${s(10)}px` }}>{displayData.blog}</p>)}
              </div>
            </div>
            {renderQRCodeElement(isBack ? 'back' : 'front')}
          </div>
        );

      case 'glassmorphism':
        return (
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

              case 'chalk':
                return (
                  <div className="w-full h-full p-10 bg-[#1a1a1a] text-white relative overflow-hidden flex flex-col justify-center items-center text-center" style={{ border: '4px solid #fff', borderRadius: '4px', boxShadow: 'inset 0 0 50px #000' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-board.png')]" />
                    <div className="z-10 space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-bold" style={{ fontFamily: 'Chalkboard, Comic Sans MS, sans-serif' }}>{displayData.name}</h2>)}
                      <div className="w-32 h-1 bg-white mx-auto opacity-50" style={{ borderRadius: '50% / 100%' }} />
                      {renderDraggableField('position', <p className="text-lg italic opacity-80">{displayData.position}</p>)}
                      <div className="pt-6 space-y-1 text-sm opacity-60">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'magazine':
                return (
                  <div className="w-full h-full p-0 flex flex-col bg-white text-black font-serif relative overflow-hidden">
                    <div className="h-1/4 bg-slate-900 flex items-center justify-center">
                      <div className="text-[10px] text-white font-black tracking-[1em] uppercase">ISSUE NO. 01 // 2025</div>
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between items-start">
                      <div className="space-y-[-10px]">
                        {renderDraggableField('name', <h2 className="text-7xl font-black italic tracking-tighter leading-none">{displayData.name}</h2>)}
                      </div>
                      <div className="w-full flex justify-between items-end border-t-4 border-black pt-4">
                        {renderDraggableField('position', <p className="text-xl font-bold uppercase">{displayData.position}</p>)}
                        <div className="text-right text-[10px] font-bold leading-tight">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'sticker':
                return (
                  <div className="w-full h-full p-8 bg-[#f0f0f0] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-striped-brick.png')]" />
                    <div className="z-10 relative flex flex-col h-full gap-4">
                      <div className="bg-white p-6 rounded-2xl border-4 border-slate-900 shadow-[8px_8px_0px_0px_#000] rotate-[-2deg] self-start">
                        {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 uppercase">{displayData.name}</h2>)}
                      </div>
                      <div className="bg-blue-500 text-white p-3 rounded-xl border-4 border-slate-900 shadow-[6px_6px_0px_0px_#000] rotate-[3deg] self-end mt-4">
                        {renderDraggableField('position', <p className="text-lg font-bold">{displayData.position}</p>)}
                      </div>
                      <div className="mt-auto space-y-2">
                        <div className="bg-yellow-400 p-2 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] inline-block">
                          {renderDraggableField('email', <p className="text-[10px] font-bold">{displayData.email}</p>)}
                        </div>
                        <br/>
                        <div className="bg-pink-400 p-2 rounded-lg border-2 border-slate-900 shadow-[4px_4px_0px_0px_#000] inline-block">
                          {renderDraggableField('contact', <p className="text-[10px] font-bold">{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'space':
                return (
                  <div className="w-full h-full p-12 bg-slate-950 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60" />
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full animate-ping" />
                    <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-500" />
                    <div className="z-10 space-y-6">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/10 blur-2xl rounded-full" />
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-widest uppercase relative">{displayData.name}</h2>)}
                      </div>
                      <div className="h-px w-24 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-30" />
                      {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.5em] text-slate-400 uppercase">{displayData.position}</p>)}
                      <div className="pt-8 text-[9px] font-bold tracking-[0.2em] text-slate-500 flex gap-4">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'marble':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden border-[20px] border-slate-50 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/marble.png')]" />
                    <div className="h-full border border-slate-200 p-8 flex flex-col justify-between items-center text-center">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-bold tracking-tight text-slate-800">{displayData.name}</h2>)}
                        <div className="w-8 h-px bg-slate-300 mx-auto" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[9px] font-medium text-slate-500 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'wood':
                return (
                  <div className="w-full h-full p-12 bg-[#5d4037] text-[#fbe9e7] relative overflow-hidden shadow-inner border-8 border-[#4e342e]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
                    <div className="h-full border-2 border-white/10 p-8 flex flex-col justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none opacity-90">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-[#d7ccc8] mt-2 italic">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold opacity-70">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="opacity-30">SINCE 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'paper':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfdfd] text-[#2c3e50] relative overflow-hidden shadow-inner">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
                    <div className="absolute top-0 left-0 w-full h-full border-t-[40px] border-l-[40px] border-transparent border-t-white border-l-white drop-shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-6">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-slate-200" />
                      <div className="space-y-1 text-[10px] font-bold text-slate-500">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'techno':
                return (
                  <div className="w-full h-full p-8 bg-slate-900 text-purple-400 font-mono relative overflow-hidden border-2 border-purple-500/20">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#a855f7_1px,_transparent_1px)] bg-[size:20px_20px]" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className="border-l-4 border-purple-500 pl-4">
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-[10px] font-bold mt-1 text-purple-300 tracking-widest">{`// USER_ROLE: ${displayData.position}`}</p>)}
                        </div>
                        <div className="text-[8px] text-purple-900 font-black px-2 py-1 bg-purple-400 rounded-sm">TECH_OS_v4.0</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase">
                        <div className="bg-slate-800/50 p-2 border border-purple-500/30">
                          <p className="text-purple-600 mb-1">CONTACT_INFO</p>
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="bg-slate-800/50 p-2 border border-purple-500/30">
                          <p className="text-purple-600 mb-1">LOCATION_DATA</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                          {renderDraggableField('github', <p>{displayData.github.replace('github.com/', 'G://')}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'glitch':
                return (
                  <div className="w-full h-full p-10 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]" />
                    <div className="relative z-10">
                      <div className="relative inline-block">
                        <div className="absolute -top-1 -left-1 w-full h-full text-red-500 opacity-70 translate-x-1 translate-y-1 select-none pointer-events-none text-5xl font-black tracking-tighter italic">{displayData.name}</div>
                        <div className="absolute -top-1 -left-1 w-full h-full text-cyan-500 opacity-70 -translate-x-1 -translate-y-1 select-none pointer-events-none text-5xl font-black tracking-tighter italic">{displayData.name}</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter relative">{displayData.name}</h2>)}
                      </div>
                      <div className="mt-4 bg-white text-black px-4 py-1 font-bold text-sm uppercase tracking-[0.3em]">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                      <div className="mt-12 space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'bauhaus':
                return (
                  <div className="w-full h-full bg-[#e5e5e5] text-black font-sans relative overflow-hidden grid grid-cols-12 h-full">
                    <div className="col-span-4 bg-yellow-400 h-full flex items-center justify-center border-r-8 border-black">
                      {renderDraggableField('name', <h2 className="text-6xl font-black -rotate-90 tracking-tighter uppercase">{displayData.name}</h2>)}
                    </div>
                    <div className="col-span-8 flex flex-col justify-between p-12">
                      <div className="flex gap-4">
                        <div className="w-12 h-12 bg-red-600 rounded-full border-4 border-black" />
                        <div className="w-12 h-12 bg-blue-600 border-4 border-black" />
                      </div>
                      <div className="space-y-6">
                        <div className="bg-black text-white p-4">
                          {renderDraggableField('position', <p className="text-2xl font-black uppercase italic leading-none">{displayData.position}</p>)}
                        </div>
                        <div className="space-y-1 text-xs font-black uppercase tracking-tighter border-l-8 border-red-600 pl-4">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'industrial':
                return (
                  <div className="w-full h-full p-8 bg-[#333] text-[#ddd] relative overflow-hidden font-sans uppercase">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)', backgroundSize: '10px 10px' }} />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="border-4 border-[#555] p-6 inline-block">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-yellow-500 mt-2">UNIT // {displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-mono">
                        <div className="space-y-1">
                          {renderDraggableField('contact', <p>PH: {displayData.contact}</p>)}
                          {renderDraggableField('email', <p>EM: {displayData.email}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-30 mb-1">SPEC_01 // 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'futuristic':
                return (
                  <div className="w-full h-full p-10 bg-[#050505] text-blue-400 relative overflow-hidden font-mono">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#1e3a8a_0%,_transparent_80%)] opacity-20" />
                    <div className="absolute top-0 right-0 w-1/3 h-1/3 border-t border-r border-blue-500/30" />
                    <div className="absolute bottom-0 left-0 w-1/3 h-1/3 border-b border-l border-blue-500/30" />
                    <div className="relative z-10 flex flex-col h-full justify-center">
                      <div className="mb-8">
                        <div className="text-[8px] opacity-50 mb-1 tracking-[0.5em] uppercase">IDENTIFICATION_SIGNAL</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-[0.2em] text-white uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-blue-300 mt-2 bg-blue-900/30 px-2 py-0.5 inline-block border-l-2 border-blue-400">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[9px] tracking-widest uppercase">
                        {renderDraggableField('email', <p><span className="text-white">LINK:</span> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p><span className="text-white">FREQ:</span> {displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'holographic':
                return (
                  <div className="w-full h-full p-10 relative overflow-hidden flex flex-col items-center justify-center text-white"
                       style={{ background: 'linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 mix-blend-overlay animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/glass-dots.png')] opacity-10" />
                    <div className="bg-white/20 backdrop-blur-xl p-12 rounded-[50px] border border-white/30 shadow-2xl text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight drop-shadow-lg" style={{ color: style.primaryColor }}>{displayData.name}</h2>)}
                      <div className="h-px w-12 bg-white/50 mx-auto" />
                      {renderDraggableField('position', <p className="text-sm font-bold opacity-80" style={{ color: style.accentColor }}>{displayData.position}</p>)}
                      <div className="pt-4 flex flex-col gap-1 text-[10px] font-bold text-white/70">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'swiss':
                return (
                  <div className="w-full h-full bg-[#f3f4f6] text-black font-sans relative overflow-hidden grid grid-cols-12 grid-rows-12">
                    <div className="col-span-12 row-span-1 bg-red-600" />
                    <div className="col-span-1 row-span-11 bg-black" />
                    <div className="col-span-11 row-span-11 p-12 flex flex-col justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase leading-[0.8]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xl font-bold mt-4 lowercase opacity-40">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t-2 border-black pt-6">
                        <div className="space-y-1 text-xs font-bold uppercase tracking-tighter">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-[10px] font-black leading-none text-right">
                          <p>CH-2025</p>
                          <p>DESIGN_STD</p>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'botanical':
                return (
                  <div className="w-full h-full p-12 bg-[#faf9f6] text-[#2d3a2d] relative overflow-hidden font-serif">
                    <div className="absolute -top-12 -right-12 w-48 h-48 opacity-10 rotate-12 pointer-events-none">
                      <Globe size={200} strokeWidth={1} />
                    </div>
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 -rotate-12 pointer-events-none">
                      <Target size={200} strokeWidth={1} />
                    </div>
                    <div className="h-full border-2 border-[#2d3a2d]/10 flex flex-col justify-between p-8">
                      <div className="text-center">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold italic mb-1">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.3em] opacity-60 font-sans">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-center text-[10px] font-medium opacity-70 italic">
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                        <div className="flex justify-center gap-4">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'artdeco':
                return (
                  <div className="w-full h-full p-12 bg-[#1a1a1a] text-[#c5a059] relative overflow-hidden">
                    <div className="absolute inset-0 border-[16px] border-[#c5a059]/20 pointer-events-none" />
                    <div className="absolute inset-4 border border-[#c5a059]/40 pointer-events-none" />
                    <div className="h-full border-2 border-[#c5a059]/60 flex flex-col justify-center items-center text-center p-8">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-[0.1em] uppercase leading-none">{displayData.name}</h2>)}
                          <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c5a059] to-transparent" />
                        </div>
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.5em] font-light italic">{displayData.position}</p>)}
                      </div>
                      <div className="absolute bottom-16 w-full px-12 flex justify-between text-[8px] uppercase tracking-[0.2em] font-bold">
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'minimalblack':
                return (
                  <div className="w-full h-full p-12 bg-black text-white flex flex-col items-center justify-center text-center relative">
                    <div className="space-y-6">
                      {renderDraggableField('name', <h2 className="text-4xl font-extralight tracking-[0.4em] uppercase">{displayData.name}</h2>)}
                      <div className="w-8 h-px bg-white/30 mx-auto" />
                      {renderDraggableField('position', <p className="text-[10px] font-bold uppercase tracking-[0.6em] opacity-40">{displayData.position}</p>)}
                    </div>
                    <div className="absolute bottom-12 space-y-1 text-[8px] font-bold uppercase tracking-widest opacity-30">
                      {renderDraggableField('email', <p>{displayData.email}</p>)}
                      {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cardboard':
                return (
                  <div className="w-full h-full p-10 bg-[#c2a38e] text-[#4a3728] relative overflow-hidden" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cardboard.png")' }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-black/5" />
                    <div className="h-full border-4 border-[#4a3728]/20 flex flex-col justify-between p-8 border-dashed">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter bg-[#4a3728] text-[#c2a38e] px-4 py-1 inline-block">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold border-2 border-[#4a3728] px-2 py-0.5 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-xs font-bold font-mono">
                        {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'zen':
                return (
                  <div className="w-full h-full p-16 bg-white text-slate-900 relative overflow-hidden flex justify-between items-center">
                    <div className="absolute top-0 right-0 w-1 h-full bg-slate-100" />
                    <div className="flex flex-col gap-8">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-light tracking-widest" style={{ writingMode: 'vertical-rl' }}>{displayData.name}</h2>)}
                      </div>
                    </div>
                    <div className="flex flex-col h-full justify-between items-end text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                      <div className="space-y-4 pt-12" style={{ writingMode: 'vertical-rl' }}>
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                      <div className="space-y-4 pb-4">
                        {renderDraggableField('email', <p style={{ writingMode: 'vertical-rl' }}>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p style={{ writingMode: 'vertical-rl' }}>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'magical':
                return (
                  <div className="w-full h-full p-12 bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-40" />
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px]" />
                    <div className="relative z-10 space-y-6">
                      <div className="relative">
                        <Sparkles className="absolute -top-8 -left-8 text-yellow-400 opacity-50 animate-pulse" size={32} />
                        <Sparkles className="absolute -bottom-8 -right-8 text-yellow-400 opacity-50 animate-pulse delay-700" size={24} />
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'comic':
                return (
                  <div className="w-full h-full p-8 bg-white text-black font-black relative overflow-hidden border-4 border-black">
                    <div className="absolute top-0 right-0 w-32 h-full bg-yellow-400 -skew-x-6 translate-x-12 border-l-4 border-black pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-[-10px] transform -rotate-2">
                        <div className="bg-red-500 text-white px-4 py-2 inline-block border-4 border-black shadow-[6px_6px_0px_0px_#000]">
                          {renderDraggableField('name', <h2 className="text-5xl uppercase italic">{displayData.name}</h2>)}
                        </div>
                        <br/>
                        <div className="bg-white text-black px-3 py-1 inline-block border-4 border-black mt-2">
                          {renderDraggableField('position', <p className="text-xl">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="bg-white p-3 border-4 border-black rounded-full shadow-[4px_4px_0px_0px_#000]">
                          {renderDraggableField('contact', <p className="text-[10px]">{displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-[10px] font-bold space-y-1">
                          {renderDraggableField('email', <p className="bg-yellow-200 px-1 border-2 border-black">{displayData.email}</p>)}
                          {renderDraggableField('location', <p className="bg-cyan-200 px-1 border-2 border-black">{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'midnight':
                return (
                  <div className="w-full h-full p-10 bg-slate-950 flex flex-col justify-between items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.15),_transparent_70%)]" />
                    <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl" />

                    <div className="z-10 space-y-4 pt-12">
                      <div className="relative inline-block">
                        <div className="absolute -inset-4 bg-indigo-500/20 blur-xl rounded-full" />
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-white tracking-tighter leading-none relative">{displayData.name}</h2>)}
                      </div>
                      {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-400">{displayData.position}</p>)}
                    </div>

                    <div className="z-10 w-full flex justify-between items-center px-4 mb-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      {renderDraggableField('email', <span>{displayData.email}</span>)}
                      <div className="w-1 h-1 bg-indigo-500 rounded-full" />
                      {renderDraggableField('location', <span>{displayData.location}</span>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'vintage':
                return (
                  <div className="w-full h-full p-12 bg-[#ece0d1] text-[#432818] font-serif relative overflow-hidden border-[16px] border-[#967e76]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-mathematics.png')]" />
                    <div className="relative z-10 h-full flex flex-col justify-between border-2 border-[#432818]/30 p-8">
                      <div className="text-center space-y-2">
                        <div className="text-[10px] font-bold uppercase tracking-[0.5em] opacity-60">EST. 2025</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-bold uppercase tracking-tight">{displayData.name}</h2>)}
                        <div className="w-full h-[1px] bg-[#432818]/40" />
                        {renderDraggableField('position', <p className="text-sm italic">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[9px] font-bold uppercase text-center tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'pixel':
                return (
                  <div className="w-full h-full p-8 bg-[#1a1c2c] text-[#5d275d] relative overflow-hidden flex flex-col justify-between" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')]" />
                    <div className="bg-[#f4f4f4] p-6 border-b-8 border-r-8 border-[#333] relative">
                      {renderDraggableField('name', <h2 className="text-4xl font-black text-[#1a1c2c] uppercase leading-none">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-[#ef7d57] mt-2 font-mono">{`> ${displayData.position}`}</p>)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1 text-[#b13e53] font-mono text-[9px] font-black">
                        {renderDraggableField('email', <p>@: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>#: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-[#ef7d57] flex items-center justify-center border-4 border-[#1a1c2c] shadow-[4px_4px_0px_0px_#333]">
                        <div className="w-4 h-4 bg-white" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'soft':
                return (
                  <div className="w-full h-full p-12 bg-slate-50 text-slate-800 relative overflow-hidden">
                    <div className="h-full bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-10 flex flex-col justify-between border border-slate-100">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-semibold text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-2xl flex items-center justify-center">
                            <Mail size={14} className="text-slate-400" />
                          </div>
                          {renderDraggableField('email', <p className="text-[10px] font-bold text-slate-600">{displayData.email}</p>)}
                        </div>
                        <div className="space-y-3">
                          <div className="w-8 h-8 bg-slate-50 rounded-2xl flex items-center justify-center">
                            <Phone size={14} className="text-slate-400" />
                          </div>
                          {renderDraggableField('contact', <p className="text-[10px] font-bold text-slate-600">{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'sketch':
                return (
                  <div className="w-full h-full p-10 bg-white text-slate-800 relative overflow-hidden font-serif" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}>
                    <div className="absolute inset-4 border-2 border-slate-800 rounded-lg pointer-events-none" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
                    <div className="z-10 flex flex-col h-full justify-center items-center text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-bold tracking-tighter" style={{ fontFamily: 'Brush Script MT, cursive' }}>{displayData.name}</h2>)}
                      <div className="w-24 h-px bg-slate-400 rotate-2" />
                      {renderDraggableField('position', <p className="text-lg opacity-80 italic">{displayData.position}</p>)}
                      <div className="pt-4 space-y-1 text-sm font-sans">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'brutalist':
                return (
                  <div className="w-full h-full p-8 bg-[#e2e8f0] text-black font-black relative overflow-hidden border-[12px] border-black">
                    <div className="flex flex-col h-full justify-between uppercase">
                      <div className="space-y-[-10px]">
                        {renderDraggableField('name', <h2 className="text-7xl leading-none tracking-tighter break-all">{displayData.name}</h2>)}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="bg-yellow-400 p-2 shadow-[8px_8px_0px_0px_#000]">
                          {renderDraggableField('position', <p className="text-xl">{displayData.position}</p>)}
                        </div>
                        <div className="text-right text-[10px] space-y-1">
                          {renderDraggableField('email', <p className="bg-white px-1">MAIL_{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="bg-white px-1">TEL_{displayData.contact}</p>)}
                          {renderDraggableField('location', <p className="bg-white px-1">LOC_{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'pastel':
                return (
                  <div className="w-full h-full p-10 bg-[#fff5f5] text-slate-600 relative overflow-hidden rounded-[40px]">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-100 rounded-full -translate-y-12 translate-x-12 opacity-50" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-100 rounded-full translate-y-8 -translate-x-8 opacity-50" />
                    <div className="flex flex-col h-full justify-between items-center text-center z-10 relative">
                      <div className="space-y-2 pt-8">
                        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[30px] shadow-sm border border-pink-100">
                          {renderDraggableField('name', <h2 className="text-4xl font-bold text-pink-400">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm font-medium text-blue-300 mt-1">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-1 text-xs font-semibold pb-4 text-slate-400">
                        {renderDraggableField('email', <p className="bg-white px-3 py-1 rounded-full">{displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="bg-white px-3 py-1 rounded-full">{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'gradient':
                return (
                  <div className="w-full h-full p-10 text-white relative overflow-hidden flex flex-col justify-between"
                       style={{ background: `linear-gradient(135deg, ${style.primaryColor}, ${style.accentColor}, #7c3aed)` }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tight leading-none mb-2">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-bold opacity-80 uppercase tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div className="space-y-1 text-[10px] font-bold">
                        {renderDraggableField('email', <p className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md backdrop-blur-md border border-white/20"><Mail size={10}/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-2 px-2 py-1 bg-white/10 rounded-md backdrop-blur-md border border-white/20"><Phone size={10}/> {displayData.contact}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg rotate-12">
                        <Sparkles size={24} style={{ color: style.primaryColor }} />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'architect':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-900 font-sans relative overflow-hidden border-l-[24px] border-slate-900">
                    <div className="h-full flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="relative">
                          {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tighter leading-none">{displayData.name}</h2>)}
                          <div className="absolute -left-12 top-1/2 w-8 h-px bg-slate-400" />
                        </div>
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.5em] text-slate-400 border-b border-slate-100 pb-4 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-8 text-[9px] font-bold uppercase tracking-widest text-slate-500">
                        <div className="space-y-2">
                          {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                        </div>
                        <div className="space-y-2">
                          {renderDraggableField('location', <p>L. {displayData.location}</p>)}
                          {renderDraggableField('github', <p>G. {displayData.github}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cyber':
                return (
                  <div className="w-full h-full p-8 bg-black text-lime-400 font-mono relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 text-[8px] opacity-30">ENCRYPTED_ID: {Math.random().toString(16).slice(2, 10)}</div>
                    <div className="relative z-10 space-y-8">
                      <div className="border-b-2 border-lime-500 pb-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold italic tracking-tighter"> {displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-white bg-lime-600 px-2 inline-block"> {displayData.position} </p>)}
                      </div>
                      <div className="space-y-1 text-xs">
                        {renderDraggableField('email', <p><span className="opacity-50">#</span> {displayData.email}</p>)}
                        {renderDraggableField('github', <p><span className="opacity-50">#</span> {displayData.github}</p>)}
                        {renderDraggableField('location', <p><span className="opacity-50">#</span> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-lime-500" />
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'eco':
                return (
                  <div className="w-full h-full p-10 bg-[#f1f5f1] text-emerald-900 relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl" />
                    <div className="flex flex-col h-full justify-between items-start">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-bold text-emerald-950">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-medium text-emerald-700/80">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[10px] font-semibold tracking-wide border-l-2 border-emerald-200 pl-4">
                        {renderDraggableField('email', <p className="flex items-center gap-2"><Mail size={10}/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-2"><Phone size={10}/> {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-2"><MapPin size={10}/> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute top-8 right-10 text-emerald-800/20"><Globe size={80} /></div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'blueprint':
                return (
                  <div className="w-full h-full p-8 bg-[#1e3a8a] text-white font-mono relative overflow-hidden border-2 border-white/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                         style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                    />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-2 border-dashed border-white/40 p-4">
                        {renderDraggableField('name', <h2 className="text-3xl font-bold uppercase tracking-widest">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-blue-200 mt-1">[ POSITION: {displayData.position} ]</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] uppercase">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                        </div>
                        <div className="space-y-1 text-right">
                          {renderDraggableField('location', <p>L: {displayData.location}</p>)}
                          {renderDraggableField('github', <p>G: {displayData.github}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'neon':
                return (
                  <div className="w-full h-full p-10 bg-slate-950 flex flex-col justify-center items-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20" />
                    <div className="relative z-10 space-y-6">
                      <div style={{ filter: `drop-shadow(0 0 10px ${style.primaryColor})` }}>
                        {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter" style={{ color: 'white' }}>{displayData.name}</h2>)}
                      </div>
                      <div className="inline-block px-4 py-1 border-2" style={{ borderColor: style.accentColor, boxShadow: `0 0 15px ${style.accentColor}` }}>
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: style.accentColor }}>{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-4 text-[9px] font-bold text-slate-400">
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                        <span>•</span>
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'newspaper':
                return (
                  <div className="w-full h-full p-8 bg-[#f4f1ea] text-slate-900 font-serif relative overflow-hidden border-double border-4 border-slate-800">
                    <div className="border-b-4 border-slate-900 pb-2 mb-4 flex justify-between items-baseline">
                      <h4 className="text-[10px] font-black uppercase">Edition 2025</h4>
                      <h4 className="text-[10px] font-black uppercase">Professional Profile</h4>
                    </div>
                    <div className="flex-1">
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none mb-4">{displayData.name}</h2>)}
                      <div className="grid grid-cols-2 gap-6 pt-2">
                        <div className="space-y-3">
                          {renderDraggableField('position', <p className="text-sm font-bold bg-slate-900 text-white px-2 py-1 leading-tight">{displayData.position}</p>)}
                          {renderDraggableField('goal', <p className="text-[11px] leading-snug text-slate-700 italic border-t border-slate-300 pt-2">{displayData.goal}</p>)}
                        </div>
                        <div className="space-y-1 text-[10px] font-bold uppercase tracking-tighter">
                          {renderDraggableField('email', <p className="border-b border-slate-300 pb-1">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="border-b border-slate-300 pb-1">{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'luxury':
                return (
                  <div className="w-full h-full p-12 flex flex-col justify-center items-center bg-slate-950 text-white relative overflow-hidden">
                    <div className="absolute inset-6 border border-[#d4af37]/30 pointer-events-none" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full" />
                    <div className="text-center z-10 space-y-6">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif tracking-[0.2em] text-[#d4af37]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.4em] text-slate-400 font-light">{displayData.position}</p>)}
                      </div>
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
                      <div className="space-y-1 text-[9px] uppercase tracking-widest text-slate-500 font-medium">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'geometric':
                return (
                  <div className="w-full h-full bg-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-slate-50 -skew-x-12 -translate-x-16 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-2 h-full pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
                    <div className="p-12 h-full flex flex-col justify-between relative z-10">
                      <div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-slate-900 leading-none mb-2">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="inline-block px-2 py-1 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-tighter">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1 text-xs font-bold text-slate-400">
                          {renderDraggableField('email', <p className="hover:text-slate-900 transition-colors">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="hover:text-slate-900 transition-colors">{displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-100" style={{ color: style.primaryColor }}>
                          <ExternalLink size={20} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'retro':
                return (
                  <div className="w-full h-full p-8 bg-[#fdf2f8] flex flex-col justify-between border-8 border-white shadow-[10px_10px_0px_0px_#fbcfe8] relative overflow-hidden font-mono">
                    <div className="absolute top-4 right-4 w-12 h-12 border-4 border-yellow-400 rounded-full opacity-20 pointer-events-none" />
                    <div className="absolute bottom-12 left-12 w-8 h-8 border-4 border-blue-400 rotate-45 opacity-20 pointer-events-none" />

                    <div className="space-y-4">
                      <div className="bg-white p-4 border-4 border-slate-900 shadow-[4px_4px_0px_0px_#1e293b]">
                        {renderDraggableField('name', <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-pink-600">{displayData.position}</p>)}
                      </div>
                    </div>

                    <div className="space-y-2 text-[10px] font-bold text-slate-700">
                      {renderDraggableField('contact', <p className="bg-yellow-200 inline-block px-2">TEL: {displayData.contact}</p>)}
                      <br/>
                      {renderDraggableField('email', <p className="bg-cyan-200 inline-block px-2">MAIL: {displayData.email}</p>)}
                      <br/>
                      {renderDraggableField('github', <p className="bg-pink-200 inline-block px-2">GITHUB: {displayData.github}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'organic':
                return (
                  <div className="w-full h-full p-10 bg-[#f8fafc] flex flex-col items-center justify-between text-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/50 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-50/50 rounded-full translate-y-24 -translate-x-24 pointer-events-none" />

                    <div className="text-center z-10 mt-8">
                      {renderDraggableField('name', <h2 className="text-4xl font-serif text-emerald-900 mb-1">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-medium text-emerald-600/70 italic">{displayData.position}</p>)}
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-center text-[10px] font-medium text-slate-400 z-10 mb-4">
                      {renderDraggableField('location', <p className="flex items-center justify-center gap-1"><MapPin size={10} /> {displayData.location}</p>)}
                      <div className="flex gap-4 justify-center">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'pop':
                return (
                  <div className="w-full h-full flex flex-col relative overflow-hidden bg-yellow-400">
                    <div className="h-1/3 bg-slate-900 p-8 flex items-end">
                      {renderDraggableField('name', <h2 className="text-5xl font-black text-white italic tracking-tighter leading-none">{displayData.name}</h2>)}
                    </div>
                    <div className="h-2/3 p-8 flex flex-col justify-between">
                      {renderDraggableField('position', <p className="text-2xl font-black text-slate-900 uppercase tracking-tight -mt-12 bg-white px-4 py-1 inline-block self-start shadow-[6px_6px_0px_0px_#be185d]">{displayData.position}</p>)}

                      <div className="flex justify-between items-end font-black text-slate-900">
                        <div className="text-sm space-y-1">
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('email', <p className="underline">{displayData.email}</p>)}
                        </div>
                        <div className="w-16 h-16 bg-white border-4 border-slate-900 flex items-center justify-center -rotate-12">
                          <Target size={32} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'elegant':
                return (
                  <div className="w-full h-full p-10 flex flex-col items-center justify-center bg-white relative overflow-hidden font-playfair">
                    <div className="absolute inset-4 border border-slate-200 pointer-events-none" />
                    <div className="absolute inset-[18px] border-2 border-double border-slate-100 pointer-events-none" />
                    <div className="z-10 text-center space-y-4">
                      {renderDraggableField('name', <h2 className="text-4xl text-slate-900 tracking-widest">{displayData.name}</h2>)}
                      <div className="w-12 h-[1px] bg-slate-300 mx-auto" />
                      {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{displayData.position}</p>)}
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between text-[9px] uppercase tracking-widest text-slate-400">
                      {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                      {renderDraggableField('email', <span>{displayData.email}</span>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'tech':
                return (
                  <div className="w-full h-full p-8 bg-slate-900 text-cyan-400 font-mono relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none"
                         style={{ backgroundImage: 'linear-gradient(90deg, #22d3ee 1px, transparent 1px), linear-gradient(#22d3ee 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                    />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-l-4 border-cyan-500 pl-4 py-2">
                        {renderDraggableField('name', <h2 className="text-3xl font-bold tracking-tighter text-white">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs opacity-70">SYSTEM_DEVELOPER // {displayData.position}</p>)}
                      </div>
                      <div className="grid grid-cols-1 gap-1 text-[10px]">
                        {renderDraggableField('email', <p className="flex items-center gap-2"><span className="text-cyan-600">EMAIL:</span> {displayData.email}</p>)}
                        {renderDraggableField('github', <p className="flex items-center gap-2"><span className="text-cyan-600">SOURCE:</span> {displayData.github}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-2"><span className="text-cyan-600">COORD:</span> {displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-[8px] text-cyan-900 font-bold opacity-50">VER_2.5_PRO</div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'bold':
                return (
                  <div className="w-full h-full bg-slate-950 flex overflow-hidden">
                    <div className="w-1/3 h-full p-8 flex flex-col justify-between text-white relative z-10" style={{ backgroundColor: style.primaryColor }}>
                      <div className="text-4xl font-black leading-none break-all">
                        {renderDraggableField('name', <h2>{displayData.name}</h2>)}
                      </div>
                      <div className="text-[10px] font-bold uppercase tracking-tighter opacity-80">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="w-2/3 h-full p-12 flex flex-col justify-center gap-6 bg-white">
                      <div className="space-y-4">
                        {renderDraggableField('goal', <p className="text-lg font-bold text-slate-900 leading-tight">"{displayData.goal}"</p>)}
                        <div className="space-y-1 text-xs font-medium text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'classic':
                return (
                  <div className="w-full h-full p-12 bg-[#fafaf9] flex flex-col items-center justify-between text-slate-800 border-[12px] border-white shadow-inner">
                    <div className="text-center space-y-2">
                      {renderDraggableField('name', <h2 className="text-4xl font-serif italic text-slate-900">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-medium text-slate-500 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                    </div>
                    <div className="w-full h-px bg-slate-200" />
                    <div className="w-full flex justify-between items-end text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                      <div className="space-y-1">
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                      <div className="text-right space-y-1">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('blog', <p>{displayData.blog}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
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
    }
  };

  return (
    <>
    <div
        id="card-front"
      ref={cardRef}
        onMouseDown={() => onSelectElement?.(null)}
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

      {(viewMode === 'split' || (viewMode === 'flip' && isFlipped)) && (
        <div
          id="card-back"
          onMouseDown={() => onSelectElement?.(null)}
      className={`card-wrapper relative transition-all duration-500 ${sizeClasses[style.size]} ${roundedClasses[style.rounded]} shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden bg-white select-none`}
      style={{ boxShadow: `0 30px 60px -12px rgba(0,0,0,0.15), 0 18px 36px -18px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)` }}
    >
          {data.backSideType !== 'none' ? (
            renderTheme('back')
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 border-2 border-dashed border-slate-300 text-slate-400 p-8 text-center">
              <p className="font-bold text-lg mb-2">뒷면이 비활성화되었습니다</p>
              <p className="text-sm">왼쪽 '뒷면 설정' 탭에서<br/>타입을 선택해주세요.</p>
    </div>
          )}

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
