import Link from 'next/link';
import { ReactNode } from 'react';

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <header className="sticky top-0 z-10 bg-bg/90 backdrop-blur border-b border-zinc-800 py-4 mb-8 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">VibeArena</Link>
        <nav className="flex gap-4 text-sm text-zinc-300">
          <Link href="/submit">등록하기</Link>
          <Link href="/admin">관리자</Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
