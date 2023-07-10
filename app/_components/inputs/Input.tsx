import classNames from "classnames";

type Props = {
  label?: string;
  value?: string | null;
  className?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  isError?: boolean;
  required?: boolean;
  disabled?: boolean;
};

export function Input({
  label,
  value,
  className,
  onChange,
  placeholder,
  isError,
  required,
  disabled,
}: Props) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-xs font-bold uppercase tracking-wide">
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <input
        type="text"
        placeholder={placeholder || "Type here"}
        className={classNames(
          "input-bordered input w-full",
          {
            "input-error": isError,
          },
          className
        )}
        value={value || undefined}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
