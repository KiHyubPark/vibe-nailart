'use client';

import Image from 'next/image';
import type { ThumbnailItem } from '@/hooks/useThumbnails';

interface SidebarItemProps {
  item: ThumbnailItem;
  isSelected: boolean;
  onClick: () => void;
}

export default function SidebarItem({ item, isSelected, onClick }: SidebarItemProps) {
  const date = new Date(item.createdAt);
  const timeLabel = formatRelativeDate(date);

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-xl p-2 transition-colors cursor-pointer group"
      style={{
        background: isSelected ? 'rgba(255,255,255,0.08)' : 'transparent',
        borderLeft: isSelected ? '3px solid #FF8E53' : '3px solid transparent',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
      }}
      onMouseLeave={(e) => {
        if (!isSelected) e.currentTarget.style.background = 'transparent';
      }}
    >
      {/* Thumbnail image — 16:9 */}
      <div className="relative w-full rounded-lg overflow-hidden bg-white/5" style={{ aspectRatio: '16 / 9' }}>
        <Image
          src={item.imageUrl}
          alt={item.prompt || 'Thumbnail'}
          fill
          className="object-cover"
          sizes="240px"
          unoptimized
        />
      </div>

      {/* Prompt text */}
      <p className="mt-1.5 text-xs text-white/50 truncate px-0.5">
        {item.prompt || 'No prompt'}
      </p>

      {/* Date */}
      <p className="text-[10px] text-white/30 px-0.5">
        {timeLabel}
      </p>
    </button>
  );
}

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffMin < 1) return '방금 전';
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHr < 24) return `${diffHr}시간 전`;
  if (diffDay < 7) return `${diffDay}일 전`;

  return date.toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' });
}
