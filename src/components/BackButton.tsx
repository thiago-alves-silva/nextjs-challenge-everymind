import ArrowBackIcon from "../../public/arrow_back.svg";
import styles from "./BackButton.module.css";

interface BackButtonProps {
  onClick?: React.MouseEventHandler;
}

const BackButton = (props: BackButtonProps) => {
  return (
    <button
      type="button"
      className={styles["container"]}
      onClick={props.onClick}
    >
      <ArrowBackIcon />
    </button>
  );
};

export default BackButton;
