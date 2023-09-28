"use client";
import { useRouter } from "next/navigation";
import { useCandidateForm } from "@/context/CandidateFormContext";
import BackButton from "@/components/BackButton";
import ForwardButton from "@/components/ForwardButton";
import Button from "@/components/Button";
import styles from "./FormControls.module.css";

interface FormControlsProps {
  validate: () => boolean;
}

const FormControls = (props: FormControlsProps) => {
  const { step, setStep, descriptions } = useCandidateForm();
  const router = useRouter();

  const handleBack: React.MouseEventHandler = (event) => {
    event.preventDefault();

    if (step > 0) {
      setStep((step) => step - 1);
    } else {
      router.back();
    }
  };

  const handleForward: React.MouseEventHandler = (event) => {
    if (props.validate()) {
      setStep((step) => step + 1);
    }
  };

  const handleSubmit: React.MouseEventHandler = (event) => {
    if (!props.validate()) {
      event.preventDefault();
    }
  };

  return (
    <div className={styles["buttons-container"]}>
      <BackButton onClick={handleBack} />
      {step < descriptions.length - 1 ? (
        <ForwardButton onClick={handleForward} />
      ) : (
        <Button ariaLabel="Finalizar" onClick={handleSubmit}>
          Finalizar
        </Button>
      )}
    </div>
  );
};

export default FormControls;
