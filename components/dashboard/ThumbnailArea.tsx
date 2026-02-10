'use client';

import Image from 'next/image';
import BoxLoader from '@/components/ui/box-loader';

interface GeneratedResult {
  imageUrl: string;
  text?: string;
}

interface ThumbnailAreaProps {
  generatedImage: GeneratedResult | null;
  isGenerating: boolean;
}

export default function ThumbnailArea({ generatedImage, isGenerating }: ThumbnailAreaProps) {
  if (!generatedImage && !isGenerating) return null;

  return (
    <div className="w-full">
      {isGenerating && !generatedImage ? (
        /* Loading — 3D box loader (16:9) */
        <div className="relative w-full rounded-2xl overflow-hidden bg-white/5" style={{ aspectRatio: '16 / 9' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <BoxLoader />
            <p className="text-white/40 text-sm">썸네일 생성 중...</p>
          </div>
        </div>
      ) : generatedImage ? (
        <div>
          {/* 16:9 컨테이너 — 원본 비율 유지, 여백은 어두운 배경 */}
          <div className="relative w-full rounded-2xl overflow-hidden group bg-black/40" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src={generatedImage.imageUrl}
              alt="Generated thumbnail"
              fill
              className="object-contain rounded-2xl"
              unoptimized
            />
            {/* Overlay with download button */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-end p-4 opacity-0 group-hover:opacity-100">
              <a
                href={generatedImage.imageUrl}
                download="thumbnail.png"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: 'rgba(0,0,0,0.6)',
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
          {generatedImage.text && (
            <div className="mt-3 px-1">
              <p className="text-white/50 text-sm">{generatedImage.text}</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
