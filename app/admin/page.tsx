import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { env } from '@/lib/env';
import { createSupabaseAdminClient } from '@/lib/supabase';

async function updateToolStatus(formData: FormData) {
  'use server';

  const toolId = String(formData.get('tool_id') ?? '');
  const nextStatus = String(formData.get('status') ?? '');

  if (!toolId || !['approved', 'rejected'].includes(nextStatus)) return;

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const isAdmin = !!user?.email && env.ADMIN_EMAILS.includes(user.email.toLowerCase());
  if (!isAdmin) return;

  const adminSupabase = createSupabaseAdminClient();
  await adminSupabase.from('tools').update({ status: nextStatus }).eq('id', toolId);

  revalidatePath('/');
  revalidatePath('/admin');
}

export default async function AdminPage() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect('/');
  }

  const isAdmin = env.ADMIN_EMAILS.includes(user.email.toLowerCase());
  if (!isAdmin) {
    return (
      <main className="max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
        <h1 className="text-2xl font-bold">관리자 전용 페이지</h1>
        <p className="mt-2 text-sm text-zinc-400">접근 권한이 없습니다. ADMIN_EMAILS 설정을 확인하세요.</p>
      </main>
    );
  }

  const adminSupabase = createSupabaseAdminClient();
  const { data: pendingTools } = await adminSupabase
    .from('tools')
    .select('id, name, tagline, status, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: true });

  return (
    <main className="space-y-4">
      <h1 className="text-2xl font-bold">관리자 승인 센터</h1>
      <p className="text-sm text-zinc-400">대기 중인 제출을 승인/거절할 수 있습니다.</p>

      <div className="space-y-3">
        {pendingTools?.length ? (
          pendingTools.map((tool) => (
            <div key={tool.id} className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4">
              <p className="font-semibold text-white">{tool.name}</p>
              <p className="mt-1 text-sm text-zinc-400">{tool.tagline}</p>
              <div className="mt-4 flex gap-2">
                <form action={updateToolStatus}>
                  <input type="hidden" name="tool_id" value={tool.id} />
                  <input type="hidden" name="status" value="approved" />
                  <button className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-500">승인</button>
                </form>
                <form action={updateToolStatus}>
                  <input type="hidden" name="tool_id" value={tool.id} />
                  <input type="hidden" name="status" value="rejected" />
                  <button className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-500">거절</button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-zinc-800 p-4 text-sm text-zinc-400">대기 중인 툴이 없습니다.</div>
        )}
      </div>
    </main>
  );
}
