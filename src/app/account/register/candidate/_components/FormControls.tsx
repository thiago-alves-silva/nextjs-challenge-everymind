"use client";
import BackButton from "@/components/BackButton";
import ForwardButton from "@/components/ForwardButton";
import Button from "@/components/Button";
import styles from "./FormControls.module.css";
import { useRouter } from "next/navigation";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { useEffect, useState } from "react";

interface FormControlsProps {
  validate: () => boolean;
}

const FormControls = (props: FormControlsProps) => {
  const { formData, step, setStep, descriptions } = useCandidateForm();
  const [validFields, setValidFields] = useState(false);
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
    event.preventDefault();

    if (props.validate()) {
      setStep((step) => step + 1);
    }
  };

  useEffect(() => {
    setValidFields(props.validate());
  }, [formData, props]);

  return (
    <div className={styles["buttons-container"]}>
      <BackButton onClick={handleBack} />
      {step < descriptions.length - 1 ? (
        <ForwardButton onClick={handleForward} disabled={!validFields} />
      ) : (
        <Button disabled={!validFields}>Finalizar</Button>
      )}
    </div>
  );
};

export default FormControls;
