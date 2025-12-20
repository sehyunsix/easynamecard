
import React, { useState } from 'react';
import { CardData, CardStyle } from './types';
import EditorPanel from './components/EditorPanel';
import CardPreview from './components/CardPreview';
import { Sparkles, Printer } from 'lucide-react';

const App: React.FC = () => {
  const [cardData, setCardData] = useState<CardData>({
    name: '김철수',
    position: 'Full Stack Engineer',
    contact: '010-1234-5678',
    email: 'chulsoo.kim@example.com',
    github: 'github.com/chulsoo',
    blog: 'chulsoo.tistory.com',
    goal: '세상을 변화시키는 견고한 소프트웨어를 만듭니다.',
    tagline: 'Crafting Digital Experiences'
  });

  const [cardStyle, setCardStyle] = useState<CardStyle>({
    theme: 'modern',
    primaryColor: '#3b82f6',
    accentColor: '#1d4ed8',
    size: 'standard',
    rounded: 'md',
    contentScale: 1.0
  });

  const handlePrint = () => {
    window.print();
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
          />
        </div>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 p-4 md:p-12 flex flex-col items-center justify-center bg-slate-100/50 min-h-screen">
        <div className="mb-8 no-print flex gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm"
          >
            <Printer size={18} />
            프린트 / PDF 저장
          </button>
        </div>

        <div className="preview-container perspective-1000">
          <CardPreview data={cardData} style={cardStyle} />
        </div>

        <div className="mt-12 text-center no-print text-slate-400 max-w-md">
          <p className="text-sm">
            💡 TIP: 텍스트 박스 옆의 AI 아이콘을 클릭하여 내용을 더 전문적으로 다듬어 보세요.
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
