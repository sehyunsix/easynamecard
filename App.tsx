
import React, { useState, useEffect } from 'react';
import { CardData, CardStyle, CardElement } from './types';
import EditorPanel from './components/EditorPanel';
import CardPreview from './components/CardPreview';
import CardThumbnail from './components/CardThumbnail';
import { Sparkles, Printer, Download, Columns, LogIn, LogOut, User as UserIcon, Save, History, X, Trash2, QrCode } from 'lucide-react';
import html2canvas from 'html2canvas';
import { auth, googleProvider, db } from './firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs, addDoc, deleteDoc, orderBy } from 'firebase/firestore';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [userCards, setUserCards] = useState<any[]>([]);
  const [userProfiles, setUserProfiles] = useState<any[]>([]);
  const [backTemplates, setBackTemplates] = useState<any[]>([]);
  const [showGallery, setShowGallery] = useState(false);
  const [viewMode, setViewMode] = useState<'flip' | 'split'>('split');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const fetchUserCards = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'cards'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const cards = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserCards(cards);
    } catch (error) {
      console.error('Failed to fetch cards:', error);
    }
  };

  const fetchUserProfiles = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'users', uid, 'profiles'),
        orderBy('updatedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const profiles = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUserProfiles(profiles);
      return profiles;
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
      return [];
    }
  };

  // Auth & Permissions Effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Use lowercase for email comparison to avoid case-sensitivity issues
        const emailKey = (currentUser.email || '').toLowerCase();
        console.log("Checking admin status for:", emailKey);

        const adminDoc = await getDoc(doc(db, 'admins', emailKey));
        console.log("Admin exists in Firestore:", adminDoc.exists());
        setIsAdmin(adminDoc.exists());

        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setIsPaid(userDoc.data().isPaid || false);
        } else {
          await setDoc(userDocRef, {
            email: currentUser.email,
            isPaid: false,
            createdAt: new Date().toISOString()
          });
          setIsPaid(false);
        }

        // Fetch cards and profiles for the logged in user
        fetchUserCards(currentUser.uid);
        const profiles = await fetchUserProfiles(currentUser.uid);

        // Auto-load the most recent profile if available
        if (profiles.length > 0) {
          setCardData(prev => ({ ...prev, ...profiles[0].data }));
        }
      } else {
        setIsAdmin(false);
        setIsPaid(false);
        setUserCards([]);
        setUserProfiles([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => signOut(auth);

  const canSave = isAdmin || isPaid;

  // Helper to clean object for Firestore (remove undefined)
  const cleanData = (obj: any): any => {
    return JSON.parse(JSON.stringify(obj, (key, value) =>
      value === undefined ? null : value
    ));
  };

  const handleSaveCard = async () => {
    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }
    if (!canSave) {
      alert('저장 기능은 관리자 또는 유료 사용자만 이용 가능합니다.');
      return;
    }

    try {
      await addDoc(collection(db, 'cards'), {
        userId: user.uid,
        data: cleanData(cardData),
        style: cleanData(cardStyle),
        createdAt: new Date().toISOString()
      });
      alert('명함이 성공적으로 저장되었습니다!');
      fetchUserCards(user.uid); // Refresh the list
    } catch (error) {
      console.error('Save failed:', error);
      alert('저장에 실패했습니다.');
    }
  };

  const handleSaveProfile = async (profileName: string) => {
    if (!user) return;
    try {
      const profileId = profileName.trim() || '기본 프로필';
      await setDoc(doc(db, 'users', user.uid, 'profiles', profileId), {
        name: profileId,
        data: cleanData(cardData),
        style: cleanData(cardStyle),
        updatedAt: new Date().toISOString()
      }, { merge: true });
      alert(`'${profileId}' 프로필이 저장되었습니다.`);
      fetchUserProfiles(user.uid);
    } catch (error) {
      console.error('Profile save failed:', error);
      alert('프로필 저장에 실패했습니다.');
    }
  };

  const handleDeleteProfile = async (profileId: string) => {
    if (!user || !window.confirm('이 프로필을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'profiles', profileId));
      setUserProfiles(prev => prev.filter(p => p.id !== profileId));
    } catch (error) {
      console.error('Profile delete failed:', error);
    }
  };

  const handleApplyProfile = (profile: any) => {
    setCardData(prev => ({
      ...prev,
      ...profile.data
    }));
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!window.confirm('정말 이 명함을 삭제하시겠습니까?')) return;
    try {
      await deleteDoc(doc(db, 'cards', cardId));
      setUserCards(prev => prev.filter(c => c.id !== cardId));
      alert('삭제되었습니다.');
    } catch (error) {
      console.error('Delete failed:', error);
      alert('삭제에 실패했습니다.');
    }
  };

  const handleLoadCard = (card: any) => {
    setCardData(card.data);
    setCardStyle(card.style);
    setShowGallery(false);
  };

  const [cardData, setCardData] = useState<CardData>({
    name: '김철수',
    position: 'Full Stack Engineer',
    contact: '010-1234-5678',
    email: 'chulsoo.kim@example.com',
    github: 'github.com/chulsoo',
    blog: 'chulsoo.tistory.com',
    goal: '세상을 변화시키는 견고한 소프트웨어를 만듭니다.',
    location: 'Seoul, Korea',
    fieldSettings: {
      name: { visible: true, x: 0, y: 0 },
      position: { visible: true, x: 0, y: 0 },
      contact: { visible: true, x: 0, y: 0 },
      email: { visible: true, x: 0, y: 0 },
      github: { visible: true, x: 0, y: 0 },
      blog: { visible: true, x: 0, y: 0 },
      location: { visible: true, x: 0, y: 0 },
      goal: { visible: true, x: 0, y: 0 },
    },
    showQrCode: true,
    qrUrl: 'https://chulsoo.tistory.com',

    // Back Side Defaults
    backSideType: 'none',
    nameEn: 'Chulsoo Kim',
    positionEn: 'Full Stack Engineer',
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

  const downloadImage = async (elementId: string, fileName: string) => {
    // Deselect any active element before capturing to remove blue outlines
    if (selectedElementId || true) { // Always force a clear and wait
      setSelectedElementId(null);
      // Wait for state update and re-render (increased to 150ms for safety)
      await new Promise(resolve => setTimeout(resolve, 150));
    }

    const element = document.getElementById(elementId);
    if (!element) return;

    try {
      // Temporarily show the element if it's hidden (for flip mode)
      const wasHidden = element.classList.contains('hidden');
      if (wasHidden) element.classList.remove('hidden');

      const canvas = await html2canvas(element, {
        scale: 4,
        backgroundColor: null,
        logging: false,
        useCORS: true,
        allowTaint: true,
      });

      if (wasHidden) element.classList.add('hidden');

      const link = document.createElement('a');
      link.download = fileName;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  const handleDownloadFront = () => downloadImage('card-front', `${cardData.name}_front.png`);
  const handleDownloadBack = () => downloadImage('card-back', `${cardData.name}_back.png`);


  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Editor Sidebar */}
      <aside className="w-full md:w-[450px] bg-white border-r border-slate-200 overflow-y-auto max-h-screen no-print shadow-xl z-10">
        <div className="p-6">
          <header className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="text-blue-600" />
                ProCard AI
              </h1>
              <p className="text-sm text-slate-500 mt-1">AI로 강화된 맞춤형 명함 제작 도구</p>
            </div>

            <div className="no-print">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-700">{user.displayName}</p>
                    <p className="text-[10px] text-slate-400">{isAdmin ? 'Admin' : isPaid ? 'Pro' : 'Free'}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                    title="로그아웃"
                  >
                    <LogOut size={18} className="text-slate-500" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-800 transition-all shadow-sm"
                >
                  <LogIn size={16} />
                  로그인
                </button>
              )}
            </div>
          </header>

          <EditorPanel
            data={cardData}
            style={cardStyle}
            onDataChange={setCardData}
            onStyleChange={setCardStyle}
            selectedElementId={selectedElementId}
            onSelectElement={setSelectedElementId}
            savedCards={userCards}
            onLoadCard={handleLoadCard}
            onDeleteCard={handleDeleteCard}
            userProfiles={userProfiles}
            onSaveProfile={handleSaveProfile}
            onDeleteProfile={handleDeleteProfile}
            onApplyProfile={handleApplyProfile}
          />

          {user && !canSave && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
              <p className="text-sm font-bold text-blue-800 mb-1">PRO 기능을 사용해보세요!</p>
              <p className="text-[10px] text-blue-600 mb-3">명함 저장 및 AI 매직 디자인 등 모든 기능을 제한 없이 이용할 수 있습니다.</p>
              <button
                onClick={async () => {
                  try {
                    await setDoc(doc(db, 'users', user.uid), { isPaid: true }, { merge: true });
                    setIsPaid(true);
                    alert('성공적으로 PRO로 업그레이드 되었습니다! 🎉');
                  } catch (error) {
                    console.error('Upgrade failed:', error);
                  }
                }}
                className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-all shadow-md"
              >
                PRO로 업그레이드 하기
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Preview Area */}
      <main
        onMouseDown={(e) => {
          // 배경(main) 자체를 클릭했을 때만 선택 해제
          if (e.target === e.currentTarget) setSelectedElementId(null);
        }}
        onTouchStart={(e) => {
          // 터치 기기 대응
          if (e.target === e.currentTarget) setSelectedElementId(null);
        }}
        className="flex-1 p-4 md:p-12 flex flex-col items-center justify-center bg-slate-100/50 min-h-screen overflow-y-auto"
      >
        <div className="mb-8 no-print flex flex-wrap gap-3 justify-center">
          <button
            onClick={() => setViewMode(prev => prev === 'flip' ? 'split' : 'flip')}
            className={`flex items-center gap-2 border px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${viewMode === 'split' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-300 hover:bg-slate-50'}`}
          >
            <Columns size={18} />
            {viewMode === 'flip' ? '양면 펼쳐보기' : '뒤집어 보기'}
          </button>

          {user && (
            <button
              onClick={() => setShowGallery(true)}
              className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm text-slate-700"
            >
              <History size={18} />
              저장된 명함
            </button>
          )}

          <button
            onClick={handleSaveCard}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all shadow-sm ${canSave ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-200 opacity-50'}`}
          >
            <Save size={18} className={canSave ? 'text-blue-600' : 'text-slate-300'} />
            명함 저장
          </button>

          <button
            onClick={handleDownloadFront}
            className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm text-slate-700"
          >
            <Download size={18} />
            앞면 PNG 저장
          </button>

          {cardData.backSideType !== 'none' && (
            <button
              onClick={handleDownloadBack}
              className="flex items-center gap-2 bg-white border border-slate-300 px-6 py-2.5 rounded-full font-semibold hover:bg-slate-50 transition-all shadow-sm text-slate-700"
            >
              <Download size={18} />
              뒷면 PNG 저장
            </button>
          )}
        </div>

        <div
          onMouseDown={(e) => e.stopPropagation()} // 명함 영역 클릭 시 배경 이벤트 전파 차단
          className={`preview-container perspective-1000 relative flex gap-8 flex-wrap justify-center items-center ${viewMode === 'split' ? 'w-full max-w-6xl' : ''}`}
        >
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
            onFieldUpdate={(field, updates) => {
              setCardData(prev => ({
                ...prev,
                fieldSettings: {
                  ...prev.fieldSettings,
                  [field]: {
                    ...prev.fieldSettings[field],
                    ...updates
                  }
                }
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

      {/* Gallery Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-800">저장된 명함 함</h2>
                <p className="text-sm text-slate-500">이전에 저장한 명함 디자인을 불러옵니다.</p>
              </div>
              <button
                onClick={() => setShowGallery(false)}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {userCards.length === 0 ? (
                <div className="text-center py-12">
                  <History size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-500">저장된 명함이 없습니다.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {userCards.map((card) => (
                    <div
                      key={card.id}
                      className="group relative border border-slate-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                      <div
                        onClick={() => handleLoadCard(card)}
                        className="cursor-pointer"
                      >
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex items-center justify-center min-h-[120px] overflow-hidden">
                          <div className="scale-[0.25] transform origin-center">
                             <CardThumbnail
                                data={card.data}
                                style={card.style}
                                side="front"
                             />
                          </div>
                        </div>
                        <div className="p-3 bg-white">
                          <p className="font-bold text-sm text-slate-800 truncate">{card.data.name}</p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {new Date(card.createdAt).toLocaleDateString()} {new Date(card.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 저장
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCard(card.id);
                        }}
                        className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all border border-slate-100"
                        title="삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
