import classNames from "classnames";

type Props = {
  label?: string;
  bottomLabel?: string;
  value?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  isError?: boolean;
  rows?: number;
};

export function Textarea({
  label,
  bottomLabel,
  value,
  onChange,
  placeholder,
  isError,
  rows,
}: Props) {
  return (
    <div className="w-full">
      <label
        className="mb-2 block text-xs font-bold uppercase tracking-wide"
        htmlFor="description"
      >
        {label}
      </label>
      <textarea
        placeholder={placeholder || "Type here"}
        className={classNames("textarea-bordered textarea w-full", {
          "input-error": isError,
        })}
        id="description"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        rows={rows || 5}
      />
      {bottomLabel && (
        <label className="label">
          <span className="label-text-alt">{bottomLabel}</span>
        </label>
      )}
    </div>
  );
}
