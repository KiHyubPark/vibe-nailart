# Nailart AI

AI를 활용한 유튜브 썸네일 자동 생성 서비스입니다.

> 참고 영상: [https://www.youtube.com/watch?v=mhVgh640FUw](https://www.youtube.com/watch?v=mhVgh640FUw)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Auth**: Supabase (Google OAuth)
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **Animation**: Motion (Framer Motion)
- **UI**: Radix UI Primitives

## Getting Started

```bash
npm install
npm run dev
```

## Project Structure

```
app/
├── page.tsx                    # 랜딩 페이지
├── auth/
│   ├── page.tsx                # Google OAuth 로그인
│   └── callback/route.ts       # OAuth 콜백
├── dashboard/
│   └── page.tsx                # 대시보드 (프롬프트 입력)
└── layout.tsx                  # 루트 레이아웃

components/
├── main/
│   ├── hero/AetherHero.tsx     # WebGL 셰이더 Hero
│   └── navbar/Navbar.tsx       # 반응형 네비게이션
├── dashboard/
│   └── PromptArea.tsx          # 프롬프트 입력 영역
└── ui/
    └── BorderBeam.tsx          # 애니메이션 보더 이펙트

contexts/
└── AuthContext.tsx              # Supabase Auth 컨텍스트
```

## Features

- WebGL 셰이더 애니메이션 랜딩 페이지
- Google OAuth 인증
- 글래스모피즘 스타일 대시보드 UI
- ChatGPT 스타일 프롬프트 입력
- 애니메이션 BorderBeam 이펙트
- 반응형 디자인 (모바일/데스크톱)

## Database

- **users**: 사용자 프로필 (auth.users 연동)
- **thumbnails**: 썸네일 데이터 (prompt, image_path, status)
- **Storage bucket**: `image` (사용자별 폴더 격리)

