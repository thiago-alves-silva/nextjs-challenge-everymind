"use client";
import { useCandidateForm } from "@/context/CandidateFormContext";
import styles from "./FormDescription.module.css";

const FormDescription = () => {
  const { step, descriptions } = useCandidateForm();

  return (
    <div className={styles["description-container"]}>
      <p className={styles.description}>{descriptions[step]}</p>
    </div>
  );
};

export default FormDescription;
