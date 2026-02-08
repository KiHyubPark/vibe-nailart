# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nailart AI는 AI를 활용한 유튜브 썸네일 자동 생성 서비스입니다. Next.js 15 + TypeScript + Tailwind CSS 기반의 랜딩 페이지 프로젝트입니다.

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
- `components/main/` - 메인 UI 컴포넌트
  - `hero/` - AetherHero (WebGL 셰이더 배경 Hero 섹션)
  - `navbar/` - Navbar (반응형 네비게이션)
- `docs/` - 개발 문서 및 디자인 시스템 문서

### 핵심 컴포넌트

**AetherHero** (`components/main/hero/AetherHero.tsx`)
- WebGL2 기반 GLSL 셰이더 애니메이션 배경
- `children`, `bottomContent` props로 커스텀 콘텐츠 삽입
- `fragmentSource` prop으로 커스텀 셰이더 적용 가능

**Navbar** (`components/main/navbar/Navbar.tsx`)
- Fixed position, 투명 배경
- md 브레이크포인트 기준 반응형 (모바일: 햄버거 메뉴)

### 폰트

```tsx
// app/layout.tsx에서 설정
--font-indie-flower  // 브랜드명, 제목, 부제목
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

### 스타일링 규칙

- Tailwind CSS 사용 (권장)
- 아이콘: 외부 라이브러리 금지, 인라인 SVG만 사용
- 복잡한 스타일/동적 값: 인라인 스타일 사용

### Export 패턴

```tsx
// components/main/hero/index.ts
export { default as AetherHero } from './AetherHero';
export type { AetherHeroProps } from './AetherHero';
```

## 작업 가이드라인

- 작업 시작 전 `docs/DEVELOPMENT.md` 및 `docs/DESIGN_SYSTEM.md` 참고
- 새로운 작업 시 작업 계획을 먼저 작성 후 진행
- 컴포넌트 작성 시 `'use client'` 디렉티브 필요 여부 확인
