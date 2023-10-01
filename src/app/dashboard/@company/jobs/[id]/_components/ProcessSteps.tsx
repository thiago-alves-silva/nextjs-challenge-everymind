"use client";
import { JobApi, Step } from "@/types/IJob";
import { useState } from "react";
import JobStepModal from "./JobStepModal";
import styles from "./ProcessSteps.module.css";

interface ProcessStepsProps {
  job: JobApi;
}

const ProcessSteps = (props: ProcessStepsProps) => {
  const [step, setStep] = useState<Step | null>(null);

  return (
    <div className={styles["step-list-container"]}>
      <ol className={styles["step-list"]}>
        <li>
          <span className={styles.default}>Inscrição</span>
        </li>
        {props.job.steps.map((step, index) => (
          <li key={index}>
            <span className={styles.value} onClick={() => setStep(step)}>
              {step.label}
            </span>
          </li>
        ))}
        <li>
          <span className={styles.default}>Devolutiva</span>
        </li>
      </ol>
      {step && <JobStepModal step={step} onClose={() => setStep(null)} />}
    </div>
  );
};

export default ProcessSteps;
