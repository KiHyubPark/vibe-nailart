# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nailart AI는 AI를 활용한 유튜브 썸네일 자동 생성 서비스입니다. Next.js 16 + TypeScript + Tailwind CSS 4 + Supabase 기반 프로젝트입니다.

## Commands

```bash
npm run dev      # 개발 서버 실행 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
```

## Architecture

### 디렉토리 구조

- `app/` - Next.js App Router 페이지 및 레이아웃
  - `auth/` - Google OAuth 로그인 및 콜백
  - `dashboard/` - 대시보드 (프롬프트 입력)
- `components/main/` - 랜딩 페이지 UI 컴포넌트
  - `hero/` - AetherHero (WebGL 셰이더 배경 Hero 섹션)
  - `navbar/` - Navbar (반응형, 인증 상태별 UI)
- `components/dashboard/` - 대시보드 UI 컴포넌트
  - `PromptArea.tsx` - ChatGPT 스타일 프롬프트 입력
- `components/ui/` - 공통 UI 컴포넌트
  - `BorderBeam.tsx` - conic-gradient 애니메이션 보더
- `contexts/` - React Context (AuthContext)
- `lib/supabase/` - Supabase 클라이언트 (client.ts, server.ts)
- `docs/` - 개발 문서 및 디자인 시스템 문서

### 핵심 컴포넌트

**AetherHero** (`components/main/hero/AetherHero.tsx`)
- WebGL2 기반 GLSL 셰이더 애니메이션 배경
- `children`, `bottomContent` props로 커스텀 콘텐츠 삽입

**Navbar** (`components/main/navbar/Navbar.tsx`)
- Fixed position, 투명 배경, Dashboard에서 숨김
- 로그인: 글래스모피즘 아바타 + 호버 팝오버 / 비로그인: Get Started CTA

**PromptArea** (`components/dashboard/PromptArea.tsx`)
- Radix UI 기반 ChatGPT 스타일 프롬프트 입력
- BorderBeam 애니메이션 보더 래퍼

### 인증

- Supabase Google OAuth
- `useAuth()` hook: user, session, isLoading, signInWithGoogle, signOut
- 로그인 → /dashboard 리다이렉트, 미인증 시 /auth로 리다이렉트

### 데이터베이스

- `users` - 사용자 프로필 (auth.users FK)
- `thumbnails` - 썸네일 데이터 (image_path, prompt, status)
- Storage 버킷: `image` (사용자별 폴더 격리, RLS)

### 폰트

```tsx
// app/layout.tsx에서 설정
--font-indie-flower  // 브랜드명, 제목
--font-geist-sans    // UI 텍스트
--font-geist-mono    // 코드
```

## Design System

### 브랜드 그라데이션

```css
/* Primary: #FF6B6B → #FF8E53 → #FFD93D */
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);
/* Tailwind */
bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D]
```

### 글래스모피즘 (대시보드, 팝오버)

```tsx
background: 'rgba(255, 255, 255, 0.05)'
boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)'
className="backdrop-blur-xl rounded-2xl"
```

### 스타일링 규칙

- Tailwind CSS 사용 (권장)
- 아이콘: 외부 라이브러리 금지, 인라인 SVG만 사용
- 복잡한 스타일/동적 값: 인라인 스타일 사용
- 호버 팝오버 간격: margin이 아닌 padding 사용 (호버 영역 유지)

### Export 패턴

```tsx
// components/main/hero/index.ts
export { default as AetherHero } from './AetherHero';
export type { AetherHeroProps } from './AetherHero';
```

## 작업 가이드라인

- 새로운 작업 시 `docs/DEVELOPMENT.md` 및 `docs/DESIGN_SYSTEM.md` 참고
- 작업 시작 전 작업 계획을 먼저 문서로 작성 후 승인받고 진행
- 컴포넌트 작성 시 `'use client'` 디렉티브 필요 여부 확인
