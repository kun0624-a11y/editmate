import { SubmitToolForm } from '@/components/submit-tool-form';

export default function SubmitPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">AI 툴 등록</h1>
      <p className="text-sm text-zinc-400">모든 제출은 관리자 승인 후 공개됩니다.</p>
      <SubmitToolForm />
      <p className="text-xs text-zinc-500">MVP: 제출 후 <span className="text-zinc-300">/submit/success</span> 페이지로 이동시키세요.</p>
    </main>
  );
}
