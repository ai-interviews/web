import { Image } from "../../_components/Image";
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
          size={size}
          className={small ? "w-12" : "w-24"}
          alt="user avatar"
        />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div
        className={`bg-neutral-focus text-neutral-content rounded-full ${
          small ? "w-12" : "w-24"
        }`}
      >
        <span className="text-3xl">{name[0]}</span>
      </div>
    </div>
  );
}
