import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Modal = ({
  closeModal,
  children,
}: {
  closeModal: () => void;
  children: ReactNode;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    function escHandler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("keydown", escHandler);
    };
  }, []);

  return ReactDOM.createPortal(
    <div tabIndex={0} className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <IconButton
          sx={{
            position: "absolute",
            right: "20px",
            top: "20px",
            zIndex: 2,
            background: "#e4e4e4",
          }}
          onClick={closeModal}
        >
          <Close />
        </IconButton>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body,
  );
};

export default Modal;
