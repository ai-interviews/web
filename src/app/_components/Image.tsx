import NextImage from "next/image";

type Props = {
  src: string;
  size: number;
  alt: string;
  className?: string;
};

export function Image({ src, size, className, alt }: Props) {
  return (
    <NextImage
      src={src}
      width={size}
      height={size}
      className={className}
      alt={alt}
      referrerPolicy="no-referrer"
      unoptimized
    />
  );
}
