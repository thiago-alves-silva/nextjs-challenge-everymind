import { FormStep, FormStepInputTyoe } from "@/types/IJob";
import Input from "@/components/Input";
import Select from "@/components/Select";
import styles from "./QuestionItem.module.css";
import Checkbox from "@/components/Checkbox";
import RadioButton from "@/components/RadioButton";

interface QuestionItemProps {
  question: FormStep;
  questionIndex: number;
}

const QuestionItem = (props: QuestionItemProps) => {
  const normalizeQuestionType = (type: FormStepInputTyoe) => {
    switch (type) {
      case "number":
        return "numérica";
      case "text":
        return "textual";
      case "checkbox":
        return "de múltipla escolha";
      case "radio":
        return "de opção única";
      default:
        return type;
    }
  };

  return (
    <li key={props.questionIndex} className={styles["question-item"]}>
      <span className={styles.label}>Pergunta {props.questionIndex + 1}</span>
      <p className={styles.value}>{props.question.label}</p>
      {props.question.type === "checkbox" || props.question.type === "radio" ? (
        <ul className={styles["option-list"]}>
          {props.question.options?.map((option, optionIndex) => (
            <li key={optionIndex}>
              {props.question.type === "checkbox" && (
                <Checkbox
                  label={option.label}
                  onChange={() => {}}
                  disabled
                  theme="light"
                />
              )}
              {props.question.type === "radio" && (
                <RadioButton
                  label={option.label}
                  checked={false}
                  name=""
                  onChange={() => {}}
                  disabled
                  theme="light"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles["answer-type"]}>
          Resposta {normalizeQuestionType(props.question.type)}
        </p>
      )}
    </li>
  );
};

export default QuestionItem;
