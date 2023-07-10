import { signIn as nextAuthSignIn } from 'next-auth/react';

export const signIn = ({ email }: { email: string }) => {
  return nextAuthSignIn('email', {
    email,
    redirect: false,
  });
};
