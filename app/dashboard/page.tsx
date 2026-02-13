'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import PromptArea from '@/components/dashboard/PromptArea';
import ThumbnailArea from '@/components/dashboard/ThumbnailArea';
import { Sidebar } from '@/components/dashboard/sidebar';
import { useThumbnails, type ThumbnailItem } from '@/hooks/useThumbnails';
interface GeneratedResult {
  imageUrl: string;
  text?: string;
}

export default function DashboardPage() {
  const { user, isLoading, signOut } = useAuth();
  const router = useRouter();
  const [profileHover, setProfileHover] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Sidebar state
  const { thumbnails, isLoading: thumbnailsLoading, prependThumbnail } = useThumbnails();
  const [selectedThumbnailId, setSelectedThumbnailId] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<ThumbnailItem | null>(null);

  const handleGenerated = useCallback(
    (result: { imageUrl: string; text?: string; thumbnailId?: string; prompt?: string }) => {
      setGeneratedImage({ imageUrl: result.imageUrl, text: result.text });
      setSelectedThumbnailId(result.thumbnailId || null);

      if (result.thumbnailId) {
        prependThumbnail({
          id: result.thumbnailId,
          imageUrl: result.imageUrl,
          imagePath: '',
          prompt: result.prompt || null,
          createdAt: new Date().toISOString(),
        });
      }
    },
    [prependThumbnail],
  );

  const handleSidebarSelect = useCallback((item: ThumbnailItem) => {
    setModalImage(item);
    setSelectedThumbnailId(item.id);
  }, []);

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
    <div
      className="min-h-screen bg-[#0a0a0a]"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      {/* Sidebar */}
      <Sidebar
        thumbnails={thumbnails}
        isLoading={thumbnailsLoading}
        selectedId={selectedThumbnailId}
        onSelect={handleSidebarSelect}
      />

      {/* Main content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        {/* Floating Logo */}
        <div className="fixed top-6 left-0 w-[288px] flex justify-center z-50">
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
          <ThumbnailArea generatedImage={generatedImage} isGenerating={isGenerating} />

          {!generatedImage && !isGenerating && (
            <h1
              className="text-3xl md:text-4xl text-white/90 text-center"
              style={{ fontFamily: 'var(--font-indie-flower), cursive' }}
            >
              What thumbnail shall we create?
            </h1>
          )}
          <PromptArea
            onGenerated={handleGenerated}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
        </div>
      </div>

      {/* Image Preview Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6"
          onClick={() => setModalImage(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative z-10 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image container */}
            <div
              className="relative rounded-2xl overflow-hidden bg-black/40"
              style={{ aspectRatio: '16 / 9' }}
            >
              <Image
                src={modalImage.imageUrl}
                alt={modalImage.prompt || 'Thumbnail'}
                fill
                className="object-contain rounded-2xl"
                unoptimized
              />
              {/* Close button */}
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-xl transition-all cursor-pointer hover:scale-110"
                style={{
                  background: 'rgba(0, 0, 0, 0.5)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Download button */}
            <div className="mt-4 flex justify-center">
              <a
                href={modalImage.imageUrl}
                download="thumbnail.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-white text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                다운로드
              </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
