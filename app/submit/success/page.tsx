import Link from 'next/link';

export default function SubmitSuccessPage() {
  return (
    <main className="mx-auto max-w-xl space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 text-center">
      <h1 className="text-2xl font-bold">제출이 완료되었습니다 🎉</h1>
      <p className="text-zinc-300">관리자 검토 후 승인되면 피드에 노출됩니다.</p>
      <div className="flex justify-center gap-3">
        <Link href="/" className="rounded-xl bg-violet-500 px-4 py-2 font-semibold">홈으로</Link>
        <Link href="/submit" className="rounded-xl border border-zinc-700 px-4 py-2">다른 툴 등록</Link>
      </div>
    </main>
  );
}
