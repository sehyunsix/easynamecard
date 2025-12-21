
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

              case 'leather':
                return (
                  <div className="w-full h-full p-12 bg-[#3e2723] text-[#d7ccc8] relative overflow-hidden flex flex-col justify-between border-[12px] border-[#2b1b17] shadow-2xl">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/leather.png')] pointer-events-none" />
                    <div className="absolute inset-0 border-[1px] border-white/10 m-2 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1 border-l-4 border-yellow-700/50 pl-6">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tighter uppercase drop-shadow-md">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-yellow-700/80 uppercase tracking-[0.4em] italic">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold opacity-60">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>EML // {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL // {displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full border border-white/20" />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'vhs':
                return (
                  <div className="w-full h-full p-10 bg-black text-white font-mono relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/vhs.png')] pointer-events-none" />
                    <div className="absolute top-4 left-4 text-red-600 font-bold text-xs animate-pulse">● REC</div>
                    <div className="absolute top-4 right-4 text-xs opacity-50">SP 0:00:00</div>
                    <div className="relative z-10 mt-12">
                      <div className="relative inline-block">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 blur-sm opacity-50" />
                        {renderDraggableField('name', <h2 className="text-6xl font-black italic tracking-tighter uppercase relative bg-black px-2">{displayData.name}</h2>)}
                      </div>
                      <div className="bg-white text-black px-3 py-1 mt-2 inline-block font-black text-sm italic">
                        {renderDraggableField('position', <p>{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-black italic border-t-2 border-white/20 pt-4">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>EMAIL: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>PHONE: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400">PLAY ▶</p>
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'clay':
                return (
                  <div className="w-full h-full p-12 bg-blue-50 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 pointer-events-none" />
                    <div className="z-10 bg-white p-10 rounded-[40px] shadow-[20px_20px_40px_rgba(0,0,0,0.05),-10px_-10px_20px_rgba(255,255,255,0.8),inset_2px_2px_5px_rgba(0,0,0,0.02)] border border-white/50 space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-800 tracking-tight">{displayData.name}</h2>)}
                        <div className="bg-blue-500/10 px-4 py-1 rounded-full inline-block">
                          {renderDraggableField('position', <p className="text-xs font-bold text-blue-600 uppercase tracking-widest">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="pt-4 space-y-1 text-[10px] font-bold text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'matrix':
                return (
                  <div className="w-full h-full p-10 bg-black text-[#00ff41] font-mono relative overflow-hidden flex flex-col justify-between border-2 border-[#00ff41]/20">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10">
                      <div className="text-[10px] opacity-40 mb-2">[ SYSTEM_ACCESS_AUTHORIZED ]</div>
                      {renderDraggableField('name', <h2 className="text-5xl font-black tracking-widest uppercase border-b-2 border-[#00ff41]/50 pb-2 inline-block">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm mt-2 font-bold">{`> ROLE: ${displayData.position}`}</p>)}
                    </div>
                    <div className="relative z-10 grid grid-cols-2 gap-4 text-[10px] font-bold">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>ADDR: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>LINK: {displayData.contact}</p>)}
                      </div>
                      <div className="text-right flex flex-col justify-end">
                        <div className="text-[8px] opacity-30 animate-pulse">ENCRYPTING_DATA...</div>
                        {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'candy':
                return (
                  <div className="w-full h-full p-12 bg-pink-100 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-60 pointer-events-none" />
                    <div className="relative z-10">
                      <div className="bg-white/80 backdrop-blur-md p-8 rounded-[30px] shadow-xl border border-white inline-block">
                        {renderDraggableField('name', <h2 className="text-5xl font-black text-pink-500 tracking-tighter italic">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-blue-400 mt-1 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end text-[10px] font-black text-pink-600/60 uppercase tracking-widest">
                      <div className="space-y-1">
                        {renderDraggableField('email', <p>HELLO@ {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>CALL@ {displayData.contact}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-yellow-400">
                        <Sparkles size={24} fill="currentColor" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'poker':
                return (
                  <div className="w-full h-full p-8 bg-white text-slate-900 relative overflow-hidden border-[16px] border-slate-50 shadow-inner rounded-xl">
                    <div className="absolute top-4 left-4 flex flex-col items-center leading-none text-red-600 font-bold">
                      <div className="text-xl">A</div>
                      <div className="text-2xl">♥</div>
                    </div>
                    <div className="absolute bottom-4 right-4 flex flex-col items-center leading-none text-red-600 font-bold rotate-180">
                      <div className="text-xl">A</div>
                      <div className="text-2xl">♥</div>
                    </div>
                    <div className="h-full border-2 border-red-600/10 rounded-lg flex flex-col justify-center items-center text-center space-y-4">
                      <div className="w-24 h-32 border-2 border-red-600 rounded-md flex items-center justify-center mb-4">
                        <div className="text-6xl text-red-600">♥</div>
                      </div>
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-serif font-black uppercase tracking-tighter text-slate-800">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-red-600 uppercase tracking-[0.3em]">{displayData.position}</p>)}
                      </div>
                      <div className="pt-4 text-[9px] font-bold text-slate-400 uppercase">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'safari':
                return (
                  <div className="w-full h-full p-12 bg-[#f4e4bc] text-[#3d2b1f] relative overflow-hidden border-[12px] border-[#d4c49c] shadow-inner">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none" />
                    <div className="absolute -right-10 -bottom-10 opacity-10 rotate-[-15deg]"><Globe size={200} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="bg-[#3d2b1f] text-[#f4e4bc] px-6 py-2 inline-block shadow-xl">
                          {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                        </div>
                        <br/>
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.5em] border-b-2 border-[#3d2b1f] pb-2 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#3d2b1f]/60">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E_MAIL: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>P_HONE: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="opacity-30">EST. 2025</p>
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'royal':
                return (
                  <div className="w-full h-full p-12 bg-gradient-to-br from-[#1a1a1a] to-black text-[#d4af37] relative overflow-hidden border-[15px] border-double border-[#d4af37]/30 shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-4 border border-[#d4af37]/20 pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-8">
                      <div className="w-16 h-16 border-2 border-[#d4af37] rotate-45 flex items-center justify-center mb-4">
                        <div className="text-3xl -rotate-45 font-serif italic">R</div>
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
                        <div className="flex items-center gap-4 justify-center">
                          <div className="h-px w-12 bg-[#d4af37]/30" />
                          {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.6em] text-slate-400">{displayData.position}</p>)}
                          <div className="h-px w-12 bg-[#d4af37]/30" />
                        </div>
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[8px] font-bold uppercase tracking-[0.4em] opacity-50">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'map':
                return (
                  <div className="w-full h-full p-12 bg-[#e8d5b5] text-[#5d4037] relative overflow-hidden shadow-inner border-[1px] border-[#5d4037]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="absolute top-10 right-10 opacity-10 rotate-12"><Target size={150} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-[0.8em] opacity-40 mb-2">NAVIGATOR_COORD</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter text-[#3e2723] leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest text-[#5d4037]/80 italic mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t-2 border-[#5d4037]/20 pt-6">
                        <div className="space-y-1 text-[10px] font-bold uppercase">
                          {renderDraggableField('email', <p>E_MAIL: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>C_ONTACT: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] opacity-30 font-black">N 37° 33' 59" E 126° 58' 41"</p>
                          {renderDraggableField('location', <p className="text-[10px] font-bold">{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'manga':
                return (
                  <div className="w-full h-full bg-white text-black font-sans relative overflow-hidden grid grid-cols-12 h-full border-4 border-black">
                    <div className="col-span-7 p-10 flex flex-col justify-between relative border-r-4 border-black">
                      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none" />
                      <div className="z-10 bg-black text-white p-6 rotate-[-2deg] shadow-[10px_10px_0px_0px_#ddd]">
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase leading-none italic">{displayData.name}</h2>)}
                      </div>
                      <div className="z-10 self-end mt-12 bg-white border-4 border-black p-2 rotate-[3deg]">
                        {renderDraggableField('position', <p className="text-xl font-black uppercase italic">{displayData.position}</p>)}
                      </div>
                    </div>
                    <div className="col-span-5 bg-slate-50 p-6 flex flex-col justify-between">
                      <div className="h-1/2 border-2 border-black bg-white flex items-center justify-center text-4xl font-black italic opacity-20">?!</div>
                      <div className="space-y-2 pt-6">
                        <div className="text-[9px] font-black uppercase leading-tight bg-yellow-400 p-1 border-2 border-black inline-block">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                        </div>
                        <br/>
                        <div className="text-[9px] font-black uppercase leading-tight bg-pink-400 p-1 border-2 border-black inline-block">
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'vinyl':
                return (
                  <div className="w-full h-full p-0 bg-[#121212] text-white relative overflow-hidden flex">
                    <div className="w-2/3 h-full relative flex items-center justify-center bg-black">
                      <div className="w-[240px] h-[240px] rounded-full bg-[#111] border-[1px] border-white/5 relative flex items-center justify-center animate-[spin_10s_linear_infinite]">
                        {[...Array(12)].map((_, i) => (
                          <div key={i} className="absolute rounded-full border border-white/5" style={{ width: `${(i+1)*20}px`, height: `${(i+1)*20}px` }} />
                        ))}
                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-black p-4 text-center">
                          <div className="text-[8px] font-black uppercase leading-tight">{displayData.name}</div>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-black z-10" />
                      </div>
                    </div>
                    <div className="w-1/3 p-8 flex flex-col justify-between border-l border-white/10 bg-gradient-to-br from-[#1a1a1a] to-black">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-4 pt-4 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cassette':
                return (
                  <div className="w-full h-full p-10 bg-[#222] text-white relative overflow-hidden rounded-xl border-x-[12px] border-slate-800 shadow-2xl">
                    <div className="h-full bg-[#fafafa] rounded-lg p-6 flex flex-col text-black">
                       <div className="border-2 border-black p-4 flex-1 flex flex-col justify-between relative">
                          <div className="absolute top-2 right-4 text-[10px] font-black italic opacity-20">HIGH BIAS // 90</div>
                          <div className="space-y-1">
                            <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-2 opacity-40">Side A</div>
                            {renderDraggableField('name', <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none border-b-2 border-black pb-2">{displayData.name}</h2>)}
                            {renderDraggableField('position', <p className="text-[10px] font-bold uppercase tracking-widest mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="flex justify-between items-end pt-4">
                             <div className="space-y-1 text-[9px] font-black uppercase italic">
                               {renderDraggableField('email', <p>{displayData.email}</p>)}
                               {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                             </div>
                             <div className="flex gap-2">
                               <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                                 <div className="w-2 h-2 bg-black rounded-sm" />
                               </div>
                               <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                                 <div className="w-2 h-2 bg-black rounded-sm" />
                               </div>
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'polaroid':
                return (
                  <div className="w-full h-full p-0 bg-white shadow-2xl flex flex-col items-center border-[1px] border-slate-200">
                    <div className="w-full aspect-square p-8 pb-4">
                       <div className="w-full h-full bg-slate-100 flex items-center justify-center relative overflow-hidden group">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-yellow-50 opacity-50" />
                          <div className="z-10 text-center">
                            <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">IMAGE_PLACEHOLDER</div>
                            <Target size={48} strokeWidth={1} className="text-slate-200 mx-auto" />
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 w-full p-8 pt-0 flex flex-col justify-center font-sketch">
                       {renderDraggableField('name', <h2 className="text-3xl font-black text-slate-800 leading-none mb-1">{displayData.name}</h2>)}
                       {renderDraggableField('position', <p className="text-sm font-bold text-blue-600 mb-4">{displayData.position}</p>)}
                       <div className="flex justify-between items-end text-[10px] font-bold text-slate-400">
                         <div className="space-y-0.5">
                           {renderDraggableField('email', <p>{displayData.email}</p>)}
                           {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         </div>
                         <div className="text-right italic opacity-50">2025.12.21</div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'gameboy':
                return (
                  <div className="w-full h-full p-8 bg-[#9ca04c] text-[#0f380f] font-mono relative overflow-hidden border-[10px] border-[#8b9331] shadow-inner flex flex-col gap-6">
                    <div className="bg-[#8bac0f] p-6 border-[4px] border-[#0f380f] flex-1 flex flex-col justify-between shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)]">
                       <div className="space-y-1">
                          <div className="text-[10px] font-bold mb-2 flex justify-between uppercase">
                             <span>Player 1</span>
                             <span>HP: 99/99</span>
                          </div>
                          {renderDraggableField('name', <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-[10px] font-bold border-b border-[#0f380f] pb-2 mt-2">{`CLASS: ${displayData.position}`}</p>)}
                       </div>
                       <div className="space-y-1 text-[10px] font-bold uppercase">
                          {renderDraggableField('email', <p>EMAIL_{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>LINK_{displayData.contact}</p>)}
                       </div>
                    </div>
                    <div className="flex justify-between items-center px-4">
                       <div className="w-12 h-12 relative">
                          <div className="absolute top-1/2 left-0 w-full h-4 bg-[#0f380f] -translate-y-1/2" />
                          <div className="absolute left-1/2 top-0 h-full w-4 bg-[#0f380f] -translate-x-1/2" />
                       </div>
                       <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-[#0f380f] shadow-md" />
                          <div className="w-8 h-8 rounded-full bg-[#0f380f] shadow-md" />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'typewriter':
                return (
                  <div className="w-full h-full p-12 bg-[#f2f1ef] text-[#2c3e50] relative overflow-hidden shadow-inner font-serif">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="h-full border-2 border-slate-200 p-10 flex flex-col justify-between">
                       <div className="space-y-6">
                          <div className="space-y-1">
                             {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter opacity-90">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-lg italic text-slate-400 mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="w-full h-px bg-slate-200" />
                          {renderDraggableField('goal', <p className="text-sm leading-relaxed opacity-60 max-w-[90%]">"{displayData.goal}"</p>)}
                       </div>
                       <div className="flex justify-between items-end text-[11px] font-bold opacity-40 uppercase tracking-widest">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>{displayData.email}</p>)}
                             {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="text-right">
                             <p>Serial: #2025-1221</p>
                             {renderDraggableField('location', <p>{displayData.location}</p>)}
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'chess':
                return (
                  <div className="w-full h-full p-0 bg-white text-slate-900 font-serif relative overflow-hidden flex h-full">
                    <div className="w-1/3 bg-slate-900 p-8 flex flex-col justify-between text-white">
                       <div className="grid grid-cols-2 gap-1 opacity-20">
                          {[...Array(16)].map((_, i) => (
                            <div key={i} className="aspect-square border border-white/10" style={{ backgroundColor: i % 3 === 0 ? 'white' : 'transparent' }} />
                          ))}
                       </div>
                       <div className="space-y-2">
                          <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-40">Grandmaster</div>
                          {renderDraggableField('name', <h2 className="text-3xl font-black leading-none uppercase tracking-tighter">{displayData.name}</h2>)}
                       </div>
                    </div>
                    <div className="flex-1 p-12 flex flex-col justify-between bg-slate-50">
                       <div className="space-y-4">
                          {renderDraggableField('position', <p className="text-lg font-bold uppercase tracking-[0.3em] border-b-2 border-slate-900 pb-2 inline-block">{displayData.position}</p>)}
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-relaxed">Strategy: {displayData.goal}</p>)}
                       </div>
                       <div className="space-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {renderDraggableField('email', <p className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-900" /> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="flex items-center gap-2"><div className="w-2 h-2 bg-slate-300" /> {displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'sketchbook':
                return (
                  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden shadow-2xl font-sketch">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-40 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-4 bg-slate-200 opacity-20" />
                    <div className="h-full flex flex-col justify-between">
                       <div className="space-y-6">
                          <div className="relative inline-block">
                             {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none relative z-10">{displayData.name}</h2>)}
                             <div className="absolute -bottom-2 -left-2 w-full h-4 bg-yellow-200/50 -rotate-1 z-0" />
                          </div>
                          {renderDraggableField('position', <p className="text-xl font-bold text-slate-400 -rotate-1 italic">{displayData.position}</p>)}
                          <div className="pt-4">
                             {renderDraggableField('goal', <p className="text-sm border-l-4 border-slate-200 pl-4 italic opacity-70 leading-relaxed">{displayData.goal}</p>)}
                          </div>
                       </div>
                       <div className="flex justify-between items-end text-xs font-bold text-slate-400">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                             {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                          </div>
                          <div className="text-right">
                             <Target size={48} strokeWidth={1} className="opacity-10" />
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'diamond':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center border-[20px] border-slate-50">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="w-20 h-20 border-2 border-slate-900 rotate-45 flex items-center justify-center mx-auto shadow-xl">
                          <div className="w-12 h-12 border border-slate-900/20 rotate-12 flex items-center justify-center">
                            <Target size={32} strokeWidth={1} className="-rotate-[57deg]" />
                          </div>
                       </div>
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-tight text-slate-900">{displayData.name}</h2>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-slate-900 to-transparent mx-auto opacity-20" />
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-400">{displayData.position}</p>)}
                       </div>
                       <div className="pt-8 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'forest':
                return (
                  <div className="w-full h-full p-12 bg-[#1b2b1b] text-[#d4edda] relative overflow-hidden shadow-inner border-[1px] border-white/5">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 opacity-10 rotate-[-15deg]"><Globe size={300} strokeWidth={1} /></div>
                    <div className="relative z-10 h-full flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="space-y-1">
                             <div className="text-[8px] font-bold uppercase tracking-[0.6em] text-emerald-400 opacity-60">Professional Organic</div>
                             {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight">{displayData.name}</h2>)}
                          </div>
                          <div className="w-24 h-1 bg-emerald-500/30 rounded-full" />
                          {renderDraggableField('position', <p className="text-sm font-medium uppercase tracking-[0.4em] text-emerald-100/60">{displayData.position}</p>)}
                       </div>
                       <div className="space-y-10">
                          <div className="max-w-[80%]">
                             {renderDraggableField('goal', <p className="text-xs font-serif italic leading-relaxed opacity-40">"{displayData.goal}"</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-emerald-100/40">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                                {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                             </div>
                             {renderDraggableField('location', <p className="text-[8px]">{displayData.location}</p>)}
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'ocean':
                return (
                  <div className="w-full h-full p-12 bg-gradient-to-br from-[#004e92] to-[#000428] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/wave-grid.png')] pointer-events-none" />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/20 rounded-full blur-[100px] pointer-events-none" />
                    <div className="relative z-10 h-full flex flex-col justify-between items-start">
                       <div className="space-y-6">
                          <div className="border-l-[6px] border-cyan-400 pl-8">
                             {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter leading-none italic uppercase">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-xs font-bold text-cyan-400 mt-2 uppercase tracking-[0.4em]">{displayData.position}</p>)}
                          </div>
                       </div>
                       <div className="w-full space-y-8">
                          <div className="max-w-[70%]">
                             {renderDraggableField('goal', <p className="text-sm font-medium leading-relaxed text-slate-300 italic underline decoration-cyan-400/30 underline-offset-8">"{displayData.goal}"</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p className="flex items-center gap-2"><div className="w-3 h-px bg-cyan-400" /> {displayData.email}</p>)}
                                {renderDraggableField('contact', <p className="flex items-center gap-2"><div className="w-3 h-px bg-cyan-400" /> {displayData.contact}</p>)}
                             </div>
                             <div className="text-right flex flex-col items-end">
                                <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center mb-2">
                                  <Target size={20} className="text-cyan-400" />
                                </div>
                                {renderDraggableField('location', <p>{displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'receipt':
                return (
                  <div className="w-full h-full p-10 bg-[#f8f8f8] text-[#333] font-mono relative overflow-hidden shadow-inner border-t-[30px] border-slate-200">
                    <div className="absolute top-[-25px] left-0 w-full flex justify-around opacity-50">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-2 h-2 rounded-full bg-slate-400" />
                      ))}
                    </div>
                    <div className="text-center border-b-2 border-dashed border-slate-300 pb-4 mb-4">
                      <div className="text-[10px] font-black opacity-40 uppercase mb-1">*** OFFICIAL RECEIPT ***</div>
                      {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                    </div>
                    <div className="space-y-2 text-[11px] font-bold uppercase">
                      <div className="flex justify-between">
                        <span>POSITION:</span>
                        {renderDraggableField('position', <span className="text-right">{displayData.position}</span>)}
                      </div>
                      <div className="flex justify-between">
                        <span>EMAIL:</span>
                        {renderDraggableField('email', <span className="text-right">{displayData.email}</span>)}
                      </div>
                      <div className="flex justify-between">
                        <span>CONTACT:</span>
                        {renderDraggableField('contact', <span className="text-right">{displayData.contact}</span>)}
                      </div>
                    </div>
                    <div className="mt-8 pt-4 border-t-2 border-dashed border-slate-300 text-center">
                      <div className="text-[14px] font-black mb-1 tracking-[0.2em]">{`$ ${displayData.name.length * 1000}.00`}</div>
                      <div className="text-[8px] opacity-40">THANK YOU FOR VISITING!</div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'passport':
                return (
                  <div className="w-full h-full p-12 bg-[#e8e4d8] text-[#2c3e50] relative overflow-hidden border-[1px] border-slate-300 shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-12 bg-[#2c3e50]/10 flex items-center px-12 justify-between pointer-events-none">
                      <div className="text-[8px] font-black tracking-widest uppercase">Republic of Card</div>
                      <div className="text-[8px] font-black">P &lt; CARD &lt; {displayData.name.toUpperCase()} &lt;&lt; 2025</div>
                    </div>
                    <div className="mt-10 flex gap-8">
                      <div className="w-24 h-32 bg-slate-300/30 border-2 border-slate-400/50 flex flex-col items-center justify-center relative">
                        <div className="text-[8px] font-bold opacity-30 text-center uppercase">PHOTO<br/>REQUIRED</div>
                        <div className="absolute inset-0 border-[1px] border-slate-400/20 m-1" />
                        <div className="absolute bottom-1 right-1 opacity-20"><Globe size={24} /></div>
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="border-b border-slate-300">
                          <label className="text-[7px] font-bold text-slate-400 uppercase">Surname / Given Name</label>
                          {renderDraggableField('name', <h2 className="text-2xl font-serif font-black uppercase leading-none">{displayData.name}</h2>)}
                        </div>
                        <div className="border-b border-slate-300">
                          <label className="text-[7px] font-bold text-slate-400 uppercase">Occupation / Position</label>
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase">{displayData.position}</p>)}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="border-b border-slate-300">
                            <label className="text-[7px] font-bold text-slate-400 uppercase">Nationality</label>
                            <p className="text-[10px] font-bold">CARDHOLDER</p>
                          </div>
                          <div className="border-b border-slate-300">
                            <label className="text-[7px] font-bold text-slate-400 uppercase">Date of Issue</label>
                            <p className="text-[10px] font-bold">21 DEC 2025</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-12 right-12 opacity-10 rotate-[-20deg] pointer-events-none">
                      <div className="w-20 h-20 border-4 border-blue-900 rounded-full flex flex-col items-center justify-center text-blue-900 font-black">
                        <div className="text-[8px]">IMMIGRATION</div>
                        <div className="text-lg italic">PASSED</div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'ticket':
                return (
                  <div className="w-full h-full flex bg-[#1a1a1a] text-white font-mono relative overflow-hidden border-2 border-white/10 rounded-xl">
                    <div className="w-1/4 bg-yellow-500 text-black p-6 flex flex-col justify-between border-r-4 border-dashed border-black/20">
                      <div className="text-[8px] font-black rotate-[-90deg] origin-left translate-x-4 mt-8">ADM-001-2025</div>
                      <div className="text-2xl font-black">21 <br/> DEC</div>
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between relative">
                      <div className="absolute top-4 right-10 text-[8px] font-black opacity-30">CINEMA PREVIEW // NO. 7821</div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-yellow-500 mb-2 uppercase tracking-[0.4em]">NOW SHOWING:</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 mt-2 italic">{`DIRECTED BY: ${displayData.position}`}</p>)}
                      </div>
                      <div className="flex justify-between items-end border-t border-white/10 pt-6">
                        <div className="space-y-1 text-[9px] font-bold uppercase text-slate-500">
                          {renderDraggableField('email', <p>SCREEN: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>SEAT: {displayData.contact}</p>)}
                        </div>
                        <div className="w-12 h-12 flex items-center justify-center text-yellow-500 opacity-20">
                          <Target size={48} strokeWidth={1} />
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'stamp':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfaf1] text-[#3e2723] relative overflow-hidden border-[1px] border-slate-200 shadow-inner">
                    <div className="absolute top-8 right-8 w-24 h-28 bg-[#fafafa] border-[4px] border-white shadow-md rotate-[5deg] flex flex-col items-center justify-center p-2">
                       <div className="w-full h-full bg-[#3e2723]/10 border-[1px] border-dashed border-[#3e2723]/20 flex items-center justify-center text-[#3e2723]/30">
                         <MapPin size={32} />
                       </div>
                    </div>
                    <div className="absolute top-12 right-24 opacity-10 rotate-[-15deg] pointer-events-none">
                      <div className="w-20 h-20 border-2 border-red-900 rounded-full flex flex-col items-center justify-center text-red-900 font-bold">
                        <div className="text-[8px]">POSTAL SERVICE</div>
                        <div className="text-xs">2025.12.21</div>
                      </div>
                    </div>
                    <div className="h-full flex flex-col justify-between max-w-[60%]">
                      <div className="space-y-4">
                         <div className="space-y-1">
                           <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-30">Registered Mail</div>
                           {renderDraggableField('name', <h2 className="text-4xl font-serif italic font-bold tracking-tight">{displayData.name}</h2>)}
                         </div>
                         <div className="w-12 h-px bg-[#3e2723]/20" />
                         {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-widest text-[#5d4037]">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[10px] font-serif italic text-slate-500">
                        {renderDraggableField('email', <p className="border-b border-slate-200 pb-1 flex items-center gap-3">To: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="border-b border-slate-200 pb-1 flex items-center gap-3">P: {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-3">Loc: {displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'note':
                return (
                  <div className="w-full h-full p-12 bg-white relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-yellow-100/50 pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-10 bg-slate-100 flex items-center px-12 border-b border-slate-200 opacity-50">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                    </div>
                    <div className="mt-8 relative z-10 font-sketch">
                      <div className="absolute -left-4 top-0 w-1 h-full bg-red-400 opacity-30" />
                      <div className="space-y-6">
                        <div>
                          {renderDraggableField('name', <h2 className="text-5xl font-black text-slate-800 tracking-tighter leading-none rotate-[-1deg]">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-lg font-bold text-blue-600 rotate-[1deg] mt-2 italic underline decoration-blue-200 underline-offset-4">{displayData.position}</p>)}
                        </div>
                        <div className="space-y-3 pt-4 text-slate-600 font-bold">
                          {renderDraggableField('goal', <p className="text-sm leading-relaxed max-w-[80%] opacity-80 italic">- {displayData.goal}</p>)}
                          <div className="space-y-1 text-xs">
                             {renderDraggableField('email', <p className="flex items-center gap-2">@ {displayData.email}</p>)}
                             {renderDraggableField('contact', <p className="flex items-center gap-2"># {displayData.contact}</p>)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-8 right-10 opacity-10 pointer-events-none">
                      <Target size={120} strokeWidth={1} className="text-slate-900" />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'medal':
                return (
                  <div className="w-full h-full p-12 bg-gradient-to-br from-slate-900 to-black text-[#d4af37] relative overflow-hidden border-[1px] border-[#d4af37]/30 shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-b from-red-700 to-red-900 border-x-[12px] border-white/20 shadow-2xl z-0" />
                    <div className="relative z-10 h-full flex flex-col justify-center items-center text-center space-y-8">
                       <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f9e29c] to-[#d4af37] border-[6px] border-[#a68a2d] shadow-[0_10px_30px_rgba(212,175,55,0.4)] flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full border border-black/10 flex items-center justify-center text-black font-black text-3xl">1</div>
                       </div>
                       <div className="space-y-2">
                         <div className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-2">The Excellence Award</div>
                         {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter drop-shadow-md">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-white/60 tracking-[0.4em] uppercase">{displayData.position}</p>)}
                       </div>
                       <div className="pt-8 flex gap-6 text-[9px] font-black uppercase opacity-40">
                         {renderDraggableField('email', <span>{displayData.email}</span>)}
                         <span className="w-[1px] h-4 bg-white/20" />
                         {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cyanotype':
                return (
                  <div className="w-full h-full p-12 bg-[#003366] text-[#e0f2ff] relative overflow-hidden border-2 border-[#e0f2ff]/20 shadow-inner">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between items-start">
                      <div className="space-y-6">
                        <div className="border-l-2 border-[#e0f2ff]/40 pl-8 py-2">
                           {renderDraggableField('name', <h2 className="text-5xl font-serif italic tracking-tighter leading-none opacity-90">{displayData.name}</h2>)}
                           {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-[#e0f2ff]/60 mt-2">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-8 w-full">
                        <div className="max-w-[70%]">
                           {renderDraggableField('goal', <p className="text-[10px] font-medium leading-relaxed opacity-40 border-t border-[#e0f2ff]/10 pt-4">PROJECT_SPEC: {displayData.goal}</p>)}
                        </div>
                        <div className="flex justify-between items-end text-[9px] font-bold tracking-[0.3em] opacity-60">
                           <div className="space-y-1">
                             {renderDraggableField('email', <p>ADDR_01: {displayData.email}</p>)}
                             {renderDraggableField('contact', <p>ADDR_02: {displayData.contact}</p>)}
                           </div>
                           <div className="text-right">
                             <p>DATE: 2025.12.21</p>
                             <p>BATCH: #001-A</p>
                           </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-1/2 right-[-50px] translate-y-[-50%] opacity-10 rotate-[-90deg] pointer-events-none">
                      <Target size={300} strokeWidth={0.5} />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'embroidery':
                return (
                  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden border-[10px] border-[#eee] shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/fabric-of-squares.png')] pointer-events-none" />
                    <div className="absolute inset-2 border-[4px] border-dashed border-slate-200 pointer-events-none" />
                    <div className="h-full border-2 border-slate-100 bg-white shadow-lg p-10 flex flex-col justify-between items-center text-center">
                       <div className="space-y-4">
                         <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-blue-400 mb-2 mx-auto">
                            <Target size={24} />
                         </div>
                         <div className="space-y-1">
                           {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">{displayData.name}</h2>)}
                           {renderDraggableField('position', <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">{displayData.position}</p>)}
                         </div>
                       </div>
                       <div className="space-y-1 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         <div className="w-8 h-px bg-slate-100 mx-auto my-2" />
                         {renderDraggableField('location', <p>{displayData.location}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'stainedglass':
                return (
                  <div className="w-full h-full p-0 bg-black relative overflow-hidden flex flex-col">
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 opacity-60 pointer-events-none">
                       {[...Array(12)].map((_, i) => (
                         <div key={i} className="border border-black/40" style={{
                           backgroundColor: i % 3 === 0 ? style.primaryColor : i % 3 === 1 ? style.accentColor : '#fff',
                           opacity: 0.3 + (Math.random() * 0.4)
                         }} />
                       ))}
                    </div>
                    <div className="flex-1 p-12 flex flex-col justify-center items-center text-center z-10">
                       <div className="bg-black/40 backdrop-blur-xl p-10 border border-white/20 shadow-2xl">
                         {renderDraggableField('name', <h2 className="text-5xl font-serif font-black text-white tracking-[0.1em] uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] leading-none mb-4">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-sm font-bold text-white/60 tracking-[0.4em] uppercase mb-8">{displayData.position}</p>)}
                         <div className="space-y-2 text-[9px] font-bold text-white/40 uppercase tracking-widest">
                           {renderDraggableField('email', <p>{displayData.email}</p>)}
                           {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                         </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'certificate':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfdfd] text-[#2c3e50] relative overflow-hidden border-[15px] border-double border-slate-200 shadow-2xl">
                    <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="h-full border-[1px] border-slate-200 p-8 flex flex-col justify-between items-center text-center">
                       <div className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 mb-4">Certificate of Professional</div>
                       <div className="space-y-6 flex-1 flex flex-col justify-center items-center">
                          <div className="space-y-1">
                            <div className="text-[8px] font-bold text-slate-400 uppercase italic mb-2">This is to certify that</div>
                            {renderDraggableField('name', <h2 className="text-5xl font-serif font-black text-slate-900 border-b-2 border-slate-900 pb-2 mb-2 inline-block leading-none">{displayData.name}</h2>)}
                            {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-2">{displayData.position}</p>)}
                          </div>
                          <div className="max-w-[80%]">
                            {renderDraggableField('goal', <p className="text-[10px] font-serif italic text-slate-400 leading-relaxed">"{displayData.goal}"</p>)}
                          </div>
                       </div>
                       <div className="w-full flex justify-between items-end pt-8">
                          <div className="text-left space-y-1">
                             <div className="w-20 h-px bg-slate-200" />
                             {renderDraggableField('email', <p className="text-[8px] font-bold text-slate-400">{displayData.email}</p>)}
                          </div>
                          <div className="w-12 h-12 rounded-full border-2 border-red-900/10 flex items-center justify-center text-red-900/20 rotate-[-15deg]">
                             <Target size={32} strokeWidth={1} />
                          </div>
                          <div className="text-right space-y-1">
                             <div className="w-20 h-px bg-slate-200" />
                             {renderDraggableField('contact', <p className="text-[8px] font-bold text-slate-400">{displayData.contact}</p>)}
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cyber-grid':
                return (
                  <div className="w-full h-full p-10 bg-black text-cyan-400 font-mono relative overflow-hidden border-2 border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34,211,238,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px', perspective: '500px', transform: 'rotateX(60deg) translateY(-20%) scale(2)' }} />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-600 mb-2">System_Access: Granted</div>
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter uppercase italic drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold border-l-2 border-cyan-400 pl-3 mt-4">{`// ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-black uppercase tracking-widest border-t border-cyan-500/30 pt-4">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>P: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-30">ENCRYPT_V.2</p>
                          {renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'botanical-art':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfaf1] text-emerald-900 relative overflow-hidden flex flex-col justify-between border-[1px] border-emerald-100">
                    <div className="absolute -top-10 -right-10 opacity-10 rotate-12 pointer-events-none"><Target size={250} strokeWidth={0.5} /></div>
                    <div className="absolute bottom-[-50px] left-[-50px] opacity-10 pointer-events-none text-emerald-800"><Briefcase size={200} strokeWidth={0.5} /></div>
                    <div className="relative z-10 space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.4em] text-emerald-700/60 mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-emerald-200" />
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                      <div className="space-y-1 text-[10px] font-medium tracking-widest text-emerald-800/60">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                      <div className="text-right text-[9px] font-bold uppercase text-emerald-900/40">
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'luxury-marble':
                return (
                  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden border-[15px] border-slate-900 shadow-2xl">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/marble.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 via-transparent to-black pointer-events-none" />
                    <div className="h-full border border-[#d4af37]/20 p-10 flex flex-col justify-center items-center text-center space-y-8">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.15em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">{displayData.name}</h2>)}
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-40 mt-4" />
                        {renderDraggableField('position', <p className="text-xs font-light uppercase tracking-[0.6em] text-slate-400 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.4em] opacity-50">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'retro-terminal':
                return (
                  <div className="w-full h-full p-10 bg-[#0c1a0c] text-[#33ff33] font-mono relative overflow-hidden border-4 border-[#1a3a1a] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="space-y-1">
                        <div className="text-[10px] opacity-40 mb-2">{`[ LOGIN_SUCCESSFUL: ${new Date().toISOString().slice(0,10)} ]`}</div>
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase bg-[#33ff33] text-[#0c1a0c] px-3 py-1 inline-block">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm mt-4 font-bold">{`>> CURRENT_ROLE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="space-y-1 text-[10px] font-bold">
                        {renderDraggableField('email', <p>{`MAILTO: ${displayData.email}`}</p>)}
                        {renderDraggableField('contact', <p>{`COMMS: ${displayData.contact}`}</p>)}
                        <div className="pt-4 text-[8px] opacity-30 animate-pulse">_CONNECTED_TO_HOST</div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'modern-scandi':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-800 relative overflow-hidden flex flex-col justify-between border-l-[30px]" style={{ borderColor: style.primaryColor }}>
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-light tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mt-2">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-12 h-1" style={{ backgroundColor: style.primaryColor }} />
                      <div className="grid grid-cols-2 gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          {renderDraggableField('location', <p>{displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'vibrant-blob':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-900 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.primaryColor }} />
                    <div className="absolute bottom-[-50px] right-[-50px] w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ backgroundColor: style.accentColor }} />
                    <div className="z-10 bg-white/40 backdrop-blur-md p-10 rounded-[50px] border border-white/50 shadow-2xl space-y-4">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter text-slate-900 leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                      </div>
                      <div className="flex gap-3 justify-center pt-6">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.primaryColor }} />
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.accentColor }} />
                        <div className="w-2 h-2 rounded-full bg-slate-200" />
                      </div>
                      <div className="pt-6 space-y-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'tech-blueprint':
                return (
                  <div className="w-full h-full p-10 bg-[#1a2b3c] text-[#4dd0e1] font-mono relative overflow-hidden border-2 border-[#4dd0e1]/20">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(77,208,225,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(77,208,225,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <div className="text-[8px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">Technical_Spec_V.1</div>
                          {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase border-b-2 border-[#4dd0e1] pb-2">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs mt-2 font-bold">{`[ CORE_ROLE: ${displayData.position} ]`}</p>)}
                        </div>
                        <div className="text-[10px] border border-[#4dd0e1] px-2 py-1 rotate-12 opacity-30">REF: 2025-A</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-bold uppercase tracking-tighter">
                        <div className="space-y-1 border-l border-[#4dd0e1]/30 pl-3">
                          {renderDraggableField('email', <p>{`E_ADDR: ${displayData.email}`}</p>)}
                          {renderDraggableField('contact', <p>{`T_LINE: ${displayData.contact}`}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end">
                          <p className="opacity-20 mb-1 italic">Dimensions: 3.5" x 2"</p>
                          {renderDraggableField('location', <p>{`COORDS: ${displayData.location}`}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'elegant-damask':
                return (
                  <div className="w-full h-full p-12 bg-white text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[20px] border-slate-50">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="z-10 space-y-8">
                      <div className="w-16 h-16 border border-slate-200 rotate-45 flex items-center justify-center mx-auto opacity-40 shadow-xl bg-white">
                        <div className="text-3xl -rotate-45 font-serif italic text-slate-900">E</div>
                      </div>
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.1em] text-slate-900 leading-none">{displayData.name}</h2>)}
                        <div className="h-px w-24 bg-slate-200 mx-auto mt-4" />
                        {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.6em] text-slate-400 mt-4">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'creative-collage':
                return (
                  <div className="w-full h-full p-8 bg-slate-50 relative overflow-hidden flex h-full border-4 border-slate-900">
                    <div className="w-1/2 bg-white p-8 border-r-4 border-slate-900 flex flex-col justify-between relative">
                      <div className="absolute top-0 left-0 w-full h-2 bg-yellow-400" />
                      <div className="space-y-4">
                        <div className="bg-slate-900 text-white p-4 -rotate-2 shadow-xl inline-block">
                          {renderDraggableField('name', <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-none">{displayData.name}</h2>)}
                        </div>
                        {renderDraggableField('position', <p className="text-lg font-black uppercase text-slate-900 mt-4 italic">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-100 p-8 flex flex-col justify-between items-center text-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/newspaper.png')] pointer-events-none" />
                      <div className="z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-slate-900 rotate-12">
                        <Target size={48} strokeWidth={2} className="text-slate-900" />
                      </div>
                      <div className="z-10 bg-white p-4 border-2 border-slate-900 rotate-[-3deg] shadow-md">
                        {renderDraggableField('goal', <p className="text-[10px] font-black leading-tight italic">"{displayData.goal}"</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'professional-navy':
                return (
                  <div className="w-full h-full p-12 bg-[#001f3f] text-white relative overflow-hidden flex flex-col justify-between border-t-[8px] border-[#0074d9]">
                    <div className="absolute top-[-50px] right-[-50px] w-96 h-96 bg-white/5 rounded-full pointer-events-none" />
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-tight text-white leading-none">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-medium tracking-[0.2em] text-[#0074d9] mt-2 uppercase">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-12 bg-white/10 flex items-center justify-center rounded-lg border border-white/10 shadow-xl">
                        <Briefcase size={24} className="text-white" />
                      </div>
                    </div>
                    <div className="relative z-10 space-y-6">
                      <div className="w-16 h-1 bg-[#0074d9]" />
                      <div className="grid grid-cols-2 gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                        <div className="space-y-2">
                          {renderDraggableField('email', <p className="flex items-center gap-2 text-white/80"><Mail size={12} className="text-[#0074d9]" /> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="flex items-center gap-2 text-white/80"><Phone size={12} className="text-[#0074d9]" /> {displayData.contact}</p>)}
                        </div>
                        <div className="text-right flex flex-col justify-end space-y-2">
                          {renderDraggableField('location', <p className="flex items-center justify-end gap-2 text-white/80"><MapPin size={12} className="text-[#0074d9]" /> {displayData.location}</p>)}
                          {renderDraggableField('github', <p className="flex items-center justify-end gap-2 text-white/80"><Github size={12} className="text-[#0074d9]" /> {displayData.github.split('/').pop()}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'lava':
                return (
                  <div className="w-full h-full p-12 bg-[#1a0a05] text-[#ff4e00] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl border-[1px] border-[#ff4e00]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#ff4e00]/20 to-transparent pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="relative inline-block">
                         <div className="absolute inset-0 bg-[#ff4e00] blur-2xl opacity-20 animate-pulse" />
                         {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter uppercase relative drop-shadow-[0_0_15px_rgba(255,78,0,0.5)] italic">{displayData.name}</h2>)}
                      </div>
                      <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#ff4e00] to-transparent mx-auto" />
                      {renderDraggableField('position', <p className="text-sm font-bold tracking-[0.4em] text-orange-400 uppercase">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[10px] font-black uppercase tracking-widest text-[#ff4e00]/40">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'ice':
                return (
                  <div className="w-full h-full p-12 bg-[#e0f7fa] text-[#007b8b] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-[1px] border-white/40">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/ice-age.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
                    <div className="z-10 bg-white/30 backdrop-blur-xl p-10 rounded-[30px] border border-white/50 shadow-xl space-y-4">
                      <div className="space-y-1">
                         {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)]">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-[#007b8b]/60 uppercase tracking-widest">{displayData.position}</p>)}
                      </div>
                      <div className="w-12 h-px bg-[#007b8b]/20 mx-auto" />
                      <div className="space-y-1 text-[10px] font-bold text-[#007b8b]/40 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'honey':
                return (
                  <div className="w-full h-full p-12 bg-[#fffde7] text-[#5d4037] relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fbc02d 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
                    <div className="absolute top-0 left-0 w-full h-2 bg-[#fbc02d] shadow-lg pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="w-20 h-20 bg-[#fbc02d] rounded-full flex items-center justify-center mx-auto shadow-xl relative">
                         <div className="w-16 h-16 rounded-full border-2 border-white/20" />
                         <div className="absolute top-[-10px] right-[-10px] text-yellow-600 opacity-20 rotate-12"><Target size={40} /></div>
                      </div>
                      <div className="space-y-2">
                         {renderDraggableField('name', <h2 className="text-5xl font-black text-[#5d4037] tracking-tighter">{displayData.name}</h2>)}
                         {renderDraggableField('position', <p className="text-xs font-bold text-yellow-700 uppercase tracking-[0.4em]">{displayData.position}</p>)}
                      </div>
                      <div className="pt-6 space-y-1 text-[10px] font-bold text-yellow-800/40 uppercase tracking-widest">
                         {renderDraggableField('email', <p>{displayData.email}</p>)}
                         {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'nebula':
                return (
                  <div className="w-full h-full p-12 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-pink-900/40 pointer-events-none animate-pulse" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-60 pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="relative">
                          <div className="absolute inset-[-20px] bg-blue-500/10 blur-3xl rounded-full" />
                          {renderDraggableField('name', <h2 className="text-6xl font-black uppercase tracking-[0.2em] relative drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">{displayData.name}</h2>)}
                       </div>
                       <div className="space-y-1">
                          {renderDraggableField('position', <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.8em]">{displayData.position}</p>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-white to-transparent mx-auto opacity-20 mt-4" />
                       </div>
                       <div className="pt-10 flex gap-8 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
                          {renderDraggableField('email', <span>{displayData.email}</span>)}
                          {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'scroll':
                return (
                  <div className="w-full h-full p-16 bg-[#f5e6d3] text-[#4a3421] relative overflow-hidden flex flex-col justify-center items-center text-center shadow-inner border-y-[20px] border-[#d2b48c]/30">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-full border-x-[40px] border-transparent border-x-[#d2b48c]/10 pointer-events-none" />
                    <div className="z-10 space-y-6">
                       <div className="space-y-1">
                          <div className="text-[10px] font-serif italic opacity-40 mb-2 tracking-[0.4em]">Ancient Knowledge</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black uppercase tracking-tighter leading-none border-b-2 border-[#4a3421]/20 pb-4">{displayData.name}</h2>)}
                       </div>
                       {renderDraggableField('position', <p className="text-sm font-serif italic text-[#7a5c3e] tracking-widest">{displayData.position}</p>)}
                       <div className="pt-8 space-y-2 text-[11px] font-serif opacity-60">
                          {renderDraggableField('email', <p className="underline decoration-[#4a3421]/20 underline-offset-4">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'graffiti':
                return (
                  <div className="w-full h-full p-10 bg-[#121212] text-white relative overflow-hidden flex flex-col justify-end">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="absolute top-[-40px] left-[-40px] text-yellow-400 opacity-20 rotate-[-15deg] font-black text-9xl select-none pointer-events-none">YO</div>
                    <div className="relative z-10 space-y-2">
                       <div className="relative inline-block">
                          <div className="absolute top-1 left-1 text-pink-600 opacity-50 blur-sm select-none pointer-events-none text-7xl font-black italic tracking-tighter uppercase">{displayData.name}</div>
                          {renderDraggableField('name', <h2 className="text-7xl font-black italic tracking-tighter uppercase relative drop-shadow-[5px_5px_0px_#ff0055]">{displayData.name}</h2>)}
                       </div>
                       <div className="bg-yellow-400 text-black p-2 rotate-[2deg] shadow-[5px_5px_0px_#000] inline-block font-black text-xl italic uppercase">
                          {renderDraggableField('position', <p>{displayData.position}</p>)}
                       </div>
                    </div>
                    <div className="relative z-10 mt-12 flex justify-between items-end border-t-4 border-white pt-4">
                       <div className="space-y-1 text-xs font-black uppercase italic tracking-widest text-slate-400">
                          {renderDraggableField('email', <p>@ {displayData.email}</p>)}
                          {renderDraggableField('contact', <p># {displayData.contact}</p>)}
                       </div>
                       <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                          <Target size={32} strokeWidth={3} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'gazette':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfdf7] text-slate-900 font-serif relative overflow-hidden border-x-[1px] border-slate-200">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full border-t-4 border-b-4 border-slate-900 py-8">
                       <div className="flex justify-between items-end mb-6 border-b-2 border-slate-900 pb-2">
                          <div className="text-[10px] font-black italic">EDITION: 2025.12.21</div>
                          <div className="text-4xl font-black tracking-tighter uppercase">Gazette</div>
                          <div className="text-[10px] font-black italic">VOL. 01 // NO. 100</div>
                       </div>
                       <div className="flex-1 grid grid-cols-12 gap-8">
                          <div className="col-span-8 space-y-4">
                             {renderDraggableField('name', <h2 className="text-5xl font-black leading-none tracking-tight">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-lg font-bold italic leading-tight text-slate-700">{displayData.position}</p>)}
                             <div className="w-full h-[2px] bg-slate-900" />
                             {renderDraggableField('goal', <p className="text-[10px] leading-relaxed opacity-70 italic">"{displayData.goal}"</p>)}
                          </div>
                          <div className="col-span-4 border-l-2 border-slate-900 pl-4 space-y-4">
                             <div className="aspect-square bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-300">
                                <Target size={32} strokeWidth={1} />
                             </div>
                             <div className="space-y-1 text-[9px] font-bold uppercase leading-tight">
                                {renderDraggableField('email', <p>{displayData.email}</p>)}
                                {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                                {renderDraggableField('location', <p>{displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'wood-ebony':
                return (
                  <div className="w-full h-full p-12 bg-[#121212] text-slate-300 relative overflow-hidden flex flex-col justify-between border-[10px] border-slate-800 shadow-2xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-wood.png')] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                       <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tighter text-white leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.5em] text-slate-500 mt-2">{displayData.position}</p>)}
                       </div>
                    </div>
                    <div className="relative z-10 flex justify-between items-end">
                       <div className="space-y-1 text-[10px] font-bold tracking-widest opacity-40">
                          {renderDraggableField('email', <p>E_MAIL // {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>C_ONTACT // {displayData.contact}</p>)}
                       </div>
                       <div className="w-16 h-16 border border-white/5 flex items-center justify-center opacity-20">
                          <Target size={40} strokeWidth={0.5} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'metal-steel':
                return (
                  <div className="w-full h-full p-12 bg-slate-200 text-slate-900 relative overflow-hidden border-8 border-slate-300 flex flex-col justify-between shadow-2xl">
                    <div className="absolute inset-0 opacity-60 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-black/10 pointer-events-none" />
                    <div className="relative z-10">
                       <div className="bg-slate-900 text-white px-6 py-2 inline-block shadow-lg italic">
                          {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                       </div>
                       <br/>
                       {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.4em] text-slate-500 mt-4 border-l-4 border-slate-900 pl-4">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t-2 border-slate-900 pt-6">
                       <div className="space-y-1 text-[10px] font-black uppercase tracking-tighter opacity-60">
                          {renderDraggableField('email', <p>ID_001: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL_782: {displayData.contact}</p>)}
                       </div>
                       <div className="text-right text-[8px] font-bold opacity-30">
                          <p>HARDWARE_INTERFACE_V1</p>
                          <p>ALL_RIGHTS_RESERVED</p>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'pop-retro':
                return (
                  <div className="w-full h-full p-0 bg-white relative overflow-hidden grid grid-cols-2 grid-rows-2">
                    <div className="bg-pink-400 p-8 flex flex-col justify-center items-center text-center">
                       {renderDraggableField('name', <h2 className="text-3xl font-black uppercase italic text-yellow-300 drop-shadow-[3px_3px_0px_#000] leading-none">{displayData.name}</h2>)}
                    </div>
                    <div className="bg-yellow-300 p-8 flex flex-col justify-center items-center text-center">
                       {renderDraggableField('position', <p className="text-xl font-black uppercase text-pink-500 drop-shadow-[2px_2px_0px_#000]">{displayData.position}</p>)}
                    </div>
                    <div className="bg-cyan-400 p-8 flex flex-col justify-center items-center text-center">
                       <div className="text-[10px] font-black text-white uppercase tracking-widest">Contact Info</div>
                       {renderDraggableField('email', <p className="text-xs font-black text-white mt-2 italic">{displayData.email}</p>)}
                    </div>
                    <div className="bg-white p-8 flex flex-col justify-center items-center text-center border-l-4 border-t-4 border-black">
                       <Target size={48} strokeWidth={4} className="text-slate-900 mb-2" />
                       {renderDraggableField('contact', <p className="text-[10px] font-black uppercase italic">{displayData.contact}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'liquid-gold':
                return (
                  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col justify-center items-center text-center border-[1px] border-[#d4af37]/20">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute top-[-50px] left-[-50px] w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="relative inline-block">
                          <div className="absolute inset-[-10px] border border-[#d4af37]/30 rotate-12" />
                          <div className="absolute inset-[-10px] border border-[#d4af37]/30 -rotate-12" />
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-[0.2em] uppercase drop-shadow-[0_4px_10px_rgba(212,175,55,0.4)] leading-none px-6 py-4">{displayData.name}</h2>)}
                       </div>
                       <div className="space-y-4">
                          {renderDraggableField('position', <p className="text-sm font-light uppercase tracking-[0.8em] text-slate-400">{displayData.position}</p>)}
                          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto opacity-40" />
                       </div>
                       <div className="flex gap-10 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <span>{displayData.email}</span>)}
                          {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'stark':
                return (
                  <div className="w-full h-full p-16 bg-black text-white relative overflow-hidden flex flex-col justify-between">
                    <div className="relative z-10">
                       {renderDraggableField('name', <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-4">{displayData.name}</h2>)}
                       <div className="h-1 w-full bg-white opacity-20 mt-8" />
                       {renderDraggableField('position', <p className="text-2xl font-black uppercase tracking-tighter text-slate-500 mt-4 italic">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end font-black uppercase tracking-tighter text-[11px]">
                       <div className="space-y-1">
                          {renderDraggableField('email', <p className="hover:text-slate-400 transition-colors">{displayData.email}</p>)}
                          {renderDraggableField('contact', <p className="hover:text-slate-400 transition-colors">{displayData.contact}</p>)}
                       </div>
                       <div className="text-right flex items-center gap-4">
                          <div className="w-12 h-12 border-4 border-white flex items-center justify-center text-3xl">!</div>
                          {renderDraggableField('location', <p className="text-slate-500">{displayData.location}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'terrazzo':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfaf5] text-slate-800 relative overflow-hidden flex flex-col justify-center items-center text-center">
                    <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fecaca 10%, transparent 10%), radial-gradient(circle, #bfdbfe 15%, transparent 15%), radial-gradient(circle, #fde68a 12%, transparent 12%)', backgroundSize: '100px 100px', backgroundPosition: '0 0, 50px 50px, 20px 80px' }} />
                    <div className="z-10 bg-white/90 backdrop-blur-sm p-12 rounded-[50px] shadow-2xl border border-white space-y-4">
                       <div className="space-y-1">
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">{displayData.position}</p>)}
                       </div>
                       <div className="w-12 h-px bg-slate-200 mx-auto" />
                       <div className="pt-4 space-y-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'washi':
                return (
                  <div className="w-full h-full p-12 bg-[#fdf9f2] text-[#4d4d4d] relative overflow-hidden border-y-[24px] border-[#e6dcc7]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] pointer-events-none" />
                    <div className="flex flex-col h-full justify-between items-start">
                       <div className="space-y-6">
                          <div className="space-y-1">
                             <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.6em] mb-2">TRADITIONAL_MINIMAL</div>
                             {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-[#2d2d2d] leading-none">{displayData.name}</h2>)}
                          </div>
                          {renderDraggableField('position', <p className="text-sm font-medium uppercase tracking-[0.4em] border-b border-slate-200 pb-4 inline-block">{displayData.position}</p>)}
                       </div>
                       <div className="space-y-4 w-full">
                          <div className="max-w-[80%]">
                             {renderDraggableField('goal', <p className="text-xs font-serif italic leading-relaxed opacity-50 border-l-2 border-slate-200 pl-4">"{displayData.goal}"</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-slate-400">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p>E. {displayData.email}</p>)}
                                {renderDraggableField('contact', <p>T. {displayData.contact}</p>)}
                             </div>
                             <div className="text-right">
                                {renderDraggableField('location', <p>{displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'cork':
                return (
                  <div className="w-full h-full p-12 bg-[#c29c6d] text-[#4e342e] relative overflow-hidden shadow-inner border-8 border-[#a18262]">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cork-board.png')] pointer-events-none" />
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full shadow-md z-20 pointer-events-none" />
                    <div className="h-full bg-white/90 rounded-sm p-10 flex flex-col justify-between shadow-2xl relative">
                       <div className="absolute top-[-10px] right-[-10px] opacity-10 rotate-12"><Target size={80} /></div>
                       <div className="space-y-4">
                          <div className="space-y-1">
                             {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tighter uppercase leading-none italic">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">{displayData.position}</p>)}
                          </div>
                          <div className="w-full h-[2px] bg-slate-100" />
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-relaxed">- {displayData.goal}</p>)}
                       </div>
                       <div className="flex justify-between items-end text-[10px] font-bold uppercase text-slate-400">
                          <div className="space-y-1">
                             {renderDraggableField('email', <p>{displayData.email}</p>)}
                             {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                          </div>
                          <div className="text-right opacity-30 italic">POSTED_2025</div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'velvet':
                return (
                  <div className="w-full h-full p-12 bg-[#4a0e0e] text-[#fbe9e7] relative overflow-hidden shadow-2xl border-x-[30px] border-[#3a0b0b]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-center items-center text-center space-y-8">
                       <div className="w-16 h-px bg-white/20" />
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-white leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-sm uppercase tracking-[0.5em] text-[#ff8a65] mt-2 font-bold">{displayData.position}</p>)}
                       </div>
                       <div className="w-16 h-px bg-white/20" />
                       <div className="pt-4 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'rust':
                return (
                  <div className="w-full h-full p-12 bg-[#2d2421] text-[#b97a57] relative overflow-hidden border-[1px] border-white/10 shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-[#b97a57]/10 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between items-start">
                       <div className="space-y-6">
                          <div className="border-l-4 border-[#b97a57] pl-8 py-2">
                             {renderDraggableField('name', <h2 className="text-5xl font-black uppercase tracking-tighter leading-none text-white/90 italic">{displayData.name}</h2>)}
                             {renderDraggableField('position', <p className="text-xs font-bold text-[#b97a57]/60 mt-2 uppercase tracking-[0.4em]">{`// STATUS: ${displayData.position}`}</p>)}
                          </div>
                       </div>
                       <div className="w-full space-y-12">
                          <div className="max-w-[70%]">
                             {renderDraggableField('goal', <p className="text-xs font-mono leading-relaxed opacity-40 border-t border-white/10 pt-6">CORE_OBJECTIVE: {displayData.goal}</p>)}
                          </div>
                          <div className="flex justify-between items-end text-[9px] font-bold uppercase tracking-widest text-[#b97a57]/40">
                             <div className="space-y-1">
                                {renderDraggableField('email', <p>ADDR: {displayData.email}</p>)}
                                {renderDraggableField('contact', <p>LINK: {displayData.contact}</p>)}
                             </div>
                             <div className="text-right">
                                <p>HARDENED_SHELL_V.9</p>
                                {renderDraggableField('location', <p>NODE: {displayData.location}</p>)}
                             </div>
                          </div>
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'slate':
                return (
                  <div className="w-full h-full p-12 bg-[#263238] text-slate-100 relative overflow-hidden flex flex-col justify-center items-center text-center shadow-2xl border-y-[1px] border-white/5">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] pointer-events-none" />
                    <div className="z-10 space-y-10">
                       <div className="space-y-4">
                          <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-[0.2em] uppercase leading-none">{displayData.name}</h2>)}
                          <div className="w-12 h-1 bg-white/20 mx-auto rounded-full" />
                       </div>
                       {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-[0.6em] text-slate-500 italic">{displayData.position}</p>)}
                       <div className="pt-12 grid grid-cols-1 gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'gothic':
                return (
                  <div className="w-full h-full p-12 bg-black text-white relative overflow-hidden flex flex-col justify-center items-center text-center border-[20px] border-double border-white/10">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/exclusive-paper.png')] pointer-events-none" />
                    <div className="z-10 space-y-8">
                       <div className="w-16 h-16 border-2 border-white/20 rotate-45 flex items-center justify-center mx-auto opacity-40 shadow-2xl">
                          <div className="text-3xl -rotate-45 font-serif italic">G</div>
                       </div>
                       <div className="space-y-2">
                          {renderDraggableField('name', <h2 className="text-5xl font-serif font-black tracking-widest uppercase italic border-b-2 border-white/10 pb-4 leading-none">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-[0.8em] text-slate-500 mt-4">{displayData.position}</p>)}
                       </div>
                       <div className="pt-12 grid grid-cols-1 gap-1 text-[9px] font-bold uppercase tracking-[0.4em] opacity-40">
                          {renderDraggableField('email', <p>{displayData.email}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'bento':
                return (
                  <div className="w-full h-full p-4 bg-slate-50 relative overflow-hidden grid grid-cols-12 grid-rows-12 gap-2 h-full">
                    <div className="col-span-8 row-span-8 bg-white p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-slate-100">
                       <div className="space-y-1">
                          <div className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Introduction</div>
                          {renderDraggableField('name', <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{displayData.name}</h2>)}
                       </div>
                       {renderDraggableField('position', <p className="text-lg font-bold text-slate-400 italic tracking-tighter">{displayData.position}</p>)}
                    </div>
                    <div className="col-span-4 row-span-4 bg-blue-500 p-6 rounded-2xl shadow-lg flex items-center justify-center text-white text-center">
                       <div className="space-y-1">
                          <div className="text-[10px] font-black uppercase opacity-60">Status</div>
                          <div className="text-lg font-black italic">ACTIVE</div>
                       </div>
                    </div>
                    <div className="col-span-4 row-span-8 bg-slate-900 p-6 rounded-2xl shadow-xl flex flex-col justify-between text-white border border-white/10">
                       <div className="text-[10px] font-black text-slate-500 uppercase">Connect</div>
                       <div className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
                          {renderDraggableField('email', <p>{displayData.email.split('@')[0]}</p>)}
                          {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                       </div>
                    </div>
                    <div className="col-span-8 row-span-4 bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100">
                       <div className="max-w-[70%]">
                          {renderDraggableField('goal', <p className="text-xs text-slate-500 italic leading-tight">"{displayData.goal}"</p>)}
                       </div>
                       <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300">
                          <Target size={24} strokeWidth={1} />
                       </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'carbon':
                return (
                  <div className="w-full h-full p-10 bg-[#111] text-white relative overflow-hidden flex flex-col justify-between border-b-8 border-slate-800">
                    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, #222 25%, transparent 25%, transparent 50%, #222 50%, #222 75%, transparent 75%, transparent)', backgroundSize: '4px 4px' }} />
                    <div className="relative z-10">
                      {renderDraggableField('name', <h2 className="text-5xl font-black italic tracking-tighter text-slate-100 uppercase">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-red-600 tracking-[0.3em] mt-1">SUPER_TECH // {displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 flex justify-between items-end border-t border-white/10 pt-6">
                      <div className="space-y-1 text-[9px] font-mono opacity-60">
                        {renderDraggableField('email', <p>E: {displayData.email}</p>)}
                        {renderDraggableField('contact', <p>T: {displayData.contact}</p>)}
                      </div>
                      <div className="w-10 h-10 border-2 border-red-600 rotate-45 flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-600 -rotate-45" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'watercolor':
                return (
                  <div className="w-full h-full p-12 bg-white relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-400/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 pointer-events-none" />
                    <div className="z-10 space-y-4">
                      {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold text-slate-800 drop-shadow-sm">{displayData.name}</h2>)}
                      <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
                      {renderDraggableField('position', <p className="text-sm font-medium text-slate-500 italic tracking-widest">{displayData.position}</p>)}
                      <div className="pt-8 space-y-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'denim':
                return (
                  <div className="w-full h-full p-10 bg-[#2c3e50] text-white relative overflow-hidden flex flex-col justify-between border-[10px] border-[#34495e] shadow-inner">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/denim.png')] pointer-events-none" />
                    <div className="absolute bottom-4 right-4 text-yellow-600/30 opacity-50"><Globe size={120} strokeWidth={4} /></div>
                    <div className="relative z-10">
                      <div className="bg-yellow-600 p-4 border-2 border-white/20 inline-block rotate-[-1deg]">
                        {renderDraggableField('name', <h2 className="text-4xl font-black uppercase tracking-tighter">{displayData.name}</h2>)}
                      </div>
                      <br/>
                      {renderDraggableField('position', <p className="text-xs font-bold text-yellow-600 mt-2 bg-white/10 px-2 py-1 inline-block uppercase tracking-widest">{displayData.position}</p>)}
                    </div>
                    <div className="relative z-10 space-y-1 text-[10px] font-bold tracking-widest text-slate-300">
                      {renderDraggableField('contact', <p>P: {displayData.contact}</p>)}
                      {renderDraggableField('email', <p>M: {displayData.email}</p>)}
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'goldleaf':
                return (
                  <div className="w-full h-full p-12 bg-black text-[#d4af37] relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                    <div className="absolute inset-6 border border-[#d4af37]/40 pointer-events-none" />
                    <div className="z-10 space-y-6">
                      <div className="space-y-2">
                        {renderDraggableField('name', <h2 className="text-5xl font-serif font-bold tracking-[0.1em] drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">{displayData.name}</h2>)}
                        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.5em] font-light text-slate-400">{displayData.position}</p>)}
                      </div>
                      <div className="pt-12 grid grid-cols-1 gap-2 text-[9px] font-bold uppercase tracking-[0.3em] opacity-60">
                        {renderDraggableField('contact', <p>{displayData.contact}</p>)}
                        {renderDraggableField('email', <p>{displayData.email}</p>)}
                        {renderDraggableField('location', <p>{displayData.location}</p>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'pixelart':
                return (
                  <div className="w-full h-full p-8 bg-[#323353] text-white relative overflow-hidden flex flex-col justify-between" style={{ imageRendering: 'pixelated' }}>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/micro-pixel.png')] pointer-events-none" />
                    <div className="bg-[#4fb2aa] p-6 border-b-8 border-r-8 border-[#1a1c2c] relative">
                      <div className="absolute top-2 right-2 w-4 h-4 bg-white opacity-20" />
                      {renderDraggableField('name', <h2 className="text-4xl font-black uppercase leading-none italic">{displayData.name}</h2>)}
                      {renderDraggableField('position', <p className="text-xs font-bold text-white mt-2 bg-[#1a1c2c] px-2 py-1 inline-block">LVL. 99 // {displayData.position}</p>)}
                    </div>
                    <div className="flex justify-between items-end">
                      <div className="space-y-1 text-[#f4f4f4] font-mono text-[9px] font-bold uppercase">
                        {renderDraggableField('email', <p>EMAIL_{displayData.email}</p>)}
                        {renderDraggableField('contact', <p>PHONE_{displayData.contact}</p>)}
                      </div>
                      <div className="w-14 h-14 bg-[#ef7d57] border-4 border-[#1a1c2c] shadow-[4px_4px_0px_0px_#1a1c2c] flex items-center justify-center">
                        <div className="w-6 h-6 bg-white rotate-45" />
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'concrete':
                return (
                  <div className="w-full h-full p-12 bg-[#999] text-slate-900 relative overflow-hidden border-8 border-slate-200">
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div>
                        {renderDraggableField('name', <h2 className="text-6xl font-black tracking-tighter leading-none text-slate-800 uppercase" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)' }}>{displayData.name}</h2>)}
                        <div className="bg-yellow-400 px-3 py-1 inline-block mt-4 shadow-lg">
                          {renderDraggableField('position', <p className="text-sm font-bold uppercase tracking-widest">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="space-y-1 text-[10px] font-black uppercase tracking-tighter text-slate-700">
                          {renderDraggableField('email', <p className="border-b border-slate-800">EML: {displayData.email}</p>)}
                          {renderDraggableField('contact', <p>TEL: {displayData.contact}</p>)}
                        </div>
                        <div className="text-right text-[8px] font-bold opacity-30 uppercase">
                          <p>INDUSTRIAL_STANDARD</p>
                          <p>EST_2025_REF_01</p>
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'circuit':
                return (
                  <div className="w-full h-full p-10 bg-[#0a1a0a] text-emerald-400 font-mono relative overflow-hidden border-2 border-emerald-500/30">
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #34d399 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full justify-between">
                      <div className="border-l-4 border-emerald-500 pl-6 py-2">
                        {renderDraggableField('name', <h2 className="text-4xl font-bold tracking-widest uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-xs text-emerald-600 mt-1 uppercase">{`> CORE_MODULE: ${displayData.position}`}</p>)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-[9px] font-bold">
                        <div className="space-y-1">
                          {renderDraggableField('email', <p><span className="opacity-40">@:</span> {displayData.email}</p>)}
                          {renderDraggableField('contact', <p><span className="opacity-40">#:</span> {displayData.contact}</p>)}
                        </div>
                        <div className="text-right border-r-4 border-emerald-500 pr-4">
                          <p className="opacity-30">SYSTEM_UPTIME: 100%</p>
                          {renderDraggableField('location', <p>LOC: {displayData.location}</p>)}
                        </div>
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'mosaic':
                return (
                  <div className="w-full h-full p-0 bg-white relative overflow-hidden flex flex-col">
                    <div className="h-1/3 w-full grid grid-cols-12 pointer-events-none">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="h-full" style={{ backgroundColor: i % 2 === 0 ? style.primaryColor : style.accentColor, opacity: 0.2 + (i * 0.05) }} />
                      ))}
                    </div>
                    <div className="flex-1 p-10 flex flex-col justify-between items-center text-center">
                      <div className="space-y-1">
                        {renderDraggableField('name', <h2 className="text-4xl font-black tracking-tight text-slate-900 uppercase">{displayData.name}</h2>)}
                        {renderDraggableField('position', <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.3em]">{displayData.position}</p>)}
                      </div>
                      <div className="w-full flex justify-between items-end text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {renderDraggableField('contact', <span>{displayData.contact}</span>)}
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: style.primaryColor }} />
                        {renderDraggableField('email', <span>{displayData.email}</span>)}
                      </div>
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'origami':
                return (
                  <div className="w-full h-full p-12 bg-[#fafafa] text-slate-800 relative overflow-hidden flex flex-col justify-between shadow-inner">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-black/5" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
                    <div className="absolute top-0 left-0 w-1/2 h-full bg-white shadow-[20px_0_40px_rgba(0,0,0,0.05)] z-0" />
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="border-l-8 pl-6" style={{ borderColor: style.primaryColor }}>
                          {renderDraggableField('name', <h2 className="text-5xl font-black tracking-tighter leading-none text-slate-900">{displayData.name}</h2>)}
                          {renderDraggableField('position', <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2">{displayData.position}</p>)}
                        </div>
                      </div>
                      <div className="space-y-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {renderDraggableField('email', <p className="hover:text-slate-900 transition-colors">{displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="hover:text-slate-900 transition-colors">{displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="hover:text-slate-900 transition-colors">{displayData.location}</p>)}
                      </div>
                    </div>
                    <div className="absolute bottom-12 right-12 w-16 h-16 opacity-20 pointer-events-none" style={{ color: style.accentColor }}>
                      <Target size={64} strokeWidth={1} />
                    </div>
                    {renderQRCodeElement(isBack ? 'back' : 'front')}
                  </div>
                );

              case 'bamboo':
                return (
                  <div className="w-full h-full p-12 bg-[#fdfaf1] text-[#2d3a2d] relative overflow-hidden border-r-[24px] border-[#e8dfc5]">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] rotate-90 pointer-events-none" />
                    <div className="flex flex-col h-full justify-between items-start">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <div className="text-[8px] font-bold uppercase tracking-[0.5em] opacity-40">PROFESSIONAL_MINIMAL</div>
                          {renderDraggableField('name', <h2 className="text-5xl font-serif italic font-bold tracking-tight text-emerald-950">{displayData.name}</h2>)}
                        </div>
                        {renderDraggableField('position', <p className="text-xs uppercase tracking-[0.4em] font-medium border-b border-emerald-900/20 pb-4 inline-block">{displayData.position}</p>)}
                      </div>
                      <div className="space-y-2 text-[9px] font-bold uppercase tracking-widest text-emerald-900/60">
                        {renderDraggableField('email', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.email}</p>)}
                        {renderDraggableField('contact', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.contact}</p>)}
                        {renderDraggableField('location', <p className="flex items-center gap-3"><span className="w-4 h-[1px] bg-emerald-900/30"/> {displayData.location}</p>)}
                      </div>
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
