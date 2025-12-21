
import React, { useRef, useState, useEffect } from 'react';
import { CardData, CardStyle } from '../types';
import { Github, Globe, Mail, Phone, Briefcase, Target, ExternalLink, Repeat, MapPin } from 'lucide-react';

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

  // Refs for callbacks to avoid re-binding listeners on prop changes
  const onFieldUpdateRef = useRef(onFieldUpdate);
  const onUpdateElementRef = useRef(onUpdateElement);
  const onPositionChangeRef = useRef(onPositionChange);

  useEffect(() => { onFieldUpdateRef.current = onFieldUpdate; }, [onFieldUpdate]);
  useEffect(() => { onUpdateElementRef.current = onUpdateElement; }, [onUpdateElement]);
  useEffect(() => { onPositionChangeRef.current = onPositionChange; }, [onPositionChange]);

  // Field Dragging State
  const [draggedFieldId, setDraggedFieldId] = useState<string | null>(null);
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
    e.preventDefault(); // Prevent text selection

    console.log(`MouseDown on field: ${fieldId}`);
    setDraggedFieldId(fieldId);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    initialFieldPos.current = {
      x: data.fieldSettings?.[fieldId]?.x || 0,
      y: data.fieldSettings?.[fieldId]?.y || 0
    };
    console.log(`Start Pos: ${e.clientX}, ${e.clientY}, Initial Offset: ${initialFieldPos.current.x}, ${initialFieldPos.current.y}`);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // ... existing QR logic
      if (isDragging && cardRef.current) {
        // ... (keep QR logic same)
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        onPositionChange(Math.max(0, Math.min(100, x)), Math.max(0, Math.min(100, y)));
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

        onUpdateElement(resizingElementId, {
          style: { width: Math.max(20, newWidth), height: Math.max(20, newHeight) },
          x: resizeDirection.includes('w') ? newX : undefined, // Only update position if left resizing
          y: resizeDirection.includes('n') ? newY : undefined  // Only update position if top resizing
        });

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
      setDraggingElementId(null);
      setResizingElementId(null);
      setResizeDirection(null);
    };

    if (isDragging || draggedElementId || resizingElementId) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onPositionChange, draggedElementId, resizingElementId, resizeDirection, onUpdateElement, draggedFieldId, onFieldUpdate, style.contentScale]);

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
                     className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-nw-resize z-50"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'nw')}
                   />
                   <div
                     className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-ne-resize z-50"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'ne')}
                   />
                   <div
                     className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-sw-resize z-50"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'sw')}
                   />
                   <div
                     className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-blue-500 rounded-full cursor-se-resize z-50"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'se')}
                   />

                   {/* Edges */}
                   <div
                     className="absolute top-0 left-1/2 -translate-x-1/2 -mt-1 w-4 h-2 bg-transparent cursor-n-resize z-40"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'n')}
                   />
                   <div
                     className="absolute bottom-0 left-1/2 -translate-x-1/2 -mb-1 w-4 h-2 bg-transparent cursor-s-resize z-40"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 's')}
                   />
                   <div
                     className="absolute left-0 top-1/2 -translate-y-1/2 -ml-1 h-4 w-2 bg-transparent cursor-w-resize z-40"
                     onMouseDown={(e) => handleResizeMouseDown(e, el.id, 'w')}
                   />
                   <div
                     className="absolute right-0 top-1/2 -translate-y-1/2 -mr-1 h-4 w-2 bg-transparent cursor-e-resize z-40"
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
            <div className="w-full border-t border-slate-100 mb-4" />
            <div style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'left top' }}>
              {renderDraggableField('name', <h2 className="text-3xl font-light tracking-tight">{displayData.name}</h2>)}
              {renderDraggableField('position', <p className="text-sm font-medium tracking-widest uppercase opacity-60 mt-2" style={{ color: style.primaryColor }}>{displayData.position}</p>)}
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
            <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: style.primaryColor }} />
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
              {renderDraggableField('tagline', <p className="text-[10px] font-bold tracking-[0.3em] text-slate-500 mb-2 uppercase">{displayData.tagline}</p>)}
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
              {renderDraggableField('position', <p className="text-xs tracking-[0.2em] font-bold text-slate-400 uppercase">{displayData.position}</p>)}
            </div>
                <div className="text-right" style={{ transform: `scale(${style.contentScale})`, transformOrigin: 'right top' }}>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">TAGLINE</p>
                  {renderDraggableField('tagline', <p className="text-xs font-bold text-slate-800" style={{ color: style.accentColor }}>{displayData.tagline}</p>)}
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
