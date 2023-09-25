import Modal from "@/components/Modal";
import styles from "./FeedbackModal.module.css";

interface FeedbackModalProps {
  feedback: string;
  onClose: () => void;
}

const FeedbackModal = (props: FeedbackModalProps) => {
  return (
    <Modal onClose={props.onClose}>
      <span className={styles.title}>Feedback</span>
      <p className={styles.feedback}>{props.feedback}</p>
    </Modal>
  );
};

export default FeedbackModal;
