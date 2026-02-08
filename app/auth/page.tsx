'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AetherHero } from '@/components/main/hero';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthPage() {
  const { user, isLoading, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      router.push('/');
    }
  }, [user, isLoading, router]);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setError(null);

    try {
      await signInWithGoogle();
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
      setIsSigningIn(false);
    }
  };

  if (isLoading || user) {
    return (
      <main className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10">
          <AetherHero
            title=""
            subtitle=""
            ctaLabel=""
            height="100%"
            overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.85) 100%)"
          />
        </div>
        <div className="text-white/70">Loading...</div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen">
      {/* 배경: AetherHero */}
      <div className="absolute inset-0 -z-10">
        <AetherHero
          title=""
          subtitle=""
          ctaLabel=""
          height="100%"
          overlayGradient="linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.8) 100%)"
        />
      </div>

      {/* 3:2 Split Layout */}
      <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center pt-20 lg:pt-0 gap-6 lg:gap-12 px-6 lg:px-12">
        {/* Left: YouTube Video */}
        <div className="w-full max-w-2xl flex items-center justify-center">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <iframe
              src="https://www.youtube.com/embed/mhVgh640FUw?autoplay=0&rel=0"
              title="Nailart AI Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>
        </div>

        {/* Right: Login Card */}
        <div className="flex items-center justify-center">
          <div
            className="w-full max-w-sm p-8 rounded-2xl backdrop-blur-xl text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.4)',
            }}
          >
            {/* Logo */}
            <Link href="/" className="inline-block no-underline mb-6">
              <span
                className="text-3xl bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
              >
                Nailart AI
              </span>
            </Link>

            {/* Welcome Message */}
            <p
              className="text-white/70 text-lg mb-8"
              style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
            >
              Sign in to create amazing thumbnails
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSigningIn}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white text-gray-700 font-semibold shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSigningIn ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </>
              )}
            </button>

            {/* Terms */}
            <p className="mt-6 text-white/40 text-xs leading-relaxed">
              By continuing, you agree to our{' '}
              <Link href="#" className="text-white/60 hover:text-white/80 no-underline transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="#" className="text-white/60 hover:text-white/80 no-underline transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
