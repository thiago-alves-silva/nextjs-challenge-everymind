"use client";
import { useJobForm } from "@/context/JobFormContext";
import styles from "./FormDescription.module.css";

const FormDescription = () => {
  const { step, descriptions } = useJobForm();
  const description = descriptions[step];

  return (
    <div className={styles["description-container"]}>
      <h1 className={styles.title}>{description.title}</h1>
      <h2 className={styles.subtitle}>{description.subtitle}</h2>
    </div>
  );
};

export default FormDescription;
