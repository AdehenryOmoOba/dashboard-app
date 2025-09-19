import '@/app/ui/global.css';
import HideNextBadge from '@/app/ui/hide-next-badge';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {process.env.NODE_ENV === 'development' ? <HideNextBadge /> : null}
        {children}
      </body>
    </html>
  );
}
