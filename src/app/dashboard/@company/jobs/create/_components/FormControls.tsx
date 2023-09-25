"use client";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import styles from "./FormControls.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useJobForm } from "@/context/JobFormContext";

interface FormControlsProps {
  validate: () => boolean;
}

const FormControls = (props: FormControlsProps) => {
  const { formData, step, setStep, descriptions } = useJobForm();
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
      <Button onClick={handleBack} variant="secondary">
        Voltar
      </Button>
      {step < descriptions.length - 1 ? (
        <Button onClick={handleForward} disabled={!validFields}>
          Avançar
        </Button>
      ) : (
        <Button disabled={!validFields}>Publicar</Button>
      )}
    </div>
  );
};

export default FormControls;
