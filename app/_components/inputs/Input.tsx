import classNames from "classnames";
import { ReactNode } from 'react';

type Props = {
  label?: string;
  bottomLabel?: string | ReactNode;
  value?: string | null;
  className?: string;
  placeholder?: string;
  onChange?: (v: string) => void;
  isError?: boolean;
  required?: boolean;
  disabled?: boolean;
  onEnterKey?: () => void;
};

export function Input({
  label,
  bottomLabel,
  value,
  className,
  onChange,
  placeholder,
  isError,
  required,
  disabled,
  onEnterKey,
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
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnterKey) {
            onEnterKey();
          }
        }}
      />
      {bottomLabel && (
        <label className="label">
          <span className="label-text-alt">{bottomLabel}</span>
        </label>
      )}
    </div>
  );
}
