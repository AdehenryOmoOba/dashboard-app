import '@/app/ui/global.css';
import HideNextBadge from '@/app/ui/hide-next-badge';

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
