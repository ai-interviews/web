import Image from "next/image";

type Props = {
  name: string;
  src?: string;
  small?: boolean;
};

export function Avatar({ src, name, small }: Props) {
  const size = small ? 12 : 24;

  return src ? (
    <div className="avatar">
      <div className={`w-${size} rounded-full`}>
        <Image
          src={src}
          width={size}
          height={size}
          className={small ? "w-12" : "w-24"}
          alt="user avatar"
          referrerPolicy="no-referrer"
          unoptimized
        />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div
        className={`bg-neutral-focus text-neutral-content rounded-full w-${size}`}
      >
        <span className="text-3xl">{name}</span>
      </div>
    </div>
  );
}
