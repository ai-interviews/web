'use client';

import ArrowLeftOnRectangleIcon from '@heroicons/react/24/outline/ArrowLeftOnRectangleIcon';
import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button className="btn-ghost btn" onClick={() => signOut()}>
      <ArrowLeftOnRectangleIcon height={24} width={24} />
    </button>
  );
}
