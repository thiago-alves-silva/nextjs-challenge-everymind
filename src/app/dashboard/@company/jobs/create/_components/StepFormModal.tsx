import { FormStepInputTyoe, Step } from "@/types/IJob";
import { useEffect, useState } from "react";
import { useJobForm } from "@/context/JobFormContext";
import AddButton from "./AddButton";
import Button from "@/components/Button";
import DeleteButton from "./DeleteButton";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import RadioButton from "@/components/RadioButton";
import QuestionItem from "./QuestionItem";
import replaceAccents from "@/utils/replaceAccents";
import styles from "./StepFormModal.module.css";

interface StepFormModalProps {
  stepIndex: number;
  onClose: () => void;
}

const StepFormModal = (props: StepFormModalProps) => {
  const { formData, setFormData } = useJobForm();
  const step = formData.steps[props.stepIndex];
  const [isOnline, setIsOnline] = useState(step.online);

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target }) => {
    setFormData((formData) => {
      const name = target.name as keyof Step;
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const step = steps[props.stepIndex];

      if (name === "label") {
        step.label = target.value;
      }

      if (name === "questions" && step.online) {
        step.questions = target.value;
      }

      if (
        name.startsWith("question") ||
        name.startsWith("answer-type") ||
        name.startsWith("option")
      ) {
        const [, type, _index] = name.match(/(.+)-(.+)/) ?? [];
        const index = Number(_index);

        if (Array.isArray(step.questions) && !isNaN(index)) {
          if (type === "question") {
            step.questions[index].label = target.value;
          }

          if (type === "answer-type") {
            const value = target.value as FormStepInputTyoe;

            if (value === "checkbox" || value === "radio") {
              if (!step.questions[index].options?.length) {
                step.questions[index].options = [
                  { label: "Opção 1", value: "opcao_1" },
                ];
              }
            } else {
              step.questions[index].options = undefined;
            }

            step.questions[index].type = value;
          }

          if (name.startsWith("option")) {
            const [stepIndex, stepOptionIndex] = _index
              .toString()
              .split(".")
              .map(Number);
            const options = step.questions[stepIndex].options;

            if (Array.isArray(options)) {
              const value = replaceAccents(
                target.value.replace(/\s/g, "_").toLowerCase()
              );

              options[stepOptionIndex].label = target.value;
              options[stepOptionIndex].value = value;
            }
          }
        }
      }

      return { ...formData, steps };
    });
  };

  const addQuestion = () => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const step = steps[props.stepIndex];

      if (!step.online && Array.isArray(step.questions)) {
        step.questions.push({ label: "", type: "text" });
      }

      return { ...formData, steps };
    });
  };

  const deleteStep = () => {
    setFormData((formData) => {
      const steps = [...formData.steps];
      steps.splice(props.stepIndex, 1);

      return { ...formData, steps };
    });

    props.onClose();
  };

  useEffect(() => {
    setFormData((formData) => {
      const step = formData.steps[props.stepIndex];
      const isString = typeof step.questions === "string";
      step.online = isOnline;

      if (isOnline) {
        step.questions = isString ? step.questions : "";
      } else {
        if (isString || !step.questions.length) {
          step.questions = [{ label: "", type: "text" }];
        }
      }

      return { ...formData, steps: formData.steps };
    });
  }, [isOnline, props.stepIndex, setFormData]);

  return (
    <Modal onClose={props.onClose} className={styles.container}>
      <Input
        label="Nome da etapa"
        name="label"
        value={step.label}
        onChange={handleOnChange}
        theme="light"
      />
      <div className={styles["online-step"]}>
        <span className={styles.label}>Etapa online?</span>
        <RadioButton
          label="Sim"
          name="online"
          checked={isOnline}
          onChange={() => setIsOnline(true)}
          theme="light"
        />
        <RadioButton
          label="Não"
          name="online"
          checked={!isOnline}
          onChange={() => setIsOnline(false)}
          theme="light"
        />
      </div>
      {isOnline && typeof step.questions === "string" && (
        <Input
          label="Endereço da etapa"
          name="step"
          value={step.questions}
          onChange={handleOnChange}
          theme="light"
        />
      )}
      {!isOnline && Array.isArray(step.questions) && (
        <>
          <ul className={styles["question-list"]}>
            {step.questions.map((question, questionIndex) => (
              <QuestionItem
                key={questionIndex}
                question={question}
                onChange={handleOnChange}
                questionIndex={questionIndex}
                stepIndex={props.stepIndex}
              />
            ))}
          </ul>
          <AddButton onClick={addQuestion}>Adicionar pergunta</AddButton>
        </>
      )}
      <div className={styles.footer}>
        <DeleteButton onClick={deleteStep}>Remover etapa</DeleteButton>
        <Button onClick={props.onClose}>Concluir</Button>
      </div>
    </Modal>
  );
};

export default StepFormModal;
