import React, { useRef, ReactNode } from "react";
import cn from "classnames";
import { useOnClickOutside } from "usehooks-ts";

type Props = {
  children: ReactNode;
  open: boolean;
  disableClickOutside?: boolean;
  onClose(): void;
};

const Modal = ({ children, open, disableClickOutside, onClose }: Props) => {
  const ref = useRef(null);

  useOnClickOutside(ref, () => {
    if (open && !disableClickOutside) {
      onClose();
    }
  });

  const modalClass = cn({
    "modal modal-bottom sm:modal-middle": true,
    "modal-open": open,
  });

  return (
    <div className={modalClass}>
      <div className="modal-box" ref={ref}>
        <div className="modal-action">
          <button
            className="btn-xs btn sm:btn-sm md:btn-md"
            onClick={onClose}
            style={{ position: "absolute", top: 5, right: 5 }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
