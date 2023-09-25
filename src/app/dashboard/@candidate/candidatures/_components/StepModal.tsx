import { FormStep } from "@/types/IJob";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import Checkbox from "@/components/Checkbox";
import RadioButton from "@/components/RadioButton";
import Button from "@/components/Button";
import styles from "./StepModal.module.css";

interface StepModalProps {
  steps: FormStep[];
  onClose: () => void;
  onSubmit: (formData: { [key: string]: string | string[] }) => void;
}

const StepModal = (props: StepModalProps) => {
  const [formData, setFormData] = useState(() =>
    props.steps.reduce(
      (acc: { [key: string]: string | string[] }, step, index) => {
        const name = `question-${index}`;
        acc[name] = step.type === "checkbox" ? [] : "";

        return acc;
      },
      {}
    )
  );
  const [isValid, setIsValid] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setFormData((formData) => {
      const name = target.name;

      if (target.type === "checkbox") {
        const value = (formData[name] ?? []) as string[];

        if (target.checked) {
          value.push(target.value);
        } else {
          value.splice(value.indexOf(target.value), 1);
        }

        formData[name] = value;
      } else {
        formData[name] = target.value;
      }

      return { ...formData };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (isValid) {
      props.onSubmit(formData);
      props.onClose();
    }
  };

  // valida se o formulário foi completamente preenchido
  useEffect(() => {
    const values = Object.values(formData);
    const isValid = values.every((value) => value.length);
    setIsValid(isValid);
  }, [formData]);

  return (
    <Modal onClose={props.onClose}>
      <form className={styles.form} onSubmit={handleSubmit}>
        {props.steps.map((step, index) => {
          const name = `question-${index}`;

          switch (step.type) {
            case "text":
              return (
                <Input
                  key={`${step.label}-${index}`}
                  name={name}
                  label={step.label}
                  value={(formData[name] || "") as string}
                  onChange={handleChange}
                  theme="light"
                />
              );
            case "number":
              return (
                <Input
                  key={`${step.label}-${index}`}
                  name={name}
                  type="number"
                  label={step.label}
                  value={(formData[name] || "") as string}
                  onChange={handleChange}
                  theme="light"
                />
              );
            case "checkbox":
              return (
                <div key={`${step.label}-${index}`}>
                  <span className={styles.label}>{step.label}</span>
                  <div className={styles.options}>
                    {step.options?.map((option) => {
                      return (
                        <Checkbox
                          key={option.value}
                          name={name}
                          value={option.value}
                          label={option.label}
                          checked={formData[name]?.includes(option.value)}
                          onChange={handleChange}
                          theme="light"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            case "radio":
              return (
                <div key={`${step.label}-${index}`}>
                  <span className={styles.label}>{step.label}</span>
                  <div className={styles.options}>
                    {step.options?.map((option) => {
                      return (
                        <RadioButton
                          key={option.value}
                          name={name}
                          value={option.value}
                          label={option.label}
                          checked={formData[name] === option.value}
                          onChange={handleChange}
                          theme="light"
                        />
                      );
                    })}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}

        <Button className={styles["submit-button"]} disabled={!isValid}>
          Enviar
        </Button>
      </form>
    </Modal>
  );
};

export default StepModal;
