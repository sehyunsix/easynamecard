
import React, { useRef, useState, useEffect } from 'react';
import { CardData, CardStyle } from '../types';
import { Github, Globe, Mail, Phone, Briefcase, Target, ExternalLink, Repeat, MapPin, Sparkles } from 'lucide-react';
import { renderThemeById } from './themes/Registry';

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

    // Try to render theme from Registry first (new structure)
    const themeComponent = renderThemeById(style.theme, {
      data,
      style,
      displayData,
      renderDraggableField,
      renderQRCodeElement,
      s,
      isBack,
    });

    if (themeComponent) {
      return themeComponent;
    }

    // Fallback to old switch statement for themes not yet migrated
    switch (style.theme) {





























































































































































































































































































































































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

// Memoize CardPreview to prevent unnecessary re-renders
export default React.memo(CardPreview, (prevProps, nextProps) => {
  // Deep comparison for data and style objects
  return (
    prevProps.data === nextProps.data &&
    prevProps.style === nextProps.style &&
    prevProps.viewMode === nextProps.viewMode &&
    prevProps.selectedElementId === nextProps.selectedElementId &&
    prevProps.onPositionChange === nextProps.onPositionChange &&
    prevProps.onSelectElement === nextProps.onSelectElement &&
    prevProps.onUpdateElement === nextProps.onUpdateElement &&
    prevProps.onFieldUpdate === nextProps.onFieldUpdate
  );
});
