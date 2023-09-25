import { useRef } from "react";
import CloseIcon from "../../public/close.svg";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  onClose: React.MouseEventHandler;
  className?: string;
}

const Modal = (props: ModalProps) => {
  const outsideAreaRef = useRef<HTMLDivElement>(null);
  const outsideClick: React.MouseEventHandler = (event) => {
    if (event.target === outsideAreaRef.current) {
      props.onClose(event);
    }
  };

  return (
    <div
      className={styles.container}
      onClick={outsideClick}
      ref={outsideAreaRef}
    >
      <div className={`${props.className || ""} ${styles.modal}`}>
        <button className={styles["close-button"]} onClick={props.onClose}>
          <CloseIcon />
        </button>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
