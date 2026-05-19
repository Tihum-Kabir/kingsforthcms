import { useState, useEffect } from 'react';

const PAYLOAD_URL = (import.meta as { env?: { VITE_PAYLOAD_URL?: string } }).env?.VITE_PAYLOAD_URL ?? 'http://localhost:3000';

export interface PayloadGalleryImage {
  url: string;
  caption?: string;
}

export interface PayloadPlan {
  name: 'Plus' | 'Pro' | 'Enterprise';
  monthlyPrice: number;
  discountPercent: number;
  tagline: string;
  badge?: string;
  isRecommended: boolean;
  planFeatures: { feature: string }[];
  ctaLabel: string;
}

export interface PayloadMediaData {
  heroImageUrl: string | null;
  heroVideoUrl: string | null;
  galleryImages: PayloadGalleryImage[];
  plans: PayloadPlan[] | null;
}

export function usePayloadMedia(
  collection: 'services' | 'solutions',
  slug: string,
): { data: PayloadMediaData | null; loading: boolean } {
  const [data, setData] = useState<PayloadMediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const res = await fetch(
          `${PAYLOAD_URL}/api/${collection}?where[slug][equals]=${encodeURIComponent(slug)}&depth=1&limit=1`,
        );
        if (!res.ok) throw new Error('not found');
        const json = await res.json();
        const doc = json.docs?.[0];

        if (!doc || cancelled) return;

        const heroImageUrl =
          doc.heroImage?.url ? `${PAYLOAD_URL}${doc.heroImage.url}` : null;

        const galleryImages: PayloadGalleryImage[] = (doc.galleryImages ?? [])
          .map((g: { image?: { url?: string }; caption?: string }) => ({
            url: g.image?.url ? `${PAYLOAD_URL}${g.image.url}` : null,
            caption: g.caption,
          }))
          .filter((g: { url: string | null }) => Boolean(g.url));

        setData({
          heroImageUrl,
          heroVideoUrl: doc.heroVideoUrl ?? null,
          galleryImages,
          plans: doc.plans ?? null,
        });
      } catch {
        // Payload not running or no record — silently show static content only
        setData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => { cancelled = true; };
  }, [collection, slug]);

  return { data, loading };
}

export function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([^&\s?]+)/,
  );
  return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : null;
}
