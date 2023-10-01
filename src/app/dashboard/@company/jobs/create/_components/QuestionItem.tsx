import { FormStep, Step } from "@/types/IJob";
import { useJobForm } from "@/context/JobFormContext";
import DeleteButton from "./DeleteButton";
import AddButton from "./AddButton";
import Input from "@/components/Input";
import OptionItem from "./OptionItem";
import Select from "@/components/Select";
import styles from "./QuestionItem.module.css";

interface QuestionItemProps {
  stepIndex: number;
  question: FormStep;
  questionIndex: number;
  onChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
}

const QuestionItem = (props: QuestionItemProps) => {
  const { setFormData } = useJobForm();

  const deleteQuestion = (index: number) => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const step = steps[props.stepIndex];

      if (!step.online && Array.isArray(step.questions)) {
        step.questions.splice(index, 1);
      }

      return { ...formData, steps };
    });
  };

  const addOptionToQuestion = (questionIndex: number) => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const question = steps[props.stepIndex].questions[
        questionIndex
      ] as FormStep;

      question.options?.push({
        label: `Opção ${question.options.length + 1}`,
        value: `opcao_${question.options.length + 1}`,
      });

      return { ...formData, steps };
    });
  };

  return (
    <li key={props.questionIndex} className={styles["question-item"]}>
      <Input
        label={`Pergunta ${props.questionIndex + 1}`}
        name={`question-${props.questionIndex}`}
        value={props.question.label}
        onChange={props.onChange}
        theme="light"
      />
      <Select
        label="Tipo de resposta"
        name={`answer-type-${props.questionIndex}`}
        value={props.question.type}
        onChange={props.onChange}
        theme="light"
      >
        <option value="text">Texto</option>
        <option value="number">Número</option>
        <option value="radio">Seleção única</option>
        <option value="checkbox">Seleção múltipla</option>
      </Select>
      <DeleteButton onClick={() => deleteQuestion(props.questionIndex)}>
        Remover pergunta
      </DeleteButton>
      {(props.question.type === "checkbox" ||
        props.question.type === "radio") && (
        <div className={styles["option-list-container"]}>
          <ul className={styles["option-list"]}>
            {props.question.options?.map((option, optionIndex) => (
              <OptionItem
                key={optionIndex}
                option={option}
                optionIndex={optionIndex}
                questionIndex={props.questionIndex}
                stepIndex={props.stepIndex}
                onChange={props.onChange}
              />
            ))}
          </ul>
          <AddButton onClick={() => addOptionToQuestion(props.questionIndex)}>
            Adicionar opção
          </AddButton>
        </div>
      )}
    </li>
  );
};

export default QuestionItem;
