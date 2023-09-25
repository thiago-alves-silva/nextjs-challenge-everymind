import Modal from "@/components/Modal";
import styles from "./FeedbackModal.module.css";
import Button from "@/components/Button";

interface FeedbackModalProps {
  onClose: React.MouseEventHandler;
  onAnswer: () => void;
}

const FeedbackModal = (props: FeedbackModalProps) => {
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

export default FeedbackModal;
