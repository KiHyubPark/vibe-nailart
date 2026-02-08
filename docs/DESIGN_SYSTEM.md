# Nailart AI - 디자인 시스템

## 개요

Nailart AI의 디자인 시스템 문서입니다. 일관된 UI/UX를 유지하기 위한 가이드라인을 제공합니다.

---

## 1. 색상 팔레트

### 브랜드 색상 (Primary Gradient)

| 이름 | HEX | 용도 |
|------|-----|------|
| Primary Red | `#FF6B6B` | 그라데이션 시작, CTA 버튼 |
| Orange | `#FF8E53` | 그라데이션 중간 |
| Yellow | `#FFD93D` | 그라데이션 끝 |

### 그라데이션

```css
/* 브랜드 그라데이션 (로고, CTA 버튼) */
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);

/* 텍스트 그라데이션 (Tailwind) */
bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D]

/* Hero 오버레이 그라데이션 */
background: linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%);

/* CTA 버튼 그라데이션 */
background: linear-gradient(to bottom right, #FF6B6B, #FF8E53);
```

### 텍스트 색상

| 이름 | 값 | 용도 |
|------|-----|------|
| White | `#FFFFFF` | 기본 텍스트 |
| White 85% | `rgba(255,255,255,0.85)` | 네비게이션 링크 |
| White 10% | `rgba(255,255,255,0.10)` | 보더 |

### 배경 색상

| 이름 | 값 | 용도 |
|------|-----|------|
| Transparent | `transparent` | Navbar 기본 배경 |
| Black 95% | `rgba(0,0,0,0.95)` | 모바일 메뉴 배경 |

---

## 2. 타이포그래피

### 폰트 패밀리

| 폰트 | CSS Variable | 용도 |
|------|--------------|------|
| **Indie Flower** | `--font-indie-flower` | 브랜드명, 제목, 부제목 (전체 UI) |
| Geist | `--font-geist-sans` | UI 텍스트 (필요시) |
| Geist Mono | `--font-geist-mono` | 코드 블록 (필요시) |
| Space Grotesk | - | Hero 섹션 (Google Fonts import) |

### 폰트 설정

```tsx
// app/layout.tsx
import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  weight: "400",
  subsets: ["latin"],
});
```

### 폰트 사용

```css
/* Indie Flower 적용 */
font-family: var(--font-indie-flower), cursive;

/* 인라인 스타일 예시 */
style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
```

### 폰트 크기

| 요소 | 크기 | 무게 |
|------|------|------|
| Hero 제목 | `clamp(2.2rem, 6vw, 4.5rem)` | 400 |
| Hero 부제목 | `clamp(1.1rem, 2vw, 1.4rem)` | 400 |
| 브랜드명 (Navbar) | `text-2xl` (1.5rem) | 400 |
| 브랜드명 (Hero 로고) | `clamp(1.75rem, 3vw, 2.25rem)` | 400 |
| 네비게이션 링크 | `text-sm` (0.875rem) | 500 (medium) |
| CTA 버튼 | `text-sm` (0.875rem) | 600 (semibold) |

---

## 3. 컴포넌트

### 3.1 Navbar

**위치**: `components/main/navbar/Navbar.tsx`

**특징**:
- Fixed 포지션 (상단 고정)
- 투명 배경
- 전체 너비 레이아웃

**레이아웃 구조**:
```
┌─────────────────────────────────────────────────────────────┐
│ [Brand]          [Features] [Pricing] [Contact]  [Get Started] │
│ (left)                    (center)                    (right)   │
└─────────────────────────────────────────────────────────────┘
```

**반응형**:
- Desktop (md 이상): 전체 레이아웃 표시
- Mobile (md 미만): 햄버거 메뉴

**CSS 클래스**:
```tsx
// 컨테이너
<nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent">
  <div className="w-full flex items-center justify-between">

// 브랜드명
<span className="text-2xl bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent">

// 네비게이션 링크
<Link className="text-white/85 hover:text-white no-underline text-sm font-medium transition-colors duration-200">

// CTA 버튼
<Link className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white text-sm font-semibold shadow-lg shadow-[#FF6B6B]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B6B]/40 transition-all duration-200">
```

### 3.2 AetherHero

**위치**: `components/main/hero/AetherHero.tsx`

**특징**:
- WebGL 셰이더 애니메이션 배경
- 오버레이 그라데이션
- 반응형 텍스트 크기

**Props**:
```tsx
type AetherHeroProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  children?: React.ReactNode;      // 제목 위 커스텀 콘텐츠
  bottomContent?: React.ReactNode; // CTA 아래 커스텀 콘텐츠
  align?: 'left' | 'center' | 'right';
  maxWidth?: number;               // 기본값: 960
  overlayGradient?: string;
  textColor?: string;              // 기본값: '#ffffff'
  fragmentSource?: string;         // 커스텀 셰이더
  dprMax?: number;                 // 기본값: 2
  clearColor?: [number, number, number, number];
  height?: string | number;        // 기본값: '100vh'
  className?: string;
};
```

**레이어 구조**:
```
┌─────────────────────────────────────┐
│ 1. Canvas (WebGL 셰이더 배경)        │
│ 2. Overlay (그라데이션)              │
│ 3. Content (텍스트, 버튼)            │
│    ├── children (로고)              │
│    ├── title (h1)                  │
│    ├── subtitle (p)                │
│    ├── CTA buttons                 │
│    └── bottomContent               │
└─────────────────────────────────────┘
```

---

## 4. 스타일링 방식

### Tailwind CSS (권장)

프로젝트 전반에서 Tailwind CSS를 사용합니다.

```tsx
// 예시: Navbar CTA 버튼
<Link className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white">
```

### 인라인 스타일

복잡한 스타일이나 동적 값에 사용합니다.

```tsx
// 예시: 커스텀 폰트 + clamp
<h1 style={{
  fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
  fontFamily: 'var(--font-indie-flower), cursive',
}}>
```

### CSS-in-JS (styled-jsx)

전역 스타일 주입에 사용합니다.

```tsx
<style jsx global>{`
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap');
`}</style>
```

---

## 5. 반응형 디자인

### 브레이크포인트 (Tailwind 기본값)

| 접두사 | 최소 너비 | 용도 |
|--------|----------|------|
| sm | 640px | 소형 태블릿 |
| md | 768px | 태블릿/데스크톱 전환점 |
| lg | 1024px | 데스크톱 |
| xl | 1280px | 대형 데스크톱 |

### 사용 예시

```tsx
// 모바일에서 숨기고 md 이상에서 표시
<div className="hidden md:flex">

// 모바일에서만 표시
<button className="md:hidden">
```

---

## 6. 애니메이션 & 트랜지션

### 호버 효과

```tsx
// 버튼 호버: 위로 이동 + 그림자 확대
className="hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200"

// 링크 호버: 색상 변경
className="text-white/85 hover:text-white transition-colors duration-200"
```

### 그림자 (Shadow)

```tsx
// CTA 버튼 그림자
className="shadow-lg shadow-[#FF6B6B]/30 hover:shadow-xl hover:shadow-[#FF6B6B]/40"
```

---

## 7. 아이콘

**원칙**: 외부 아이콘 라이브러리 사용 금지. 모든 아이콘은 인라인 SVG로 구현합니다.

### 햄버거 메뉴 아이콘

```tsx
// 열린 상태 (X)
<path d="M6 6L18 18M6 18L18 6" stroke="white" strokeWidth="2" strokeLinecap="round" />

// 닫힌 상태 (≡)
<path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
```

---

## 8. 파일 구조

```
nailart/
├── app/
│   ├── globals.css          # Tailwind 디렉티브
│   ├── layout.tsx           # 루트 레이아웃 (폰트, Navbar)
│   └── page.tsx             # 랜딩 페이지
├── components/
│   └── main/
│       ├── hero/
│       │   ├── AetherHero.tsx
│       │   └── index.ts
│       └── navbar/
│           ├── Navbar.tsx
│           └── index.ts
├── docs/
│   ├── DEVELOPMENT.md       # 개발 문서
│   └── DESIGN_SYSTEM.md     # 디자인 시스템 (현재 파일)
└── public/
    └── nailart_log.png      # 로고 이미지 (미사용)
```

---

## 9. 코드 컨벤션

### 컴포넌트 구조

```tsx
'use client';  // 클라이언트 컴포넌트일 경우

import React from 'react';

// 타입 정의
export type ComponentProps = {
  prop1?: string;
};

// 컴포넌트
export default function Component({ prop1 = 'default' }: ComponentProps) {
  return (
    <div>
      {/* content */}
    </div>
  );
}

// Named export (선택적)
export { Component };
```

### Export 패턴

```tsx
// components/main/hero/index.ts
export { default as AetherHero } from './AetherHero';
export type { AetherHeroProps } from './AetherHero';
```

---

## 10. 사용 예시

### 랜딩 페이지 Hero 섹션

```tsx
import { AetherHero } from '@/components/main/hero';

function NailartLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <span
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          fontFamily: 'var(--font-indie-flower), cursive',
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Nailart AI
      </span>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <AetherHero
        title="Create YouTube Thumbnails with AI"
        subtitle="Just enter your idea, and get click-worthy thumbnails instantly"
        ctaLabel="Get Started"
        ctaHref="#get-started"
        overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
      >
        <NailartLogo />
      </AetherHero>
    </main>
  );
}
```

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-02-08 | 디자인 시스템 문서 초기 작성 |
