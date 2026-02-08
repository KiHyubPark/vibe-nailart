import { AetherHero } from '@/components/main/hero';

function NailartLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4">
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
        title="Create YouTube Thumbnails with AI"
        subtitle="Just enter your idea, and get click-worthy thumbnails instantly"
        ctaLabel="Get Started"
        ctaHref="/auth"
        overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)"
      >
        <NailartLogo />
      </AetherHero>
    </main>
  );
}
