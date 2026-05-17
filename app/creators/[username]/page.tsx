import { ToolCard } from '@/components/tool-card';
import { featuredTools } from '@/lib/mock-data';

export default async function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const tools = featuredTools.filter((t) => t.creator?.username === username);
  const creator = tools[0]?.creator;

  return (
    <main className="space-y-5">
      <section className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
        <h1 className="text-2xl font-bold">@{username}</h1>
        <p className="mt-2 text-zinc-300">{creator?.display_name ?? 'VibeArena Creator'} · 한국 AI 빌더</p>
      </section>
      <section>
        <h2 className="mb-3 text-lg font-semibold">출시한 툴</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(tools.length ? tools : featuredTools.slice(0, 2)).map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>
    </main>
  );
}
