export default function CategoryPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">카테고리: {params.slug}</h1>
      <div className="rounded-xl border border-zinc-800 p-4">카테고리별 툴 피드 (MVP)</div>
    </main>
  );
}
