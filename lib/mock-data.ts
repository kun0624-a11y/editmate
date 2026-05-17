import { Tool } from './types';

export const featuredTools: Tool[] = [
  {
    id: '1',
    slug: 'korean-notion-ai',
    name: 'K-Notion AI',
    tagline: '한국어 문서 자동 생성 워크스페이스',
    description: '회의록, PRD, 운영 문서를 한국어로 빠르게 작성하는 AI 도구입니다.',
    website_url: 'https://example.com/k-notion-ai',
    demo_url: 'https://example.com/k-notion-ai/demo',
    thumbnail_url: 'https://images.unsplash.com/photo-1518773553398-650c184e0bb3',
    tags: ['문서', '생산성'],
    status: 'approved',
    launch_date: '2026-05-01',
    views: 1320,
    created_at: '2026-05-01T12:00:00Z',
    category: { slug: 'productivity', name_ko: '생산성' },
    creator: { username: 'vibecoderkim', display_name: 'VibeCoder Kim' },
    likes_count: 342
  },
  {
    id: '2',
    slug: 'vibe-video',
    name: 'VibeVideo',
    tagline: '텍스트 프롬프트 기반 숏폼 생성',
    description: '한 줄 프롬프트로 릴스/쇼츠용 영상을 즉시 생성합니다.',
    website_url: 'https://example.com/vibe-video',
    demo_url: null,
    thumbnail_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    tags: ['영상', '마케팅'],
    status: 'approved',
    launch_date: '2026-05-02',
    views: 980,
    created_at: '2026-05-02T12:00:00Z',
    category: { slug: 'video', name_ko: '비디오' },
    creator: { username: 'aibuilderlee', display_name: 'AI Builder Lee' },
    likes_count: 211
  }
];
