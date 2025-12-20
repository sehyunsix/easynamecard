
import React, { useState, useEffect } from 'react';
import { CardData, CardStyle, CardElement } from './types';
import EditorPanel from './components/EditorPanel';
import CardPreview from './components/CardPreview';
import { Sparkles, Printer, Download, Columns } from 'lucide-react';
import html2canvas from 'html2canvas';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<'flip' | 'split'>('flip');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [cardData, setCardData] = useState<CardData>({
    name: '김철수',
    position: 'Full Stack Engineer',
    contact: '010-1234-5678',
    email: 'chulsoo.kim@example.com',
    github: 'github.com/chulsoo',
    blog: 'chulsoo.tistory.com',
    goal: '세상을 변화시키는 견고한 소프트웨어를 만듭니다.',
    tagline: 'Crafting Digital Experiences',
    showQrCode: true,
    qrUrl: 'https://chulsoo.tistory.com',

    // Back Side Defaults
    backSideType: 'none',
    nameEn: 'Chulsoo Kim',
    positionEn: 'Full Stack Engineer',
    taglineEn: 'Crafting Digital Experiences',
    goalEn: 'Building robust software that changes the world.',
    logoUrl: '',
    logoText: '',
    showBackQrCode: false,
    customElements: []
  });

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    theme: 'modern',
    primaryColor: '#3b82f6',
    accentColor: '#1d4ed8',
    size: 'standard',
    rounded: 'md',
    contentScale: 1.0,
    qrSize: 64,
    qrX: 85,
    qrY: 20
  });

  // Handle keyboard shortcuts (Delete/Backspace)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is typing in an input or textarea
      const activeElement = document.activeElement;
      const isInputActive = activeElement && (
        activeElement.tagName === 'INPUT' || 
        activeElement.tagName === 'TEXTAREA' || 
        activeElement.isContentEditable
      );

      if (isInputActive) return;

      if ((e.key === 'Backspace' || e.key === 'Delete') && selectedElementId) {
        setCardData(prev => ({
          ...prev,
          customElements: prev.customElements.filter(el => el.id !== selectedElementId)
        }));
        setSelectedElementId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementId]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPNG = async () => {
    const frontElement = document.getElementById('card-front');
    const backElement = document.getElementById('card-back');

    if (frontElement) {
        const canvas = await html2canvas(frontElement, {
            scale: 4,
            backgroundColor: null,
            logging: false,
            useCORS: true,
            allowTaint: true,
        });
        const link = document.createElement('a');
        link.download = `${cardData.name}_front.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    if (cardData.backSideType !== 'none' && backElement) {
        // Wait a bit to ensure potential flip animations don't interfere
        // For split view they are always visible, for flip view we might need to handle visibility
        // But the user asked to export both. If split view is not active, backElement might not be in DOM or hidden
        // Ideally we should force split view rendering or use hidden off-screen rendering.
        // For simplicity, let's just capture what's visible or ensure we are in a state where we can capture.

        // Actually, let's just capture 'card-back' if it exists.
        // In 'flip' mode, only one might be visible.
        // We will improve CardPreview to render both but hide one if in flip mode,
        // OR we switch to split mode temporarily? No that's jarring.

        // Better approach: modifying CardPreview to expose a ref or method, or
        // simple hack: The CardPreview will now always render both in DOM but hide one via CSS in flip mode?
        // Or we just rely on the 'split' view for downloading both.
        // Let's assume the user switches to 'split' view to see both, or we instruct them.
        // Or we can just capture the element if it's there.

        const canvas = await html2canvas(backElement, {
            scale: 4,
            backgroundColor: null,
            logging: false,
            useCORS: true,
            allowTaint: true,
        });
        const link = document.createElement('a');
        link.download = `${cardData.name}_back.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Editor Sidebar */}
      <aside className="w-full md:w-[450px] bg-white border-r border-slate-200 overflow-y-auto max-h-screen no-print shadow-xl z-10">
        <div className="p-6">
          <header className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Sparkles className="text-blue-600" />
              ProCard AI
            </h1>
            <p className="text-sm text-slate-500 mt-1">AI로 강화된 맞춤형 명함 제작 도구</p>
          </header>

          <EditorPanel
            data={cardData}
            style={cardStyle}
            onDataChange={setCardData}
            onStyleChange={setCardStyle}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
          />
        </div>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 p-4 md:p-12 flex flex-col items-center justify-center bg-slate-100/50 min-h-screen overflow-y-auto">
        <div className="mb-8 no-print flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setViewMode(prev => prev === 'flip' ? 'split' : 'flip')}
            className={`flex items-center gap-2 border px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${viewMode === 'split' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-300 hover:bg-slate-50'}`}
          >
            <Columns size={18} />
            {viewMode === 'flip' ? '양면 펼쳐보기' : '뒤집어 보기'}
          </button>

          <button
            onClick={handleDownloadPNG}
            className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm text-slate-700"
          >
            <Download size={18} />
            PNG 저장
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm text-slate-700"
          >
            <Printer size={18} />
            프린트 / PDF
          </button>
        </div>

        <div className={`preview-container perspective-1000 relative flex gap-8 flex-wrap justify-center items-center ${viewMode === 'split' ? 'w-full max-w-6xl' : ''}`}>
          <CardPreview
            data={cardData}
            style={cardStyle}
            viewMode={viewMode}
            onPositionChange={(x, y) => setCardStyle(prev => ({ ...prev, qrX: x, qrY: y }))}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            onUpdateElement={(id, updates) => {
              setCardData(prev => ({
                ...prev,
                customElements: prev.customElements.map(el =>
                  el.id === id ? { ...el, ...updates } : el
                )
              }));
            }}
          />
        </div>

        <div className="mt-12 text-center no-print text-slate-400 max-w-md">
          <p className="text-sm">
            💡 TIP: '양면 펼쳐보기'를 선택하면 앞/뒷면을 동시에 확인하고 이미지로 저장할 수 있습니다.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
