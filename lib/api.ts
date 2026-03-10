/**
 * API config – same backend as anime-world website.
 * Override with EXPO_PUBLIC_HIANIME_API_URL in .env
 */
export const HIANIME_API_URL =
  process.env.EXPO_PUBLIC_HIANIME_API_URL || 'http://localhost:4000';

export const API_ENDPOINTS = {
  health: `${HIANIME_API_URL}/health`,
  home: `${HIANIME_API_URL}/api/v2/hianime/home`,
  search: `${HIANIME_API_URL}/api/v2/hianime/search`,
  anime: (id: string) => `${HIANIME_API_URL}/api/v2/hianime/anime/${id}`,
  episodes: (id: string) => `${HIANIME_API_URL}/api/v2/hianime/anime/${id}/episodes`,
  episodeSources: `${HIANIME_API_URL}/api/v2/hianime/episode/sources`,
  episodeServers: `${HIANIME_API_URL}/api/v2/hianime/episode/servers`,
  schedule: `${HIANIME_API_URL}/api/v2/hianime/schedule`,
} as const;
