import ArrowForwardIcon from "../../public/arrow_forward.svg";
import styles from "./ForwardButton.module.css";

interface ForwardButton {
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

const ForwardButton = (props: ForwardButton) => {
  return (
    <button
      type="button"
      className={styles["button"]}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <ArrowForwardIcon />
    </button>
  );
};

export default ForwardButton;
