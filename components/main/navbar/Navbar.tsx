'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export type NavbarProps = {
  brandName?: string;
};

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({
  brandName = 'Nailart AI',
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileHover, setProfileHover] = useState(false);

  const isAuthPage = pathname?.startsWith('/auth');
  const isDashboard = pathname?.startsWith('/dashboard');
  const isLoggedIn = !isLoading && !!user;

  const avatarUrl = user?.user_metadata?.avatar_url;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  // Dashboard has its own floating UI
  if (isDashboard) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent">
      <div className="w-full flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span
            className="text-2xl bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent"
            style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
          >
            {brandName}
          </span>
        </Link>

        {/* Center: Nav Links (Desktop) — 랜딩 페이지에서만 표시 */}
        {!isDashboard && !isAuthPage && (
          <div className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/85 hover:text-white no-underline text-sm font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}

        {/* Right: Auth-aware actions */}
        <div className="flex items-center gap-4">
          {isAuthPage ? (
            <button
              onClick={() => router.push('/')}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-white border border-white/20 text-sm font-semibold hover:bg-white/20 transition-all duration-200 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              BACK
            </button>
          ) : isLoggedIn ? (
            <div
              className="hidden md:block relative"
              onMouseEnter={() => setProfileHover(true)}
              onMouseLeave={() => setProfileHover(false)}
            >
              <button
                className="flex items-center justify-center rounded-2xl backdrop-blur-xl transition-all duration-200 cursor-pointer overflow-hidden hover:shadow-xl hover:shadow-black/30"
                style={{
                  width: 40,
                  height: 40,
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.08)',
                }}
              >
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-2xl"
                  />
                ) : (
                  <span className="text-white/60 text-sm font-semibold">
                    {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                  </span>
                )}
              </button>

              {/* Hover popover */}
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
                  <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="Profile" width={36} height={36} className="rounded-xl" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white/60 text-sm font-semibold">
                        {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">{user.user_metadata?.full_name || user.email?.split('@')[0]}</p>
                      <p className="text-white/40 text-xs truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    className="w-full flex items-center gap-2 mt-2 px-2 py-2 rounded-xl text-white/60 text-sm no-underline hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-2 py-2 rounded-xl text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
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
          ) : (
            <Link
              href="/auth"
              className="hidden md:block px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white no-underline text-sm font-semibold shadow-lg shadow-[#FF6B6B]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B6B]/40 transition-all duration-200"
            >
              Get Started
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden bg-transparent border-none cursor-pointer p-2"
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              {mobileMenuOpen ? (
                <path
                  d="M6 6L18 18M6 18L18 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 border-b border-white/10 md:hidden">
          {!isDashboard && !isAuthPage && navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/85 no-underline text-base font-medium py-2"
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/85 no-underline text-base font-medium py-2"
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleSignOut();
                }}
                className="px-5 py-3 rounded-xl bg-white/10 text-white/70 text-sm font-semibold text-center mt-2 border border-white/10 cursor-pointer"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white no-underline text-sm font-semibold text-center mt-2"
            >
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export { Navbar };
