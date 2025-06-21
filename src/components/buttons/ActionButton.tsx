import React from "react";
import clsx from "clsx";
import styles from "./button.module.css";

type ButtonType = "accept" | "reject" | "disabled" | "cancel";

interface ActionButtonProps {
  onClick?: () => void;
  type: ButtonType;
  children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  type,
  children,
}) => {
  const buttonClasses = clsx(styles.button, {
    [styles.accept]: type === "accept",
    [styles.reject]: type === "reject",
    [styles.cancel]: type === "cancel",
    [styles.disabled]: type === "disabled",
  });

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      disabled={type === "disabled"}
    >
      {children}
    </button>
  );
};

export default ActionButton;
