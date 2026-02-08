# Nailart AI - 개발 문서

## 프로젝트 개요

**Nailart AI**는 AI를 활용한 유튜브 썸네일 자동 생성 서비스입니다.

- **기술 스택**: Next.js 15, TypeScript, Tailwind CSS
- **목표**: 디자인 경험 없이도 전문가 수준의 유튜브 썸네일을 생성

---

## 프로젝트 구조

```
nailart/
├── app/
│   ├── globals.css          # 전역 스타일
│   ├── layout.tsx           # 루트 레이아웃 (Navbar 포함)
│   ├── page.tsx             # 랜딩 페이지
│   └── favicon.ico
├── components/
│   └── main/
│       ├── hero/
│       │   ├── AetherHero.tsx   # WebGL 셰이더 Hero 컴포넌트
│       │   └── index.ts
│       └── navbar/
│           ├── Navbar.tsx       # 네비게이션 바 컴포넌트
│           └── index.ts
├── public/
│   └── logo.png             # 로고 이미지
├── docs/
│   └── DEVELOPMENT.md       # 개발 문서 (현재 파일)
└── ...config files
```

---

## 컴포넌트 상세

### 1. AetherHero (`components/main/hero/AetherHero.tsx`)

WebGL 기반 애니메이션 배경을 가진 Hero 섹션 컴포넌트입니다.

#### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `title` | string | - | 메인 제목 |
| `subtitle` | string | - | 부제목 |
| `ctaLabel` | string | - | 기본 CTA 버튼 텍스트 |
| `ctaHref` | string | - | 기본 CTA 링크 |
| `secondaryCtaLabel` | string | - | 보조 CTA 버튼 텍스트 |
| `secondaryCtaHref` | string | - | 보조 CTA 링크 |
| `children` | ReactNode | - | 제목 위에 표시될 커스텀 콘텐츠 |
| `bottomContent` | ReactNode | - | CTA 버튼 아래 커스텀 콘텐츠 |
| `align` | 'left' \| 'center' \| 'right' | 'center' | 콘텐츠 정렬 |
| `maxWidth` | number | 960 | 텍스트 컨테이너 최대 너비 (px) |
| `overlayGradient` | string | - | 오버레이 그라데이션 |
| `textColor` | string | '#ffffff' | 텍스트 색상 |
| `fragmentSource` | string | - | 커스텀 프래그먼트 셰이더 |
| `dprMax` | number | 2 | 최대 DPR |
| `clearColor` | [number, number, number, number] | [0,0,0,1] | 배경 클리어 색상 |
| `height` | string \| number | '100vh' | 섹션 높이 |
| `className` | string | - | 추가 CSS 클래스 |

#### 사용 예시

```tsx
<AetherHero
  title="유튜브 썸네일, AI가 대신 만들어 드립니다"
  subtitle="아이디어만 입력하세요."
  ctaLabel="무료로 시작하기"
  ctaHref="#get-started"
  bottomContent={<FeatureBadges />}
>
  <Logo />
</AetherHero>
```

---

### 2. Navbar (`components/main/navbar/Navbar.tsx`)

반응형 네비게이션 바 컴포넌트입니다.

#### Props

| Prop | Type | Default | 설명 |
|------|------|---------|------|
| `logoSrc` | string | '/logo.png' | 로고 이미지 경로 |
| `brandName` | string | 'Nailart AI' | 브랜드명 |
| `transparent` | boolean | true | 투명 배경 여부 |

#### 구조

- **왼쪽**: 로고 이미지 + 브랜드명 (그라데이션 텍스트)
- **중앙**: Features, Pricing, Contact 링크
- **오른쪽**: Get Started CTA 버튼

#### 반응형

- **Desktop (> 768px)**: 전체 레이아웃 표시
- **Mobile (≤ 768px)**: 햄버거 메뉴로 전환

---

## 랜딩 페이지 구성 (`app/page.tsx`)

### 현재 구현된 섹션

1. **Hero Section** (간결한 디자인)
   - NailartLogo: SVG 로고 + 브랜드명 (Indie Flower 폰트)
   - 제목: "AI로 만드는 유튜브 썸네일"
   - 부제목: "아이디어만 입력하면 클릭을 부르는 썸네일이 완성됩니다"
   - CTA 버튼: "무료로 시작하기"

### 커스텀 SVG 컴포넌트

#### NailartLogo
- 썸네일 프레임 (16:9 비율)
- 재생 버튼 삼각형
- AI 스파클 이펙트
- 그라데이션: #FF6B6B → #FF8E53 → #FFD93D

#### ThumbnailPreview
- 3개의 썸네일 카드
- 부채꼴 배치 (회전 + Y축 이동)
- 반투명 배경 + blur 효과

#### FeatureBadges
- 3개의 기능 배지
- 체크 아이콘 (SVG)
- 알약 모양 버튼 스타일

---

## 디자인 시스템

### 색상 팔레트

| 이름 | HEX | 용도 |
|------|-----|------|
| Primary Red | #FF6B6B | 메인 액센트, CTA |
| Orange | #FF8E53 | 그라데이션 중간 |
| Yellow | #FFD93D | 그라데이션 끝 |
| Success Green | #4ADE80 | 체크 아이콘 |
| Text White | #FFFFFF | 기본 텍스트 |
| Text Muted | rgba(255,255,255,0.85) | 보조 텍스트 |

### 그라데이션

```css
/* Primary Gradient */
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);

/* Overlay Gradient */
background: linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%);
```

### 타이포그래피

- **Indie Flower**: 브랜드명 (Nailart AI)
- **Space Grotesk**: Hero 제목/부제목
- **Geist**: 기본 UI 텍스트
- **Title**: clamp(2.2rem, 6vw, 4.5rem), weight 700
- **Subtitle**: clamp(1rem, 2vw, 1.25rem), weight 400
- **Button**: 0.95rem, weight 600

---

## 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 빌드
npm run build

# 프로덕션 서버 실행
npm run start

# 린트 검사
npm run lint
```

---

## 향후 구현 예정

- [ ] Features 섹션
- [ ] Pricing 섹션
- [ ] Contact 섹션
- [ ] 썸네일 생성 UI
- [ ] AI API 연동
- [ ] 사용자 인증
- [ ] 결제 시스템

---

## 변경 이력

| 날짜 | 변경 내용 |
|------|----------|
| 2026-02-08 | 프로젝트 초기 설정 (Next.js 15) |
| 2026-02-08 | AetherHero 컴포넌트 구현 (WebGL 셰이더 배경) |
| 2026-02-08 | 랜딩 페이지 Hero 섹션 구현 (로고, 배지, 썸네일 프리뷰) |
| 2026-02-08 | Navbar 컴포넌트 구현 (반응형, 모바일 메뉴) |
| 2026-02-08 | Indie Flower 폰트 적용 (브랜드명) |
| 2026-02-08 | Hero 섹션 간결화 (불필요한 요소 제거) |
