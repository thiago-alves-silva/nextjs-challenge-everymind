import Modal from "@/components/Modal";
import Button from "@/components/Button";
import styles from "./ConfirmationModal.module.css";

interface ConfirmationModalProps {
  onClose: React.MouseEventHandler;
  onAnswer: () => void;
}

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const handleAnswer =
    (answer: boolean): React.MouseEventHandler =>
    (event) => {
      if (answer) {
        props.onAnswer();
      }

      props.onClose(event);
    };

  return (
    <Modal onClose={props.onClose}>
      <p className={styles.label}>
        A etapa aberta externamente foi realizada completamente?
      </p>
      <div className={styles["buttons-container"]}>
        <Button variant="secondary" onClick={handleAnswer(false)}>
          Não
        </Button>
        <Button onClick={handleAnswer(true)}>Sim</Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
