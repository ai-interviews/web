import { Image } from "../../_components/Image";

type Size = "sm" | "md" | "lg";

type Props = {
  name: string;
  src?: string | null;
  size?: Size;
};

export function Avatar({ src, name, size = "md" }: Props) {
  const sizes: Record<
    Size,
    { sizeNum: number; sizeClass: string; textClass: string }
  > = {
    sm: { sizeNum: 12, sizeClass: "w-12", textClass: "text-lg" },
    md: { sizeNum: 24, sizeClass: "w-24", textClass: "text-xl" },
    lg: { sizeNum: 52, sizeClass: "w-52", textClass: "text-2xl" },
  };

  const { sizeNum, sizeClass, textClass } = sizes[size];

  return src ? (
    <div className="avatar">
      <div className={`${sizeClass} rounded-full`}>
        <Image src={src} size={sizeNum} alt="avatar" />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div
        className={`bg-neutral-focus text-neutral-content rounded-full ${sizeClass}`}
      >
        <span className={textClass}>{name[0]}</span>
      </div>
    </div>
  );
}
