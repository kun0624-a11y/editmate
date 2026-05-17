import Link from 'next/link';
import { Tool } from '@/lib/types';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/70 p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.01)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-violet-400/70 hover:shadow-[0_20px_50px_-24px_rgba(139,92,246,0.65)]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-zinc-950">
        {tool.thumbnail_url ? (
          <img
            src={tool.thumbnail_url}
            alt={tool.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : null}
      </div>
      <div className="relative mt-4 space-y-2 px-1 pb-2">
        <p className="inline-flex rounded-full border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-300">
          {tool.category?.name_ko ?? '기타'}
        </p>
        <h3 className="text-lg font-semibold leading-tight text-white">{tool.name}</h3>
        <p className="text-sm text-zinc-400">{tool.tagline}</p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>@{tool.creator?.username ?? 'builder'}</span>
          <span>❤️ {tool.likes_count ?? 0} · 👁️ {tool.views}</span>
        </div>
      </div>
    </Link>
  );
}
