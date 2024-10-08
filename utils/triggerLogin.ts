import { toast } from "react-toastify";

export const triggerLogin = (isLogin: boolean) => {
  if (!isLogin) return toast.error("Please Login First !!!");
};
