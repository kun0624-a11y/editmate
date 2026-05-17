import Link from 'next/link';
import { FeedFilters } from '@/components/feed-filters';
import { ToolCard } from '@/components/tool-card';
import { featuredTools } from '@/lib/mock-data';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { Tool } from '@/lib/types';

const trendingList = [
  { rank: 1, name: 'K-Notion AI', points: '+542' },
  { rank: 2, name: 'VibeVideo', points: '+417' },
  { rank: 3, name: 'PromptBoard', points: '+356' },
  { rank: 4, name: 'K-AutoReply', points: '+294' }
];

async function getApprovedTools(): Promise<Tool[]> {
  const supabase = createSupabaseBrowserClient();
  const { data } = await supabase
    .from('tools')
    .select('id, slug, name, tagline, description, website_url, demo_url, thumbnail_url, tags, status, launch_date, views, created_at')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .limit(12);

  if (!data?.length) return featuredTools;
  return data.map((tool) => ({ ...tool, category: null, creator: null } as Tool));
}

export default async function HomePage() {
  const tools = await getApprovedTools();

  return (
    <main className="space-y-8 pb-10 md:space-y-10">
      <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-violet-950/40 p-6 md:p-10">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative max-w-2xl space-y-4">
          <p className="inline-flex rounded-full border border-violet-400/40 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">한국 AI 빌더 디스커버리 플랫폼</p>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">바이브 코더들의<br />다음 히트작을 가장 먼저 발견하세요.</h1>
          <p className="text-sm text-zinc-300 md:text-base">VibeArena는 인디 해커와 AI 메이커가 만든 제품을 탐색하고, 좋아요로 응원하고, 빠르게 성장시키는 프리미엄 런칭 허브입니다.</p>
          <div className="flex gap-3">
            <Link href="/submit" className="rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-400">내 AI 툴 등록하기</Link>
            <a href="#featured" className="rounded-xl border border-zinc-700 px-4 py-2.5 text-sm text-zinc-200 hover:border-zinc-500">피처드 둘러보기</a>
          </div>
        </div>
      </section>
      <FeedFilters />
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4 lg:col-span-1">
          <h2 className="text-lg font-semibold text-white">주간 트렌딩 랭킹</h2>
          <p className="mt-1 text-xs text-zinc-400">최근 7일 기준 반응이 높은 툴</p>
          <ul className="mt-4 space-y-2">
            {trendingList.map((item) => (
              <li key={item.rank} className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-violet-300">#{item.rank}</span>
                  <span className="text-sm text-zinc-200">{item.name}</span>
                </div>
                <span className="text-xs text-emerald-400">{item.points}</span>
              </li>
            ))}
          </ul>
        </div>
        <div id="featured" className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-semibold text-white">피처드 AI 툴</h2><span className="text-xs text-zinc-400">매일 큐레이션 업데이트</span></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>
        </div>
      </section>
    </main>
  );
}
