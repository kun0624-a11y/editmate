const fields = [
  { name: 'name', label: '툴 이름', required: true },
  { name: 'tagline', label: '한 줄 소개', required: true },
  { name: 'description', label: '설명', required: true, textarea: true },
  { name: 'website_url', label: '웹사이트 URL', required: true },
  { name: 'demo_url', label: '데모 URL', required: false },
  { name: 'thumbnail_url', label: '썸네일 URL', required: false },
  { name: 'category', label: '카테고리', required: true },
  { name: 'tags', label: '태그 (쉼표로 구분)', required: false }
];

export function SubmitToolForm() {
  return (
    <form className="space-y-4 rounded-2xl border border-zinc-800 bg-card p-5">
      {fields.map((field) => (
        <label key={field.name} className="block space-y-2">
          <span className="text-sm text-zinc-300">{field.label}</span>
          {field.textarea ? (
            <textarea name={field.name} required={field.required} rows={5} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3" />
          ) : (
            <input name={field.name} required={field.required} className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3" />
          )}
        </label>
      ))}
      <button type="submit" className="rounded-xl bg-violet-500 px-4 py-3 font-semibold text-white hover:bg-violet-400">
        검토 요청 보내기
      </button>
    </form>
  );
}
