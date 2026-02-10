'use client';

import type { ThumbnailItem } from '@/hooks/useThumbnails';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  thumbnails: ThumbnailItem[];
  isLoading: boolean;
  selectedId: string | null;
  onSelect: (item: ThumbnailItem) => void;
}

export default function Sidebar({
  thumbnails,
  isLoading,
  selectedId,
  onSelect,
}: SidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 h-screen z-40 flex flex-col rounded-r-2xl"
      style={{
        width: 288,
        background: 'rgba(28, 28, 28, 0.97)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
      }}
    >
      {/* Scrollable content */}
      <div
        className="flex-1 overflow-y-auto px-3 space-y-1 pt-20 pb-3"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
        }}
      >
        {isLoading ? (
          <SkeletonCards />
        ) : thumbnails.length === 0 ? (
          <EmptyState />
        ) : (
          thumbnails.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onClick={() => onSelect(item)}
            />
          ))
        )}
      </div>
    </aside>
  );
}

function SkeletonCards() {
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="p-2 space-y-2 animate-pulse">
          <div
            className="w-full rounded-lg bg-white/5"
            style={{ aspectRatio: '16 / 9' }}
          />
          <div className="h-3 w-3/4 rounded bg-white/5" />
          <div className="h-2.5 w-1/3 rounded bg-white/5" />
        </div>
      ))}
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white/10 mb-3"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p className="text-white/25 text-sm">
        생성된 썸네일이<br />여기에 표시됩니다
      </p>
    </div>
  );
}
