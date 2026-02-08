# Nailart AI - 개발 문서

## 프로젝트 개요

**Nailart AI**는 AI를 활용한 유튜브 썸네일 자동 생성 서비스입니다.

- **기술 스택**: Next.js 16, TypeScript, Tailwind CSS 4, Supabase, Motion
- **목표**: 디자인 경험 없이도 전문가 수준의 유튜브 썸네일을 생성

---

## 프로젝트 구조

```
nailart/
├── app/
│   ├── globals.css              # 전역 스타일
│   ├── layout.tsx               # 루트 레이아웃 (폰트, AuthProvider, Navbar)
│   ├── page.tsx                 # 랜딩 페이지 (auth 상태별 CTA 분기)
│   ├── auth/
│   │   ├── page.tsx             # Google OAuth 로그인 페이지
│   │   └── callback/route.ts    # OAuth 콜백 핸들러
│   └── dashboard/
│       └── page.tsx             # 대시보드 페이지
├── components/
│   ├── main/
│   │   ├── hero/
│   │   │   ├── AetherHero.tsx   # WebGL 셰이더 Hero 컴포넌트
│   │   │   └── index.ts
│   │   └── navbar/
│   │       ├── Navbar.tsx       # 반응형 네비게이션 (auth-aware)
│   │       └── index.ts
│   ├── dashboard/
│   │   └── PromptArea.tsx       # ChatGPT 스타일 프롬프트 입력
│   └── ui/
│       └── BorderBeam.tsx       # 애니메이션 보더 이펙트
├── contexts/
│   └── AuthContext.tsx           # Supabase Auth 컨텍스트
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # 브라우저 Supabase 클라이언트
│   │   └── server.ts            # 서버 Supabase 클라이언트
├── docs/
│   ├── DEVELOPMENT.md           # 개발 문서 (현재 파일)
│   └── DESIGN_SYSTEM.md         # 디자인 시스템
└── ...config files
```

---

## 인증 시스템

### 플로우

1. 비로그인 → 랜딩 CTA "Get Started" → `/auth`
2. `/auth` → Google OAuth 로그인 → `/auth/callback`
3. 콜백 → `/dashboard`로 리다이렉트
4. 로그인 상태에서 랜딩 CTA → "Go to Dashboard" → `/dashboard`
5. `/dashboard` 직접 접근 (비로그인) → `/auth`로 리다이렉트

### AuthContext (`contexts/AuthContext.tsx`)

```tsx
const { user, session, isLoading, signInWithGoogle, signOut } = useAuth();
```

- `user`: Supabase User 객체 (user_metadata에 Google 프로필 포함)
- `signInWithGoogle()`: Google OAuth 시작
- `signOut()`: 로그아웃 후 랜딩으로 이동

---

## 컴포넌트 상세

### Dashboard (`app/dashboard/page.tsx`)

- **플로팅 로고** (좌상단): 글래스모피즘 스타일, 홈으로 링크
- **플로팅 프로필** (우상단): 아바타 버튼, 호버 시 팝오버 (사용자 정보 + Sign out)
- **중앙**: 제목 + PromptArea

### PromptArea (`components/dashboard/PromptArea.tsx`)

ChatGPT 스타일 프롬프트 입력 영역.

- Radix UI Tooltip, Popover, Dialog 사용
- 이미지 업로드 (드래그 앤 드롭, 클릭)
- 도구 메뉴: 이미지 생성, 참고 이미지 검색, 스타일 선택, 이미지에서 시작, 상세 분석
- Enter로 전송, Shift+Enter로 줄바꿈
- BorderBeam 애니메이션 보더

### BorderBeam (`components/ui/BorderBeam.tsx`)

conic-gradient 회전 방식의 애니메이션 보더 이펙트.

```tsx
<BorderBeam duration={6} colorFrom="#FF6B6B" colorTo="#FF8E53" arcLength={30} />
```

| Prop | Default | 설명 |
|------|---------|------|
| `duration` | 6 | 회전 주기 (초) |
| `delay` | 0 | 시작 지연 |
| `colorFrom` | '#ffaa40' | 시작 색상 |
| `colorTo` | '#9c40ff' | 끝 색상 |
| `reverse` | false | 역방향 회전 |
| `arcLength` | 30 | 빛줄기 길이 (%) |

### Navbar (`components/main/navbar/Navbar.tsx`)

- Dashboard에서는 숨김 (자체 플로팅 UI 사용)
- **비로그인**: Get Started CTA
- **로그인**: 글래스모피즘 아바타 + 호버 팝오버 (Dashboard 링크, Sign out)
- **Auth 페이지**: BACK 버튼 (항상 랜딩으로 이동)
- 모바일: 햄버거 메뉴 (auth 상태별 분기)

### AetherHero (`components/main/hero/AetherHero.tsx`)

WebGL2 GLSL 셰이더 애니메이션 배경 Hero 섹션.

---

## 데이터베이스

### users 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK, FK→auth.users) | 사용자 ID |
| email | text | 이메일 |
| full_name | text | 이름 |
| avatar_url | text | 프로필 이미지 URL |
| created_at | timestamptz | 생성일 |
| updated_at | timestamptz | 수정일 |

### thumbnails 테이블

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | uuid (PK) | 썸네일 ID |
| user_id | uuid (FK→users) | 사용자 ID |
| image_path | text | 스토리지 파일 경로 |
| prompt | text | 프롬프트 |
| status | text | pending/generating/completed/failed |
| created_at | timestamptz | 생성일 |
| updated_at | timestamptz | 수정일 (자동 갱신) |

### Storage

- 버킷: `image` (비공개)
- 경로 구조: `{user_id}/{파일명}`
- RLS: 사용자별 폴더 격리

---

## 개발 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint 검사
```
