import MicrophoneIcon from "@heroicons/react/24/outline/MicrophoneIcon";
import classNames from "classnames";

type Props = {
  active: boolean;
  isClickable?: boolean;
  onClick?: () => void;
};

export function AnimatedMicrophone({ active, onClick, isClickable }: Props) {
  return (
    <div
      className={classNames(
        "mic h-20 w-20",
        {
          "mic-listening": active,
          "cursor-pointer": active && isClickable !== false,
          "bg-primary": active && isClickable,
          "bg-secondary": active && isClickable === false,
          "bg-base-300": !active,
        }
        // active ? "bg-primary" : "bg-base-300"
      )}
      onClick={() => onClick?.()}
    >
      <MicrophoneIcon height={26} className="z-10 text-base-content" />
    </div>
  );
}
