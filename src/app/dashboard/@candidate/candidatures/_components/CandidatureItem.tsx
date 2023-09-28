"use client";
import { CANDIDATURE_PUT } from "@/api";
import { CandidatureWithJobAndCompany } from "@/types/ICandidature";
import { Step, FormStep } from "@/types/IJob";
import { useEffect, useState } from "react";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";
import StepModal from "./StepModal";
import styles from "./CandidatureItem.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import { WorkModel } from "@/types/WorkModel";
import displayNotification from "@/utils/displayNotification";

interface CandidatureProps {
  candidature: CandidatureWithJobAndCompany;
}

const CandidatureItem = ({ candidature }: CandidatureProps) => {
  const [stepsForm, setStepsForm] = useState<FormStep[] | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const { job } = candidature;
  const location = `${job?.city ?? ""} - ${
    job?.state ?? ""
  } (${normalizeWorkModel(job?.work_model as WorkModel)})`;
  const currentStep = job?.steps[candidature.current_step];
  const router = useRouter();
  const searchParams = useSearchParams();

  const openStep = (step: Step) => () => {
    if (typeof step.step === "string") {
      window.open(step.step, "_blank");
      document.onvisibilitychange = (event) => {
        if (event.currentTarget instanceof Document) {
          const visibilityState = event.currentTarget.visibilityState;

          if (visibilityState === "visible") {
            document.onvisibilitychange = null;
            setShowFeedbackModal(true);
          }
        }
      };
    } else {
      setStepsForm(step.step);
    }
  };

  const sendStep = async (
    formData: { [key: string]: string | string[] } = {}
  ) => {
    const candidatureToSend = JSON.parse(
      JSON.stringify(candidature)
    ) as CandidatureWithJobAndCompany;

    if (!candidatureToSend.answers) {
      candidatureToSend.answers = [];
    }

    candidatureToSend.answers[candidature.current_step] = {
      step: candidature.current_step,
      values: currentStep?.online ? [] : Object.values(formData),
    };
    candidatureToSend.current_step++;

    const { url, options } = CANDIDATURE_PUT(
      candidature._id,
      candidatureToSend
    );
    const response = await fetch(url, options);

    if (response.ok) {
      displayNotification({
        text: "Respostas registradas com sucesso",
        type: "success",
      });
      router.refresh();
    } else {
      displayNotification({
        text: "Falha ao registrar respostas da etapa",
        type: "error",
      });
    }
  };

  useEffect(() => {
    const returnFromFeedback = searchParams.has("feedback");

    if (returnFromFeedback) {
      router.refresh();
    }
  }, [router, searchParams]);

  return (
    <div className={styles.item}>
      <span className={styles.image}></span>
      <span className={styles.title}>{job?.title ?? "[Sem título]"}</span>
      <span className={styles.company}>
        {candidature.company?.name ?? "[Empresa não identificada]"}
      </span>
      <span className={styles.location}>{location}</span>
      {!!job?.steps.length && (
        <details className={styles.steps}>
          <summary>{currentStep?.label}</summary>
          <ul className={styles["step-list"]}>
            {job?.steps.map((step, index) => {
              const availableStep = candidature.current_step === index;
              const disabledClassName =
                candidature.current_step < index ? styles.disabled : "";
              const completedClassName =
                candidature.current_step > index ? styles.completed : "";

              return (
                <li
                  key={index}
                  className={`${styles["step-item"]} ${disabledClassName} ${completedClassName}`}
                  onClick={availableStep ? openStep(step) : undefined}
                >
                  {step.label}
                </li>
              );
            })}
            {candidature.current_step === job?.steps.length && (
              <li
                className={`${styles["step-item"]} ${
                  candidature.feedback ? styles.completed : ""
                }`}
              >
                {!!candidature.feedback ? (
                  <span className={styles.feedback}>Feedback</span>
                ) : (
                  <Link
                    href={`/dashboard/candidatures/${candidature._id}/feedback`}
                    className={styles.feedback}
                  >
                    Feedback
                  </Link>
                )}
              </li>
            )}
            <div
              className={styles["completed-bar"]}
              style={{
                height: `${
                  (candidature.current_step - (candidature.feedback ? 0 : 1)) *
                  2
                }rem`,
              }}
            ></div>
          </ul>
        </details>
      )}
      {stepsForm && (
        <StepModal
          steps={stepsForm}
          onClose={() => setStepsForm(null)}
          onSubmit={sendStep}
        />
      )}
      {showFeedbackModal && (
        <FeedbackModal
          onAnswer={sendStep}
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </div>
  );
};

export default CandidatureItem;
