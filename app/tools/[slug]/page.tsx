import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ShareActions } from '@/components/share-actions';
import { createSupabaseBrowserClient } from '@/lib/supabase';
import { featuredTools } from '@/lib/mock-data';

const ogFallback = '/og-default.png';

async function getTool(slug: string) {
  const supabase = createSupabaseBrowserClient();
  const { data: tool } = await supabase
    .from('tools')
    .select('id, slug, name, description, website_url, demo_url, launch_date, views, status, thumbnail_url')
    .eq('slug', slug)
    .eq('status', 'approved')
    .single();
  return tool;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = (await getTool(slug)) ?? featuredTools.find((item) => item.slug === slug);
  if (!tool) return { title: 'VibeArena Tool' };

  return {
    title: `${tool.name} | VibeArena`,
    description: tool.description,
    openGraph: {
      title: `${tool.name} | VibeArena`,
      description: tool.description,
      images: [tool.thumbnail_url || ogFallback]
    }
  };
}

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);

  const fallback = featuredTools.find((item) => item.slug === slug);
  if (!tool && !fallback) notFound();

  const viewModel = tool
    ? {
        slug: tool.slug,
        name: tool.name,
        description: tool.description,
        likes: 0,
        views: tool.views,
        launchDate: tool.launch_date,
        websiteUrl: tool.website_url,
        demoUrl: tool.demo_url,
        creatorUsername: 'builder',
        creatorName: 'VibeArena Maker'
      }
    : {
        slug: fallback!.slug,
        name: fallback!.name,
        description: fallback!.description,
        likes: fallback!.likes_count ?? 0,
        views: fallback!.views,
        launchDate: fallback!.launch_date,
        websiteUrl: fallback!.website_url,
        demoUrl: fallback!.demo_url,
        creatorUsername: fallback!.creator?.username ?? 'builder',
        creatorName: fallback!.creator?.display_name ?? 'VibeArena Maker'
      };

  return (
    <main className="mx-auto max-w-3xl space-y-5">
      <h1 className="text-3xl font-bold">{viewModel.name}</h1>
      <p className="text-zinc-300">{viewModel.description}</p>
      <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
        <span>❤️ {viewModel.likes}</span>
        <span>👁️ {viewModel.views}</span>
        <span>출시일 {viewModel.launchDate ?? '-'}</span>
        <Link className="underline" href={`/creators/${viewModel.creatorUsername}`}>제작자 {viewModel.creatorName}</Link>
      </div>
      <ShareActions slug={viewModel.slug} name={viewModel.name} />
      <div className="rounded-xl border border-zinc-800 bg-card p-4">댓글 영역 (다음 단계)</div>
      <div className="flex gap-3">
        <a href={viewModel.websiteUrl} target="_blank" className="rounded-xl bg-violet-500 px-4 py-2 font-semibold">웹사이트 방문</a>
        {viewModel.demoUrl ? <a href={viewModel.demoUrl} target="_blank" className="rounded-xl border border-zinc-700 px-4 py-2">데모 보기</a> : null}
      </div>
    </main>
  );
}
