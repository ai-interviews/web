import { useContext } from "react";
import { ToastContext } from "../providers";

export const useToast = () => {
  const { showToast } = useContext(ToastContext);

  return showToast;
};
