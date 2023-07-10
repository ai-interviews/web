import { ReactNode } from 'react';
import NextLink from 'next/link';

type Props = {
  href: string;
  onClick?: () => void;
  children?: ReactNode;
};

export function Link({ href, children, onClick }: Props) {
  return (
    <NextLink href={href} className="text-blue-600 hover:underline" onClick={onClick}>
      {children}
    </NextLink>
  );
}
