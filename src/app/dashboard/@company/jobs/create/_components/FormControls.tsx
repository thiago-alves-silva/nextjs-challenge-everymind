"use client";
import Button from "@/components/Button";
import styles from "./FormControls.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useJobForm } from "@/context/JobFormContext";

interface FormControlsProps {
  validate: () => boolean;
}

const FormControls = (props: FormControlsProps) => {
  const { step, setStep, descriptions } = useJobForm();
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

  return (
    <div className={styles["buttons-container"]}>
      <Button onClick={handleBack} variant="secondary">
        Voltar
      </Button>
      {step < descriptions.length - 1 ? (
        <Button onClick={handleForward}>Avançar</Button>
      ) : (
        <Button>Publicar</Button>
      )}
    </div>
  );
};

export default FormControls;
