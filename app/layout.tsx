import './globals.css';
import { LayoutShell } from '@/components/layout-shell';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="dark">
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
