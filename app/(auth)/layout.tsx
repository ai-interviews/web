import { SessionProvider } from 'next-auth/react';
import { NextAuthProvider } from '../providers';
import { Suspense } from 'react';
import { LoadScreen } from '../_components/LoadScreen';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Suspense fallback={<LoadScreen />}>{children}</Suspense>
    </div>
  );
}
