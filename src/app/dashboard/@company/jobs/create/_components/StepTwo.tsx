import { useJobForm } from "@/context/JobFormContext";
import { useRef, useState } from "react";
import { Step } from "@/types/IJob";
import FormControls from "./FormControls";
import StepFormModal from "./StepFormModal";
import styles from "./StepTwo.module.css";

const StepTwo = () => {
  const { formData, setFormData } = useJobForm();
  const [stepIndex, setStepIndex] = useState<number | null>(null);
  const stepList = useRef<HTMLUListElement>(null);

  const validate = (): boolean => {
    return true;
  };

  const showStep = (index: number) => {
    setStepIndex(index);
  };

  const addStep = () => {
    setFormData((formData) => {
      const steps = JSON.parse(JSON.stringify(formData.steps)) as Step[];
      const item: Step = {
        label: "[Sem título]",
        online: true,
        step: "",
      };

      steps.push(item);

      return { ...formData, steps };
    });
  };

  return (
    <>
      <ul className={styles["step-list"]} ref={stepList}>
        <li>
          <span>Inscrição</span>
        </li>
        {formData.steps.map((step, index) => (
          <li
            key={`${step.label}-${index}`}
            className={styles.item}
            onClick={() => showStep(index)}
          >
            {step.label}
          </li>
        ))}
        <li>
          <button
            type="button"
            className={styles["add-step-button"]}
            onClick={addStep}
          >
            Nova etapa
          </button>
        </li>
      </ul>
      <FormControls validate={validate} />
      {stepIndex !== null && (
        <StepFormModal
          stepIndex={stepIndex}
          onClose={() => setStepIndex(null)}
        />
      )}
    </>
  );
};

export default StepTwo;
