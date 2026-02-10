'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface ThumbnailItem {
  id: string;
  imageUrl: string;
  imagePath: string;
  prompt: string | null;
  createdAt: string;
}

export function useThumbnails() {
  const { user } = useAuth();
  const [thumbnails, setThumbnails] = useState<ThumbnailItem[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;
    const supabase = createClient();

    async function fetchThumbnails() {
      const { data, error } = await supabase
        .from('thumbnails')
        .select('id, image_path, prompt, created_at')
        .eq('status', 'completed')
        .order('created_at', { ascending: false })
        .limit(50);

      if (cancelled) return;

      if (error) {
        console.error('Failed to fetch thumbnails:', error);
        setHasFetched(true);
        return;
      }

      const items: ThumbnailItem[] = (data || []).map((row) => {
        const { data: urlData } = supabase.storage
          .from('image')
          .getPublicUrl(row.image_path);

        return {
          id: row.id,
          imageUrl: urlData.publicUrl,
          imagePath: row.image_path,
          prompt: row.prompt,
          createdAt: row.created_at,
        };
      });

      setThumbnails(items);
      setHasFetched(true);
    }

    fetchThumbnails();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const prependThumbnail = useCallback(
    (item: ThumbnailItem) => {
      setThumbnails((prev) => [item, ...prev]);
    },
    [],
  );

  const isLoading = !user ? false : !hasFetched;
  const effectiveThumbnails = !user ? [] : thumbnails;

  return { thumbnails: effectiveThumbnails, isLoading, prependThumbnail };
}
