import Image from 'next/image';
import { AetherHero } from '@/components/main/hero';

function NailartLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
      <Image
        src="/nailart_log.png"
        alt="Nailart AI Logo"
        width={48}
        height={48}
        className="rounded-lg"
      />
      <span
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
          fontFamily: 'var(--font-indie-flower), cursive',
          fontWeight: 400,
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
        title="AI로 만드는 유튜브 썸네일"
        subtitle="아이디어만 입력하면 클릭을 부르는 썸네일이 완성됩니다"
        ctaLabel="무료로 시작하기"
        ctaHref="#get-started"
        overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
      >
        <NailartLogo />
      </AetherHero>
    </main>
  );
}
