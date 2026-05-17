'use client';

import { useState } from 'react';

export function ShareActions({ slug, name }: { slug: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const [embedCopied, setEmbedCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/tools/${slug}` : `/tools/${slug}`;
  const embedCode = `<a href="${shareUrl}" target="_blank" rel="noopener noreferrer"><img src="${shareUrl}/badge" alt="${name} on VibeArena" /></a>`;

  async function copy(text: string, type: 'share' | 'embed') {
    await navigator.clipboard.writeText(text);
    if (type === 'share') {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } else {
      setEmbedCopied(true);
      setTimeout(() => setEmbedCopied(false), 1200);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button onClick={() => copy(shareUrl, 'share')} className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-violet-400">
        공유 링크 복사 {copied ? '✓' : ''}
      </button>
      <button onClick={() => copy(embedCode, 'embed')} className="rounded-xl border border-zinc-700 px-3 py-2 text-sm hover:border-violet-400">
        런치 배지 코드 복사 {embedCopied ? '✓' : ''}
      </button>
    </div>
  );
}
