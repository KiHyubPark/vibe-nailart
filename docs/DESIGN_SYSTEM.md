# Nailart AI - 디자인 시스템

## 1. 색상 팔레트

### 브랜드 그라데이션

| 이름 | HEX | 용도 |
|------|-----|------|
| Primary Red | `#FF6B6B` | 그라데이션 시작, CTA |
| Orange | `#FF8E53` | 그라데이션 중간 |
| Yellow | `#FFD93D` | 그라데이션 끝 |

```css
/* 브랜드 그라데이션 */
background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FFD93D 100%);
/* Tailwind */
bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D]
```

### 배경

| 이름 | 값 | 용도 |
|------|-----|------|
| App Background | `#0a0a0a` | 대시보드, 다크 배경 |
| Glass | `rgba(255, 255, 255, 0.05)` | 글래스모피즘 버튼 |
| Glass Dark | `rgba(30, 30, 30, 0.95)` | 팝오버 배경 |
| Mobile Menu | `rgba(0, 0, 0, 0.95)` | 모바일 메뉴 |

### 텍스트

| 이름 | 값 | 용도 |
|------|-----|------|
| White | `#FFFFFF` | 기본 텍스트 |
| White 90% | `rgba(255,255,255,0.9)` | 제목 |
| White 85% | `rgba(255,255,255,0.85)` | 링크 |
| White 60% | `rgba(255,255,255,0.6)` | 보조 텍스트, 아이콘 |
| White 40% | `rgba(255,255,255,0.4)` | 이메일 등 3차 텍스트 |
| White 10% | `rgba(255,255,255,0.1)` | 보더 |

---

## 2. 글래스모피즘

플로팅 버튼, 팝오버에 사용되는 공통 스타일.

```tsx
// 글래스모피즘 버튼
style={{
  background: 'rgba(255, 255, 255, 0.05)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
}}
className="backdrop-blur-xl rounded-2xl"

// 팝오버
style={{
  background: 'rgba(30, 30, 30, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)',
}}
className="rounded-2xl backdrop-blur-xl"
```

### 호버 팝오버 패턴

트리거와 팝오버 사이 간격은 `pt-2` (padding)으로 처리하여 호버 영역이 끊기지 않도록 함.

```tsx
<div onMouseEnter={...} onMouseLeave={...}>
  <button>트리거</button>
  <div className="absolute top-full right-0 pt-2">  {/* mt-2 아님! */}
    <div>팝오버 내용</div>
  </div>
</div>
```

---

## 3. 타이포그래피

### 폰트

| 폰트 | CSS Variable | 용도 |
|------|--------------|------|
| **Indie Flower** | `--font-indie-flower` | 브랜드명, 제목 |
| Geist | `--font-geist-sans` | UI 텍스트 |
| Geist Mono | `--font-geist-mono` | 코드 |

---

## 4. 컴포넌트 스타일

### Navbar

- Fixed position, 투명 배경
- Dashboard에서 숨김 (자체 플로팅 UI)
- 비로그인: Get Started (그라데이션 버튼)
- 로그인: 글래스모피즘 아바타 + 호버 팝오버

### PromptArea

- 다크 배경 (`#1e1e1e`) + rounded-[26px]
- BorderBeam 래퍼: 2px padding + overflow-hidden
- 도구 아이콘: 인라인 SVG
- 전송 버튼: 활성 시 브랜드 그라데이션

### BorderBeam

- conic-gradient 회전 방식
- Motion 라이브러리로 무한 회전 애니메이션
- 래퍼 패턴: 외부 div (overflow-hidden) → 회전 gradient → 내부 div (solid bg)

---

## 5. 반응형

| 접두사 | 최소 너비 | 용도 |
|--------|----------|------|
| md | 768px | 모바일/데스크톱 전환점 |
| lg | 1024px | 데스크톱 |

---

## 6. 규칙

- Tailwind CSS 우선 사용
- 아이콘: 인라인 SVG만 사용 (외부 라이브러리 금지)
- 동적 값, 복잡한 스타일: 인라인 스타일
- 호버 팝오버 간격: margin이 아닌 padding 사용
