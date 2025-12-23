# 새 테마 추가 가이드

이 문서는 ProCard AI에 새로운 명함 테마를 추가하는 방법을 설명합니다.

## 🎨 테마 추가 절차 (5단계)

### 1단계: 테마 컴포넌트 파일 생성

`components/themes/` 폴더에 새 테마 파일을 생성합니다. 파일명은 파스칼 케이스로 작성합니다.

예시: `components/themes/MyNewTheme.tsx`

```typescript
import React from 'react';
import { ThemeComponent } from './ThemeTypes';
import { Github, Mail, Phone, MapPin, Globe } from 'lucide-react';

export const MyNewTheme: ThemeComponent = ({
  displayData,
  style,
  renderDraggableField,
  renderQRCodeElement,
  s,
  isBack
}) => (
  <div className="w-full h-full p-8 bg-gradient-to-br from-purple-500 to-pink-500">
    {/* 이름 필드 (드래그 가능) */}
    {renderDraggableField('name',
      <h1 className="text-white text-4xl font-bold">
        {displayData.name}
      </h1>
    )}

    {/* 직책 필드 (드래그 가능) */}
    {renderDraggableField('position',
      <p className="text-white/80 text-lg mt-2">
        {displayData.position}
      </p>
    )}

    {/* 목표 필드 (드래그 가능) */}
    {renderDraggableField('goal',
      <p className="text-white text-sm mt-4">
        {displayData.goal}
      </p>
    )}

    {/* 연락처 정보 */}
    <div className="mt-6 space-y-2">
      {renderDraggableField('email',
        <p className="text-white/90 flex items-center gap-2">
          <Mail size={16} /> {displayData.email}
        </p>
      )}
      {renderDraggableField('contact',
        <p className="text-white/90 flex items-center gap-2">
          <Phone size={16} /> {displayData.contact}
        </p>
      )}
    </div>

    {/* QR 코드 렌더링 */}
    {renderQRCodeElement(isBack ? 'back' : 'front')}
  </div>
);
```

### 2단계: index.ts에 테마 export 추가

`components/themes/index.ts` 파일을 열고 새 테마를 export합니다:

```typescript
// 기존 exports...
export { Modern } from './Modern';
export { Minimal } from './Minimal';

// 새로운 테마 추가
export { MyNewTheme } from './MyNewTheme';
```

### 3단계: Registry에 테마 등록

`components/themes/Registry.tsx` 파일을 열고 themeMap에 추가합니다:

```typescript
import * as Themes from './index';

const themeMap: Partial<Record<CardTheme, ThemeComponent>> = {
  modern: Themes.Modern,
  minimal: Themes.Minimal,
  // ... 기존 테마들

  // 새 테마 추가 (소문자로 작성)
  mynewtheme: Themes.MyNewTheme,
};
```

### 4단계: 타입 정의에 테마 추가

`types.ts` 파일을 열고 `CardTheme` 타입에 새 테마를 추가합니다:

```typescript
export type CardTheme =
  | 'modern'
  | 'minimal'
  | 'creative'
  // ... 기존 테마들
  | 'mynewtheme';  // 새 테마 추가
```

### 5단계: EditorPanel에 테마 라벨 추가

`components/EditorPanel.tsx` 파일을 열고 themes 배열에 새 테마를 추가합니다:

```typescript
const themes: { id: CardTheme; label: string }[] = [
  { id: 'modern', label: '모던' },
  { id: 'minimal', label: '미니멀' },
  // ... 기존 테마들

  // 새 테마 추가
  { id: 'mynewtheme', label: '내 새 테마' },
];
```

## ✅ 완료!

이제 에디터 패널의 "테마 선택" 섹션에서 새 테마를 선택할 수 있습니다.

---

## 📚 API 참조

### ThemeProps

테마 컴포넌트가 받는 props:

| Prop | 타입 | 설명 |
|------|------|------|
| `displayData` | `object` | 명함에 표시할 데이터 (name, position, email 등) |
| `style` | `CardStyle` | 테마 스타일 설정 (primaryColor, accentColor 등) |
| `renderDraggableField` | `function` | 드래그 가능한 필드를 렌더링하는 함수 |
| `renderQRCodeElement` | `function` | QR 코드를 렌더링하는 함수 |
| `s` | `function` | 스케일 함수 - `s(12)`는 `12 * contentScale`을 반환 |
| `isBack` | `boolean` | 뒷면 여부 (앞면: false, 뒷면: true) |

### renderDraggableField(id, children, className?, customStyle?)

필드를 드래그 가능하게 만들고 가시성을 제어합니다.

**Parameters:**
- `id`: 필드 ID ('name', 'position', 'contact', 'email', 'github', 'blog', 'location', 'goal')
- `children`: 렌더링할 React 노드
- `className` (선택): 추가 CSS 클래스
- `customStyle` (선택): 인라인 스타일 객체

**Example:**
```typescript
{renderDraggableField('name',
  <h1 className="text-4xl">{displayData.name}</h1>
)}
```

### renderQRCodeElement(side)

QR 코드를 렌더링합니다.

**Parameters:**
- `side`: 'front' 또는 'back'

**Example:**
```typescript
{renderQRCodeElement(isBack ? 'back' : 'front')}
```

### 스케일 함수 s(base)

contentScale에 따라 크기를 조정합니다.

**Parameters:**
- `base`: 기본 크기 (px)

**Returns:** `base * contentScale`

**Example:**
```typescript
<p style={{ fontSize: `${s(14)}px` }}>텍스트</p>
```

---

## 💡 팁과 모범 사례

### 1. 색상 사용

- `style.primaryColor`: 주 색상
- `style.accentColor`: 강조 색상

```typescript
<div style={{ backgroundColor: style.primaryColor }}>
  <p style={{ color: style.accentColor }}>텍스트</p>
</div>
```

### 2. 반응형 크기

항상 `s()` 함수를 사용하여 사용자가 contentScale을 조정할 수 있도록 합니다:

```typescript
<p style={{ fontSize: `${s(14)}px` }}>텍스트</p>
<Mail size={s(16)} />
```

### 3. 필드 가시성

`renderDraggableField`를 사용하면 사용자가 필드를 숨길 수 있습니다:

```typescript
{renderDraggableField('email',
  <span>{displayData.email}</span>
)}
```

### 4. 앞면/뒷면 구분

`isBack` prop을 사용하여 앞면과 뒷면에 다른 레이아웃을 적용할 수 있습니다:

```typescript
{isBack ? (
  <div>뒷면 레이아웃</div>
) : (
  <div>앞면 레이아웃</div>
)}
```

### 5. 아이콘 사용

lucide-react에서 아이콘을 import하여 사용합니다:

```typescript
import { Github, Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';

<Mail size={s(16)} style={{ color: style.primaryColor }} />
```

---

## 🎨 디자인 가이드라인

1. **가독성 우선**: 명함의 주요 정보가 명확하게 보이도록 합니다
2. **일관성**: 비슷한 정보는 비슷한 스타일로 표시합니다
3. **공백 활용**: 적절한 여백으로 정보를 구분합니다
4. **대비**: 텍스트와 배경의 색상 대비를 확보합니다
5. **스케일 고려**: 모든 크기를 `s()` 함수로 조정 가능하게 만듭니다

---

## 🐛 문제 해결

### 테마가 표시되지 않음

1. `index.ts`에 export 했는지 확인
2. `Registry.tsx`의 themeMap에 추가했는지 확인
3. 컴포넌트 이름이 파스칼 케이스인지 확인
4. 개발 서버를 재시작해보세요

### 스타일이 이상함

1. Tailwind CSS 클래스를 올바르게 사용했는지 확인
2. `s()` 함수를 사용하여 크기를 조정했는지 확인
3. `overflow-hidden`을 추가하여 내용이 카드 밖으로 나가지 않도록 합니다

### 드래그가 작동하지 않음

1. `renderDraggableField`를 사용했는지 확인
2. 필드 ID가 올바른지 확인 ('name', 'position' 등)

---

## 📝 체크리스트

테마 추가 시 다음 항목을 확인하세요:

- [ ] `components/themes/YourTheme.tsx` 파일 생성
- [ ] `components/themes/index.ts`에 export 추가
- [ ] `components/themes/Registry.tsx`에 등록
- [ ] `types.ts`에 타입 추가
- [ ] `components/EditorPanel.tsx`에 라벨 추가
- [ ] 모든 필수 필드 포함 (name, position)
- [ ] `renderDraggableField` 사용
- [ ] `renderQRCodeElement` 호출
- [ ] `s()` 함수로 크기 조정
- [ ] 색상은 `style.primaryColor`, `style.accentColor` 사용
- [ ] 개발 서버에서 테스트

---

**참고**: 기존 테마를 참고하려면 `components/themes/Modern.tsx`, `Minimal.tsx` 등을 확인하세요!




