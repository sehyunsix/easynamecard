
import React, { useState } from 'react';
import { CardData, CardStyle, CardTheme, CardSize, CardElement } from '../types';
import { Github, Globe, Mail, Phone, Sparkles, Loader2, QrCode, Type, Image as ImageIcon, Trash2, AlignLeft, AlignCenter, AlignRight, Bold, MapPin, Eye, EyeOff, Wand2, History, Save } from 'lucide-react';
import { refineContent, suggestDesign, translateToEnglish } from '../services/geminiService';
import CardPreview from './CardPreview';

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
  icon?: React.ReactNode;
  visible?: boolean;
  onToggleVisibility?: () => void;
}> = ({ label, value, onChange, placeholder, icon, visible = true, onToggleVisibility }) => (
  <div>
    <div className="flex justify-between items-center mb-1">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</label>
      {onToggleVisibility && (
        <button
          onClick={onToggleVisibility}
          className={`text-slate-400 hover:text-blue-600 transition-colors ${!visible ? 'text-slate-300' : ''}`}
          title={visible ? "숨기기" : "보이기"}
        >
          {visible ? <Eye size={14} /> : <EyeOff size={14} />}
        </button>
      )}
    </div>
    <div className={`relative transition-opacity ${!visible ? 'opacity-50' : ''}`}>
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
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  savedCards?: any[];
  onLoadCard?: (card: any) => void;
  onDeleteCard?: (id: string) => void;
  userProfiles?: any[];
  onSaveProfile?: (name: string) => void;
  onDeleteProfile?: (id: string) => void;
  onApplyProfile?: (profile: any) => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  data,
  style,
  onDataChange,
  onStyleChange,
  selectedElementId,
  onSelectElement,
  savedCards = [],
  onLoadCard,
  onDeleteCard,
  userProfiles = [],
  onSaveProfile,
  onDeleteProfile,
  onApplyProfile
}) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [isMagicLoading, setIsMagicLoading] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'style' | 'back' | 'history'>('info');

  const handleTranslate = async () => {
    setIsTranslating(true);
    const result = await translateToEnglish(data.name, data.goal, data.position);
    if (result) {
      onDataChange({
        ...data,
        nameEn: result.nameEn || data.nameEn,
        positionEn: result.positionEn || data.positionEn,
        goalEn: result.goalEn || data.goalEn
      });
    }
    setIsTranslating(false);
  };

  const handleMagicDesign = async () => {
    setIsMagicLoading(true);
    const suggestion = await suggestDesign(data);
    if (suggestion) {
      onStyleChange({
        ...style,
        theme: suggestion.theme as CardTheme,
        primaryColor: suggestion.primaryColor,
        accentColor: suggestion.accentColor,
        contentScale: suggestion.contentScale || style.contentScale
      });
    }
    setIsMagicLoading(false);
  };

  const updateData = (key: keyof CardData, value: any) => {
    onDataChange({ ...data, [key]: value });
  };

  const toggleVisibility = (field: string) => {
    onDataChange({
      ...data,
      fieldSettings: {
        ...data.fieldSettings,
        [field]: {
          ...data.fieldSettings[field],
          visible: !data.fieldSettings[field]?.visible
        }
      }
    });
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

  const handleAddElement = (type: 'text' | 'image') => {
    const newElement: CardElement = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      x: 50,
      y: 50,
      content: type === 'text' ? 'New Text' : 'https://placehold.co/100x100?text=Image',
      style: {
        fontSize: 16,
        color: '#000000',
        width: type === 'image' ? 100 : undefined,
        fontWeight: 'normal',
        align: 'left'
      }
    };

    // If image, we might want to prompt upload immediately, but for now just placeholder
    // Or we can reuse the file upload logic if we want

    updateData('customElements', [...data.customElements, newElement]);
    onSelectElement(newElement.id);
  };

  const handleUpdateElement = (id: string, updates: Partial<CardElement> | Partial<CardElement['style']>) => {
    const updatedElements = data.customElements.map(el => {
      if (el.id !== id) return el;

      // Check if updates are for style or top-level properties
      const styleUpdates: any = {};
      const propUpdates: any = {};

      Object.entries(updates).forEach(([key, val]) => {
        if (['fontSize', 'color', 'width', 'height', 'fontWeight', 'align', 'fontFamily'].includes(key)) {
          styleUpdates[key] = val;
        } else {
          propUpdates[key] = val;
        }
      });

      return {
        ...el,
        ...propUpdates,
        style: { ...el.style, ...styleUpdates }
      };
    });
    updateData('customElements', updatedElements);
  };

  const handleRemoveElement = (id: string) => {
    updateData('customElements', data.customElements.filter(el => el.id !== id));
    if (selectedElementId === id) onSelectElement(null);
  };

  const updateStyle = (key: keyof CardStyle, value: any) => {
    onStyleChange({ ...style, [key]: value });
  };

  const handleRefine = async (type: 'goal' | 'goalEn') => {
    setLoading(type);
    // If we're refining/generating the English goal, use the Korean goal as the source for translation
    const sourceContent = type === 'goalEn' ? data.goal : (data[type as keyof CardData] as string || '');
    const result = await refineContent(type, sourceContent, data.positionEn || data.position);
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
    { id: 'elegant', label: '엘레강트' },
    { id: 'tech', label: '테크' },
    { id: 'bold', label: '볼드' },
    { id: 'classic', label: '클래식' },
    { id: 'luxury', label: '럭셔리' },
    { id: 'geometric', label: '지오메트릭' },
    { id: 'retro', label: '레트로' },
    { id: 'organic', label: '오가닉' },
    { id: 'pop', label: '팝' },
    { id: 'cyber', label: '사이버' },
    { id: 'eco', label: '에코' },
    { id: 'blueprint', label: '블루프린트' },
    { id: 'neon', label: '네온' },
    { id: 'newspaper', label: '신문' },
    { id: 'sketch', label: '스케치' },
    { id: 'brutalist', label: '브루탈리스트' },
    { id: 'pastel', label: '파스텔' },
    { id: 'gradient', label: '그라디언트' },
    { id: 'architect', label: '아키텍트' },
    { id: 'comic', label: '코믹' },
    { id: 'midnight', label: '미드나잇' },
    { id: 'vintage', label: '빈티지' },
    { id: 'pixel', label: '픽셀' },
    { id: 'soft', label: '소프트' },
    { id: 'industrial', label: '인더스트리얼' },
    { id: 'futuristic', label: '퓨처리스틱' },
    { id: 'holographic', label: '홀로그래픽' },
    { id: 'swiss', label: '스위스' },
    { id: 'botanical', label: '보타니컬' },
    { id: 'artdeco', label: '아르데코' },
    { id: 'minimalblack', label: '미니멀블랙' },
    { id: 'cardboard', label: '카드보드' },
    { id: 'zen', label: '젠' },
    { id: 'magical', label: '매지컬' },
    { id: 'chalk', label: '초크' },
    { id: 'magazine', label: '매거진' },
    { id: 'sticker', label: '스티커' },
    { id: 'space', label: '스페이스' },
    { id: 'marble', label: '마블' },
    { id: 'wood', label: '우드' },
    { id: 'paper', label: '페이퍼' },
    { id: 'techno', label: '테크노' },
    { id: 'glitch', label: '글리치' },
    { id: 'bauhaus', label: '바우하우스' },
  ];

  const updateStyleWithLayout = (theme: CardTheme) => {
    // Define default positions for each theme to "naturally align" elements
    const defaultPositions: Record<string, { x: number; y: number; visible: boolean }> = {
      name: { x: 0, y: 0, visible: true },
      position: { x: 0, y: 0, visible: true },
      contact: { x: 0, y: 0, visible: true },
      email: { x: 0, y: 0, visible: true },
      location: { x: 0, y: 0, visible: true },
      github: { x: 0, y: 0, visible: true },
      blog: { x: 0, y: 0, visible: true },
      goal: { x: 0, y: 0, visible: true },
    };

    // Reset offsets when changing themes to allow the theme's natural layout to take over
    const newFieldSettings = { ...data.fieldSettings };
    Object.keys(defaultPositions).forEach(field => {
      newFieldSettings[field] = {
        ...newFieldSettings[field],
        x: 0,
        y: 0,
      };
    });

    onDataChange({
      ...data,
      fieldSettings: newFieldSettings
    });

    onStyleChange({ ...style, theme });
  };

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
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'info' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          정보
        </button>
        <button
          onClick={() => setActiveTab('back')}
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'back' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          뒷면
        </button>
        <button
          onClick={() => setActiveTab('style')}
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'style' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          디자인
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === 'history' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
        >
          기록
        </button>
      </div>

      {activeTab === 'history' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
          <Section label="저장된 명함 함">
            {savedCards.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {savedCards.map((card, idx) => (
                  <div
                    key={card.id || idx}
                    className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-blue-400 hover:shadow-md transition-all"
                  >
                    <div
                      onClick={() => onLoadCard && onLoadCard(card)}
                      className="cursor-pointer"
                    >
                              <div className="h-24 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                 <div className="scale-[0.2] transform origin-center">
                                    <div
                                      className={`relative transition-all duration-500 w-[504px] h-[288px] rounded-md shadow-sm overflow-hidden bg-white`}
                                    >
                                      {/* Simplified Actual Preview */}
                                      <div className="w-full h-full pointer-events-none">
                                        {(() => {
                                          // We can't easily import CardPreview here due to circular dependency or complexity
                                          // but we can at least reflect the theme's colors and basic structure
                                          const primaryColor = card.style.primaryColor;
                                          const accentColor = card.style.accentColor;
                                          const theme = card.style.theme;

                                          return (
                                            <div className="w-full h-full relative">
                                              {/* Theme-specific background highlights */}
                                              {theme === 'modern' && <div className="h-2 w-full flex"><div className="flex-1" style={{backgroundColor: primaryColor}}/><div className="flex-1" style={{backgroundColor: accentColor}}/></div>}
                                              {theme === 'minimal' && <div className="absolute right-0 top-0 bottom-0 w-1.5" style={{backgroundColor: primaryColor}}/>}
                                              {theme === 'professional' && <div className="absolute left-0 top-0 bottom-0 w-4" style={{backgroundColor: primaryColor}}/>}
                                              {theme === 'dark' && (
                                                <>
                                                  <div className="absolute inset-0 bg-slate-950"/>
                                                  <div className="absolute top-0 left-0 w-full h-1" style={{background: `linear-gradient(to right, ${primaryColor}, ${accentColor})`}}/>
                                                </>
                                              )}

                                              <div className="p-8 flex flex-col justify-center items-center h-full text-center">
                                                <h3 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>{card.data.name}</h3>
                                                <p className={`text-xl ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{card.data.position}</p>
                                              </div>
                                            </div>
                                          );
                                        })()}
                                      </div>
                                    </div>
                                 </div>
                              </div>
                      <div className="p-2.5">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-xs font-bold text-slate-700">{card.data.name}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5">{new Date(card.createdAt).toLocaleDateString()} {new Date(card.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteCard && onDeleteCard(card.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-slate-100"
                      title="삭제"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <History size={32} className="mx-auto text-slate-200 mb-2" />
                <p className="text-xs text-slate-400">저장된 명함이 없습니다.</p>
              </div>
            )}
          </Section>
        </div>
      )}

      {activeTab === 'info' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <Section label="내 프로필 관리">
             <div className="space-y-3">
                {/* Profile Save Input */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="프로필 이름 (예: 개발자, 매니저)"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <button
                    onClick={() => {
                      onSaveProfile && onSaveProfile(profileName);
                      setProfileName('');
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-sm flex items-center gap-2"
                  >
                    <Save size={14} />
                    저장
                  </button>
                </div>

                {/* Profile List */}
                {userProfiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {userProfiles.map((profile) => (
                      <div
                        key={profile.id}
                        className="group relative flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full pl-3 pr-1 py-1 hover:border-blue-300 transition-all"
                      >
                        <button
                          onClick={() => onApplyProfile && onApplyProfile(profile)}
                          className="text-[10px] font-bold text-slate-600 hover:text-blue-600"
                        >
                          {profile.name}
                        </button>
                        <button
                          onClick={() => onDeleteProfile && onDeleteProfile(profile.id)}
                          className="p-1 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-[10px] text-slate-400 text-center">프로필을 저장하면 앞/뒷면 모든 정보가 한꺼번에 저장됩니다.</p>
             </div>
          </Section>

          <Section label="기본 정보">
            <div className="flex justify-end mb-2">
               <button
                 onClick={handleTranslate}
                 disabled={isTranslating}
                 className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold hover:bg-blue-100 transition-all disabled:opacity-50"
               >
                 {isTranslating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                 AI 영문 자동 변환
               </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="성명 (국문)"
                value={data.name}
                onChange={(v) => updateData('name', v)}
                placeholder="이름"
                visible={data.fieldSettings.name.visible}
                onToggleVisibility={() => toggleVisibility('name')}
              />
              <InputField
                label="성명 (영문)"
                value={data.nameEn}
                onChange={(v) => updateData('nameEn', v)}
                placeholder="Name"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputField
                label="직책 (국문)"
                value={data.position}
                onChange={(v) => updateData('position', v)}
                placeholder="예: Senior Product Designer"
                visible={data.fieldSettings.position.visible}
                onToggleVisibility={() => toggleVisibility('position')}
              />
              <InputField
                label="직책 (영문)"
                value={data.positionEn}
                onChange={(v) => updateData('positionEn', v)}
                placeholder="Ex: Software Engineer"
              />
            </div>
          </Section>

          <Section label="연락처 및 링크">
            <InputField
              label="전화번호"
              value={data.contact}
              onChange={(v) => updateData('contact', v)}
              icon={<Phone size={14} />}
              visible={data.fieldSettings.contact.visible}
              onToggleVisibility={() => toggleVisibility('contact')}
            />
            <InputField
              label="이메일"
              value={data.email}
              onChange={(v) => updateData('email', v)}
              icon={<Mail size={14} />}
              visible={data.fieldSettings.email.visible}
              onToggleVisibility={() => toggleVisibility('email')}
            />
            <InputField
              label="거주지 (Address)"
              value={data.location}
              onChange={(v) => updateData('location', v)}
              icon={<MapPin size={14} />}
              visible={data.fieldSettings.location.visible}
              onToggleVisibility={() => toggleVisibility('location')}
            />
            <InputField
              label="GitHub"
              value={data.github}
              onChange={(v) => updateData('github', v)}
              icon={<Github size={14} />}
              visible={data.fieldSettings.github.visible}
              onToggleVisibility={() => toggleVisibility('github')}
            />
            <InputField
              label="Blog/Website"
              value={data.blog}
              onChange={(v) => updateData('blog', v)}
              icon={<Globe size={14} />}
              visible={data.fieldSettings.blog.visible}
              onToggleVisibility={() => toggleVisibility('blog')}
            />
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

          <Section label="AI 목표">
            <div className="relative group space-y-3">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">커리어 목표 (국문)</label>
                    <button
                      onClick={() => toggleVisibility('goal')}
                      className={`text-slate-400 hover:text-blue-600 transition-colors ${!data.fieldSettings.goal.visible ? 'text-slate-300' : ''}`}
                    >
                      {data.fieldSettings.goal.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                  <div className={`flex gap-2 transition-opacity ${!data.fieldSettings.goal.visible ? 'opacity-50' : ''}`}>
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

                <div>
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">커리어 목표 (영문)</label>
                  <div className="flex gap-2">
                    <textarea
                      className="flex-1 text-sm border border-slate-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                      value={data.goalEn}
                      onChange={(e) => updateData('goalEn', e.target.value)}
                      placeholder="English career goal..."
                    />
                    <button
                      onClick={() => handleRefine('goalEn')}
                      disabled={loading === 'goalEn'}
                      className="p-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50 h-10 transition-colors"
                    >
                      {loading === 'goalEn' ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        </div>
      )}

      {activeTab === 'back' && (
        <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300">
          <Section label="뒷면 타입">
            <div className="grid grid-cols-2 gap-2 mb-2">
              {[
                { id: 'none', label: '없음' },
                { id: 'english', label: '영문' },
                { id: 'logo', label: '로고/이미지' },
                { id: 'custom', label: '커스텀 (PPT형)' }
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

          {data.backSideType === 'custom' && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              <Section label="요소 추가">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddElement('text')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700"
                  >
                    <Type size={14} /> 텍스트 추가
                  </button>
                  <button
                    onClick={() => handleAddElement('image')}
                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-xs font-medium text-slate-700"
                  >
                    <ImageIcon size={14} /> 이미지 추가
                  </button>
                </div>
              </Section>

              {selectedElementId ? (
                (() => {
                  const selectedEl = data.customElements.find(el => el.id === selectedElementId);
                  if (!selectedEl) return null;
                  return (
                    <Section label="선택된 요소 편집">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 space-y-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-bold text-blue-800 uppercase">{selectedEl.type === 'text' ? '텍스트 편집' : '이미지 편집'}</span>
                          <button
                            onClick={() => handleRemoveElement(selectedElementId)}
                            className="text-red-500 hover:bg-red-100 p-1.5 rounded-md transition-colors"
                            title="삭제"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {selectedEl.type === 'text' && (
                          <>
                            <textarea
                              className="w-full text-sm border border-blue-200 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none h-20"
                              value={selectedEl.content}
                              onChange={(e) => handleUpdateElement(selectedElementId, { content: e.target.value })}
                            />
                            <div className="flex gap-2">
                              <input
                                type="number"
                                className="w-16 text-sm border border-blue-200 rounded-md px-2 py-1"
                                value={selectedEl.style.fontSize}
                                onChange={(e) => handleUpdateElement(selectedElementId, { fontSize: parseInt(e.target.value) })}
                                placeholder="Size"
                              />
                              <input
                                type="color"
                                className="w-8 h-8 rounded cursor-pointer border border-blue-200 p-0 overflow-hidden"
                                value={selectedEl.style.color}
                                onChange={(e) => handleUpdateElement(selectedElementId, { color: e.target.value })}
                              />
                              <button
                                onClick={() => handleUpdateElement(selectedElementId, { fontWeight: selectedEl.style.fontWeight === 'bold' ? 'normal' : 'bold' })}
                                className={`p-1.5 rounded border border-blue-200 ${selectedEl.style.fontWeight === 'bold' ? 'bg-blue-200 text-blue-800' : 'bg-white text-slate-600'}`}
                              >
                                <Bold size={14} />
                              </button>
                            </div>
                            <div className="flex gap-1 bg-white rounded-md border border-blue-200 p-1">
                              {['left', 'center', 'right'].map((align) => (
                                <button
                                  key={align}
                                  onClick={() => handleUpdateElement(selectedElementId, { align: align as any })}
                                  className={`flex-1 flex justify-center py-1 rounded ${selectedEl.style.align === align ? 'bg-blue-100 text-blue-700' : 'text-slate-400 hover:bg-slate-50'}`}
                                >
                                  {align === 'left' && <AlignLeft size={14} />}
                                  {align === 'center' && <AlignCenter size={14} />}
                                  {align === 'right' && <AlignRight size={14} />}
                                </button>
                              ))}
                            </div>
                          </>
                        )}

                        {selectedEl.type === 'image' && (
                          <div className="space-y-2">
                            <InputField
                              label="이미지 URL"
                              value={selectedEl.content}
                              onChange={(v) => handleUpdateElement(selectedElementId, { content: v })}
                              placeholder="https://..."
                            />
                            <div>
                               <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">또는 파일 업로드</label>
                               <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        handleUpdateElement(selectedElementId, { content: reader.result as string });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                                />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                               <div className="flex-1">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">너비 (px)</label>
                                 <input
                                  type="number"
                                  className="w-full text-sm border border-blue-200 rounded-md px-2 py-1"
                                  value={selectedEl.style.width || 100}
                                  onChange={(e) => handleUpdateElement(selectedElementId, { width: parseInt(e.target.value) })}
                                />
                               </div>
                               <div className="flex-1">
                                 <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">높이 (px)</label>
                                 <input
                                  type="number"
                                  className="w-full text-sm border border-blue-200 rounded-md px-2 py-1"
                                  value={selectedEl.style.height || ''}
                                  placeholder="Auto"
                                  onChange={(e) => handleUpdateElement(selectedElementId, { height: e.target.value ? parseInt(e.target.value) : undefined })}
                                />
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </Section>
                  );
                })()
              ) : (
                <div className="text-center p-4 text-xs text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                  요소를 선택하여 편집하세요
                </div>
              )}
            </div>
          )}

          {data.backSideType === 'english' && (
            <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
              <Section label="영문 정보">
                <InputField label="Name (English)" value={data.nameEn} onChange={(v) => updateData('nameEn', v)} placeholder="Ex: Chulsoo Kim" />
                <InputField label="Position (English)" value={data.positionEn} onChange={(v) => updateData('positionEn', v)} placeholder="Ex: Software Engineer" />
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
               <Section label="로고/이미지 및 텍스트 설정">
                 <div className="space-y-3">
                   <InputField label="브랜드 텍스트 (선택)" value={data.logoText} onChange={(v) => updateData('logoText', v)} placeholder="회사명 또는 브랜드명 입력" />

                   <div className="border-t border-slate-100 pt-3">
                     <InputField label="이미지 URL" value={data.logoUrl} onChange={(v) => updateData('logoUrl', v)} placeholder="https://..." />
                     <div className="mt-3">
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
                 </div>
               </Section>
             </div>
          )}
        </div>
      )}

      {activeTab === 'style' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-300">
          <button
            onClick={handleMagicDesign}
            disabled={isMagicLoading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isMagicLoading ? <Loader2 size={18} className="animate-spin" /> : <Wand2 size={18} />}
            AI 매직 디자인 추천
          </button>

          <Section label="테마 선택">
            <div className="grid grid-cols-2 gap-4">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => updateStyleWithLayout(t.id)}
                  className={`group relative flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all ${style.theme === t.id ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-200' : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-sm'}`}
                >
                  <div className="w-full aspect-[1.75/1] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center pointer-events-none mb-1">
                    <div className="scale-[0.14] transform origin-center">
                       <CardPreview
                          data={{
                            ...data,
                            name: 'NAME',
                            position: 'POSITION',
                            fieldSettings: {
                              name: { visible: true, x: 0, y: 0 },
                              position: { visible: true, x: 0, y: 0 },
                              contact: { visible: true, x: 0, y: 0 },
                              email: { visible: true, x: 0, y: 0 },
                              github: { visible: true, x: 0, y: 0 },
                              blog: { visible: true, x: 0, y: 0 },
                              location: { visible: true, x: 0, y: 0 },
                              goal: { visible: true, x: 0, y: 0 },
                            }
                          }}
                          style={{
                            ...style,
                            theme: t.id,
                            contentScale: 1.0,
                            qrSize: 40,
                            qrX: 85,
                            qrY: 20
                          }}
                          viewMode="flip"
                          onPositionChange={() => {}}
                       />
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-[10px] font-bold tracking-tight ${style.theme === t.id ? 'text-blue-600' : 'text-slate-600'}`}>{t.label}</span>
                    <div className={`h-1 w-4 rounded-full mt-1 transition-all ${style.theme === t.id ? 'bg-blue-500 w-8' : 'bg-transparent'}`} />
                  </div>
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
                        onStyleChange({
                          ...style,
                          primaryColor: preset.primary,
                          accentColor: preset.accent
                        });
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
