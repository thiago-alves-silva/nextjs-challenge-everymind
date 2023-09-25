import { useJobForm } from "@/context/JobFormContext";
import { Step } from "@/types/IJob";
import Input from "@/components/Input";
import RadioButton from "@/components/RadioButton";
import styles from "./StepFormModal.module.css";
import { useEffect, useState } from "react";
import Select from "@/components/Select";
import Button from "@/components/Button";
import Modal from "@/components/Modal";

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

      if (name === "step" && step.online) {
        step.step = target.value;
      }

      if (name.startsWith("question") || name.startsWith("answer-type")) {
        const [, type, _index] = name.match(/(.+)-(\d)/) ?? [];
        const index = Number(_index);

        if (Array.isArray(step.step) && type && !isNaN(index)) {
          if (type === "question") {
            step.step[index].label = target.value;
          } else if (type === "answer-type") {
            const { value } = target;

            if (
              value === "number" ||
              value === "checkbox" ||
              value === "radio" ||
              value === "text"
            ) {
              step.step[index].type = value;
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

      if (!step.online && Array.isArray(step.step)) {
        step.step.push({ label: "", type: "text" });
      }

      return { ...formData, steps };
    });
  };

  const deleteQuestion = (index: number) => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const step = steps[props.stepIndex];

      if (!step.online && Array.isArray(step.step)) {
        step.step.splice(index, 1);
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
      const isString = typeof step.step === "string";
      step.online = isOnline;

      if (isOnline) {
        step.step = isString ? step.step : "";
      } else {
        if (isString || !step.step.length) {
          step.step = [{ label: "", type: "text" }];
        }
      }

      return { ...formData, steps: formData.steps };
    });
  }, [isOnline, props.stepIndex, setFormData]);

  return (
    <Modal onClose={props.onClose}>
      <div className={styles.container}>
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
        {isOnline && typeof step.step === "string" && (
          <Input
            label="Endereço da etapa"
            name="step"
            value={step.step}
            onChange={handleOnChange}
            theme="light"
          />
        )}
        {!isOnline && Array.isArray(step.step) && (
          <>
            <ul className={styles["question-list"]}>
              {step.step.map((step, index) => (
                <li key={index} className={styles["question-item"]}>
                  <Input
                    label={`Pergunta ${index + 1}`}
                    name={`question-${index}`}
                    value={step.label}
                    onChange={handleOnChange}
                    theme="light"
                  />
                  <Select
                    label="Tipo de resposta"
                    name={`answer-type-${index}`}
                    value={step.type}
                    onChange={handleOnChange}
                    theme="light"
                  >
                    <option value="text">Texto</option>
                    <option value="number">Número</option>
                    <option value="radio">Seleção única</option>
                    <option value="checkbox">Seleção múltipla</option>
                  </Select>
                  <button
                    type="button"
                    className={styles["delete-question-button"]}
                    onClick={() => deleteQuestion(index)}
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className={styles["add-question-button"]}
              onClick={addQuestion}
            >
              Adicionar pergunta
            </button>
          </>
        )}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles["add-question-button"]}
            onClick={deleteStep}
          >
            Remover etapa
          </button>
          <Button onClick={props.onClose}>Concluir</Button>
        </div>
      </div>
    </Modal>
  );
};

export default StepFormModal;
