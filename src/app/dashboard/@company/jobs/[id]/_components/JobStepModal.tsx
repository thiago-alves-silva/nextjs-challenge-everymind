import { Step } from "@/types/IJob";
import Modal from "@/components/Modal";
import Link from "next/link";
import QuestionItem from "./QuestionItem";
import RadioButton from "@/components/RadioButton";
import styles from "./JobStepModal.module.css";

interface StepFormModalProps {
  step: Step;
  onClose: () => void;
}

const JobStepModal = (props: StepFormModalProps) => {
  return (
    <Modal onClose={props.onClose} className={styles.container}>
      <div className={styles["online-step"]}>
        <span className={styles.label}>Etapa online?</span>
        <RadioButton
          label="Sim"
          name="online"
          checked={props.step.online}
          onChange={() => {}}
          disabled
          theme="light"
        />
        <RadioButton
          label="Não"
          name="online"
          checked={!props.step.online}
          onChange={() => {}}
          disabled
          theme="light"
        />
      </div>
      {props.step.online && typeof props.step.questions === "string" && (
        <div>
          <span className={styles.label}>Endereço da etapa</span>
          <p className={styles.value}>
            <Link href={props.step.questions} target="_blank">
              Acesso externo
            </Link>
          </p>
        </div>
      )}
      {!props.step.online && Array.isArray(props.step.questions) && (
        <ul className={styles["question-list"]}>
          {props.step.questions.map((question, questionIndex) => (
            <QuestionItem
              key={questionIndex}
              question={question}
              questionIndex={questionIndex}
            />
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default JobStepModal;
