'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PromptArea from '@/components/dashboard/PromptArea';

export default function DashboardPage() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [profileHover, setProfileHover] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white/50">Loading...</div>
      </div>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url;
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6">
      {/* Floating Logo — top left */}
      <div className="fixed top-6 left-6 z-50">
        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2.5 rounded-2xl no-underline backdrop-blur-xl transition-all duration-200 hover:shadow-xl hover:shadow-black/30"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <span
            className="text-xl bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
          >
            Nailart AI
          </span>
        </Link>
      </div>

      {/* Floating Profile — top right */}
      <div className="fixed top-6 right-6 z-50">
        <div
          className="relative"
          onMouseEnter={() => setProfileHover(true)}
          onMouseLeave={() => setProfileHover(false)}
        >
          {/* Avatar button */}
          <button
            className="flex items-center justify-center rounded-2xl backdrop-blur-xl transition-all duration-200 cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-black/30"
            style={{
              width: 44,
              height: 44,
              background: 'rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
            }}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Profile"
                width={44}
                height={44}
                className="rounded-2xl"
              />
            ) : (
              <span className="text-white/60 text-sm font-semibold">
                {displayName.charAt(0).toUpperCase()}
              </span>
            )}
          </button>

          {/* Hover popover — pt-2 bridges the gap so hover doesn't break */}
          <div
            className="absolute top-full right-0 pt-2 transition-all duration-200 origin-top-right"
            style={{
              opacity: profileHover ? 1 : 0,
              transform: profileHover ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(-4px)',
              pointerEvents: profileHover ? 'auto' : 'none',
            }}
          >
            <div
              className="rounded-2xl backdrop-blur-xl p-3 min-w-[180px]"
              style={{
                background: 'rgba(30, 30, 30, 0.95)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)',
              }}
            >
              {/* User info */}
              <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={36}
                    height={36}
                    className="rounded-xl"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 text-sm font-semibold">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-white text-sm font-medium truncate">{displayName}</p>
                  <p className="text-white/40 text-xs truncate">{user.email}</p>
                </div>
              </div>

              {/* Sign out */}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 mt-2 px-2 py-2 rounded-xl text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Center content */}
      <div className="w-full max-w-2xl flex flex-col items-center gap-8">
        <h1
          className="text-3xl md:text-4xl text-white/90 text-center"
          style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
        >
          What thumbnail shall we create?
        </h1>
        <PromptArea />
      </div>
    </div>
  );
}
