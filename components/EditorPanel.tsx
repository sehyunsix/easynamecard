
import React, { useState } from 'react';
import { CardData, CardStyle, CardTheme, CardSize } from '../types';
import { Github, Globe, Mail, Phone, Sparkles, Loader2, Maximize2 } from 'lucide-react';
import { refineContent } from '../services/geminiService';

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="pt-2">
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-100 pb-1">{label}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const InputField: React.FC<{ 
  label: string; 
  value: string; 
  onChange: (v: string) => void; 
  placeholder?: string; 
  icon?: React.ReactNode 
}> = ({ label, value, onChange, placeholder, icon }) => (
  <div>
    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input 
        className={`w-full text-sm border border-slate-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all ${icon ? 'pl-9' : ''}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  </div>
);

interface EditorPanelProps {
  data: CardData;
  style: CardStyle;
  onDataChange: (data: CardData) => void;
  onStyleChange: (style: CardStyle) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({ data, style, onDataChange, onStyleChange }) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'style'>('info');

  const updateData = (key: keyof CardData, value: string) => {
    onDataChange({ ...data, [key]: value });
  };

  const updateStyle = (key: keyof CardStyle, value: any) => {
    onStyleChange({ ...style, [key]: value });
  };

  const handleRefine = async (type: 'goal' | 'tagline') => {
    setLoading(type);
    const result = await refineContent(type, data[type], data.position);
    updateData(type, result);
    setLoading(null);
  };

  const themes: { id: CardTheme; label: string }[] = [
    { id: 'modern', label: '모던' },
    { id: 'minimal', label: '미니멀' },
    { id: 'professional', label: '프로페셔널' },
    { id: 'creative', label: '크리에이티브' },
    { id: 'dark', label: '다크' },
    { id: 'glassmorphism', label: '글래스모피즘' },
  ];

  const sizes: { id: CardSize; label: string }[] = [
    { id: 'standard', label: '표준 (3.5x2)' },
    { id: 'vertical', label: '세로형 (2x3.5)' },
    { id: 'square', label: '정사각형 (2.5x2.5)' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg">
        <button 
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          내용 편집
        </button>
        <button 
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'style' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          디자인 설정
        </button>
      </div>

      {activeTab === 'info' ? (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <Section label="기본 정보">
            <InputField label="성명" value={data.name} onChange={(v) => updateData('name', v)} placeholder="이름을 입력하세요" />
            <InputField label="직책" value={data.position} onChange={(v) => updateData('position', v)} placeholder="예: Senior Product Designer" />
          </Section>

          <Section label="연락처 및 링크">
            <InputField label="전화번호" value={data.contact} onChange={(v) => updateData('contact', v)} icon={<Phone size={14} />} />
            <InputField label="이메일" value={data.email} onChange={(v) => updateData('email', v)} icon={<Mail size={14} />} />
            <InputField label="GitHub" value={data.github} onChange={(v) => updateData('github', v)} icon={<Github size={14} />} />
            <InputField label="Blog/Website" value={data.blog} onChange={(v) => updateData('blog', v)} icon={<Globe size={14} />} />
          </Section>

          <Section label="AI 목표 & 태그라인">
            <div className="relative group">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">커리어 목표</label>
              <div className="flex gap-2">
                <textarea 
                  className="flex-1 text-sm border border-slate-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                  value={data.goal}
                  onChange={(e) => updateData('goal', e.target.value)}
                />
                <button 
                  onClick={() => handleRefine('goal')}
                  disabled={loading === 'goal'}
                  className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50 h-10 transition-colors"
                  title="AI로 목표 다듬기"
                >
                  {loading === 'goal' ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                </button>
              </div>
            </div>
            
            <div className="relative mt-4">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">태그라인</label>
              <div className="flex gap-2">
                <input 
                  className="flex-1 text-sm border border-slate-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={data.tagline}
                  onChange={(e) => updateData('tagline', e.target.value)}
                />
                <button 
                  onClick={() => handleRefine('tagline')}
                  disabled={loading === 'tagline'}
                  className="p-2 bg-purple-50 text-purple-600 rounded-md hover:bg-purple-100 disabled:opacity-50 transition-colors"
                  title="AI로 태그라인 추천받기"
                >
                  {loading === 'tagline' ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                </button>
              </div>
            </div>
          </Section>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
          <Section label="테마 선택">
            <div className="grid grid-cols-2 gap-2">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateStyle('theme', t.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${style.theme === t.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300'}`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </Section>

          <Section label="요소 크기 조절 (Content Scale)">
            <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-lg border border-slate-100">
              <Maximize2 size={16} className="text-slate-400" />
              <input 
                type="range" 
                min="0.5" 
                max="1.5" 
                step="0.1" 
                value={style.contentScale} 
                onChange={(e) => updateStyle('contentScale', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-xs font-mono font-bold text-slate-600 w-10 text-right">
                {Math.round(style.contentScale * 100)}%
              </span>
            </div>
          </Section>

          <Section label="카드 사이즈">
            <div className="space-y-2">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateStyle('size', s.id)}
                  className={`w-full px-4 py-3 text-left text-sm font-medium rounded-lg border flex items-center justify-between transition-all ${style.size === s.id ? 'bg-slate-800 text-white border-slate-800 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                >
                  {s.label}
                  {style.size === s.id && <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />}
                </button>
              ))}
            </div>
          </Section>

          <Section label="색상 설정">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">주요 색상</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md p-1">
                  <input 
                    type="color" 
                    value={style.primaryColor} 
                    onChange={(e) => updateStyle('primaryColor', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer overflow-hidden border-none p-0"
                  />
                  <span className="text-xs font-mono uppercase text-slate-500">{style.primaryColor}</span>
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">강조 색상</label>
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-md p-1">
                  <input 
                    type="color" 
                    value={style.accentColor} 
                    onChange={(e) => updateStyle('accentColor', e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer overflow-hidden border-none p-0"
                  />
                  <span className="text-xs font-mono uppercase text-slate-500">{style.accentColor}</span>
                </div>
              </div>
            </div>
          </Section>

          <Section label="모서리 곡률">
             <div className="grid grid-cols-5 gap-2">
              {['none', 'sm', 'md', 'lg', 'full'].map((r) => (
                <button
                  key={r}
                  onClick={() => updateStyle('rounded', r)}
                  className={`h-10 border rounded-md transition-all flex items-center justify-center ${style.rounded === r ? 'bg-slate-800 text-white border-slate-800' : 'bg-white border-slate-200 hover:border-slate-400'}`}
                >
                  <div className={`w-4 h-4 border-2 border-current ${
                    r === 'none' ? 'rounded-none' : 
                    r === 'sm' ? 'rounded-sm' : 
                    r === 'md' ? 'rounded-md' : 
                    r === 'lg' ? 'rounded-lg' : 'rounded-full'
                  }`} />
                </button>
              ))}
            </div>
          </Section>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
