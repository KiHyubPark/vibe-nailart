'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export type NavbarProps = {
  logoSrc?: string;
  brandName?: string;
};

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({
  logoSrc = '/nailart_log.png',
  brandName = 'Nailart AI',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-transparent">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src={logoSrc}
            alt={`${brandName} Logo`}
            width={36}
            height={36}
            className="rounded-lg"
          />
          <span
            className="text-xl font-bold bg-gradient-to-r from-[#FF6B6B] via-[#FF8E53] to-[#FFD93D] bg-clip-text text-transparent"
          >
            {brandName}
          </span>
        </Link>

        {/* Center: Nav Links (Desktop) */}
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

        {/* Right: CTA Button (Desktop) + Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <Link
            href="#get-started"
            className="hidden md:block px-5 py-2.5 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white no-underline text-sm font-semibold shadow-lg shadow-[#FF6B6B]/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#FF6B6B]/40 transition-all duration-200"
          >
            Get Started
          </Link>

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-white/85 no-underline text-base font-medium py-2"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#get-started"
            onClick={() => setMobileMenuOpen(false)}
            className="px-5 py-3 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] text-white no-underline text-sm font-semibold text-center mt-2"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}

export { Navbar };
