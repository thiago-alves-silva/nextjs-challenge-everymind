import { ReactNode } from "react";
import styles from "./AddButton.module.css";

interface AddButtonProps {
  children: ReactNode;
  onClick: () => void;
}

const AddButton = (props: AddButtonProps) => {
  return (
    <button
      type="button"
      className={styles["add-button"]}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default AddButton;
