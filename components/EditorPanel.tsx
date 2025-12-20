
import React, { useState } from 'react';
import { CardData, CardStyle, CardTheme, CardSize } from '../types';
import { Github, Globe, Mail, Phone, Sparkles, Loader2, QrCode } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<'info' | 'style' | 'back'>('info');

  const updateData = (key: keyof CardData, value: any) => {
    onDataChange({ ...data, [key]: value });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateData('logoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateStyle = (key: keyof CardStyle, value: any) => {
    onStyleChange({ ...style, [key]: value });
  };

  const handleRefine = async (type: 'goal' | 'tagline') => {
    setLoading(type);
    const result = await refineContent(type, data[type as keyof CardData] as string || '', data.position);
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

  const colorPresets = [
    { name: 'Navy & Blue', primary: '#1e3a8a', accent: '#3b82f6' },
    { name: 'Black & Gray', primary: '#18181b', accent: '#71717a' },
    { name: 'Forest & Beige', primary: '#14532d', accent: '#d4d4d8' },
    { name: 'Burgundy & Gold', primary: '#7f1d1d', accent: '#d97706' },
    { name: 'Charcoal & Teal', primary: '#334155', accent: '#0d9488' },
    { name: 'Royal & Sky', primary: '#1d4ed8', accent: '#7dd3fc' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('info')}
          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          기본 정보
        </button>
        <button
          onClick={() => setActiveTab('back')}
          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${activeTab === 'back' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          뒷면 설정
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 text-xs font-medium rounded-md transition-all ${activeTab === 'style' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          디자인
        </button>
      </div>

      {activeTab === 'info' && (
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

          <Section label="QR 코드 설정">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={data.showQrCode}
                    onChange={(e) => updateData('showQrCode', e.target.checked)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 bg-white checked:border-blue-600 checked:bg-blue-600 transition-all"
                  />
                  <QrCode size={12} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">명함에 QR 코드 표시</span>
              </label>

              {data.showQrCode && (
                <div className="space-y-4 animate-in slide-in-from-top-1 duration-200">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">연결할 링크 (URL)</label>
                    <input
                      className="w-full text-sm border border-slate-200 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      value={data.qrUrl}
                      onChange={(e) => updateData('qrUrl', e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                         가로 위치 (X)
                         <span className="text-slate-600">{Math.round(style.qrX)}%</span>
                       </label>
                       <input
                        type="range" min="0" max="100" step="1"
                        value={style.qrX}
                        onChange={(e) => updateStyle('qrX', parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                         세로 위치 (Y)
                         <span className="text-slate-600">{Math.round(style.qrY)}%</span>
                       </label>
                       <input
                        type="range" min="0" max="100" step="1"
                        value={style.qrY}
                        onChange={(e) => updateStyle('qrY', parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                     </div>
                  </div>
                </div>
              )}
            </div>
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
                >
                  {loading === 'goal' ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                </button>
              </div>
            </div>
          </Section>
        </div>
      )}

      {activeTab === 'back' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <Section label="뒷면 타입">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'none', label: '없음' },
                { id: 'english', label: '영문' },
                { id: 'logo', label: '로고/이미지' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => updateData('backSideType', opt.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-md border transition-all ${data.backSideType === opt.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </Section>

          {data.backSideType === 'english' && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              <Section label="영문 정보">
                <InputField label="Name (English)" value={data.nameEn} onChange={(v) => updateData('nameEn', v)} placeholder="Ex: Chulsoo Kim" />
                <InputField label="Position (English)" value={data.positionEn} onChange={(v) => updateData('positionEn', v)} placeholder="Ex: Software Engineer" />
                <InputField label="Tagline (English)" value={data.taglineEn} onChange={(v) => updateData('taglineEn', v)} placeholder="Ex: Crafting Digital Experiences" />
                <div className="pt-2">
                   <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">Career Goal (English)</label>
                   <textarea
                      className="w-full text-sm border border-slate-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                      value={data.goalEn}
                      onChange={(e) => updateData('goalEn', e.target.value)}
                    />
                </div>
              </Section>

              <Section label="뒷면 QR 코드">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        checked={data.showBackQrCode}
                        onChange={(e) => updateData('showBackQrCode', e.target.checked)}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 bg-white checked:border-blue-600 checked:bg-blue-600 transition-all"
                      />
                      <QrCode size={12} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">뒷면에도 QR 코드 표시</span>
                  </label>
                  <p className="text-[10px] text-slate-400 mt-2 pl-8">* 앞면과 동일한 위치/크기로 표시됩니다.</p>
                </div>
              </Section>
            </div>
          )}

          {data.backSideType === 'logo' && (
             <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
               <Section label="로고/이미지 설정">
                 <div className="space-y-3">
                   <InputField label="이미지 URL" value={data.logoUrl} onChange={(v) => updateData('logoUrl', v)} placeholder="https://..." />
                   <div>
                     <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">또는 파일 업로드</label>
                     <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                   </div>
                   {data.logoUrl && (
                     <div className="mt-2 border border-slate-200 rounded-lg p-2 bg-slate-50 text-center">
                       <img src={data.logoUrl} alt="Preview" className="max-h-32 mx-auto object-contain" />
                     </div>
                   )}
                 </div>
               </Section>
             </div>
          )}
        </div>
      )}

      {activeTab === 'style' && (
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

          <Section label="콘텐츠 스케일 & QR 크기">
            <div className="space-y-4">
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-bold text-slate-400 uppercase">전체 요소 스케일</label>
                   <span className="text-[10px] font-mono font-bold text-slate-600">{Math.round(style.contentScale * 100)}%</span>
                </div>
                <input
                  type="range" min="0.5" max="1.5" step="0.1"
                  value={style.contentScale}
                  onChange={(e) => updateStyle('contentScale', parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {data.showQrCode && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                     <label className="text-[10px] font-bold text-slate-400 uppercase">QR 코드 크기</label>
                     <span className="text-[10px] font-mono font-bold text-slate-600">{style.qrSize}px</span>
                  </div>
                  <input
                    type="range" min="30" max="120" step="1"
                    value={style.qrSize}
                    onChange={(e) => updateStyle('qrSize', parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              )}
            </div>
          </Section>

          <Section label="카드 사이즈">
            <div className="grid grid-cols-1 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => updateStyle('size', s.id)}
                  className={`w-full px-4 py-2 text-left text-sm font-medium rounded-lg border transition-all ${style.size === s.id ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Section>

          <Section label="색상 설정">
            <div className="space-y-4">
              {/* Color Presets */}
              <div>
                <label className="text-[10px] font-bold text-slate-400 mb-2 block uppercase">추천 색상 조합</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorPresets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => {
                        updateStyle('primaryColor', preset.primary);
                        updateStyle('accentColor', preset.accent);
                      }}
                      className="flex flex-col items-center gap-1 p-2 border border-slate-200 rounded-lg hover:border-blue-300 transition-all bg-white"
                      title={preset.name}
                    >
                      <div className="flex gap-1">
                        <div className="w-4 h-4 rounded-full border border-slate-100" style={{ backgroundColor: preset.primary }} />
                        <div className="w-4 h-4 rounded-full border border-slate-100" style={{ backgroundColor: preset.accent }} />
                      </div>
                      <span className="text-[10px] font-medium text-slate-500 truncate w-full text-center">{preset.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Color Pickers */}
              <div className="flex gap-4 pt-2 border-t border-slate-100">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">직접 선택 (주요)</label>
                  <input 
                    type="color" value={style.primaryColor} 
                    onChange={(e) => updateStyle('primaryColor', e.target.value)}
                    className="w-full h-8 rounded cursor-pointer overflow-hidden border border-slate-200 p-0"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-slate-400 mb-1 block uppercase">직접 선택 (강조)</label>
                  <input 
                    type="color" value={style.accentColor} 
                    onChange={(e) => updateStyle('accentColor', e.target.value)}
                    className="w-full h-8 rounded cursor-pointer overflow-hidden border border-slate-200 p-0"
                  />
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}
    </div>
  );
};

export default EditorPanel;
