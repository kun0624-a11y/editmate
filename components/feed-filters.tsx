const categories = ['전체', '트렌딩', '최신', '생산성', '마케팅', '디자인', '개발', '영상'];

export function FeedFilters() {
  return (
    <section className="space-y-3">
      <p className="text-sm font-medium text-zinc-300">카테고리</p>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((label, index) => (
          <button
            key={label}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
              index === 0
                ? 'border-violet-400/70 bg-violet-500/20 text-violet-100'
                : 'border-zinc-700 bg-zinc-900/70 text-zinc-300 hover:border-violet-400/60 hover:text-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
