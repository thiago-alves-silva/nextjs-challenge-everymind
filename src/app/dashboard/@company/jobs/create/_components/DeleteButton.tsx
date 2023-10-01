import { ReactNode } from "react";
import styles from "./DeleteButton.module.css";

interface DeleteButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const DeleteButton = (props: DeleteButtonProps) => {
  return (
    <button
      type="button"
      className={styles["delete-button"]}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default DeleteButton;
