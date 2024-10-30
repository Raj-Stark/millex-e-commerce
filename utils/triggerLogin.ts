import { toast } from "react-toastify";

export const triggerToaster = ({
  msg,
  action,
}: {
  msg: string;
  action: "success" | "error";
}) => {
  if (action === "success") {
    return toast.success(msg);
  } else {
    return toast.error(msg);
  }
};
