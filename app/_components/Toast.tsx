"use client";

import classNames from "classnames";

export type ToastType = "success" | "info" | "danger";

type Props = {
  type?: ToastType;
  text: string;
};

export type ToastOptions = Props;

export function Toast({ type, text }: Props) {
  let typeClass;

  switch (type) {
    case "success":
      typeClass = "alert-success";
      break;
    case "info":
      typeClass = "alert-info";
      break;
    case "danger":
      typeClass = "bg-error";
      break;
  }

  return (
    <div className="toast-center toast toast-top  z-50">
      <div
        className={classNames(
          "alert flex items-center justify-center",
          typeClass
        )}
      >
        <div>{text}</div>
      </div>
    </div>
  );
}
