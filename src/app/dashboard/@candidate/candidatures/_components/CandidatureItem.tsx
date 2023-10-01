"use client";
import { CANDIDATURE_PUT } from "@/api";
import { CandidatureWithJobAndCompany } from "@/types/ICandidature";
import { Step, FormStep } from "@/types/IJob";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { WorkModel } from "@/types/WorkModel";
import ConfirmationModal from "./ConfirmationModal";
import Link from "next/link";
import StepModal from "./StepModal";
import displayNotification from "@/utils/displayNotification";
import normalizeWorkModel from "@/utils/normalizeWorkModel";
import styles from "./CandidatureItem.module.css";
import Image from "next/image";
import normalizeExperienceLevel from "@/utils/normalizeExperienceLevel";
import ResultModal from "./ResultModal";

interface CandidatureProps {
  candidature: CandidatureWithJobAndCompany;
}

const CandidatureItem = ({ candidature }: CandidatureProps) => {
  const [stepsForm, setStepsForm] = useState<FormStep[] | null>(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [displayResultModal, setDisplayResultModal] = useState(false);
  const { job, company } = candidature;
  const location = `${job?.city ?? ""} - ${
    job?.state ?? ""
  } (${normalizeWorkModel(job?.work_model as WorkModel)})`;
  const currentStep = job?.steps[candidature.current_step];
  const router = useRouter();
  const searchParams = useSearchParams();

  const openStep = (step: Step) => () => {
    if (typeof step.questions === "string") {
      window.open(step.questions, "_blank");
      document.onvisibilitychange = (event) => {
        if (event.currentTarget instanceof Document) {
          const visibilityState = event.currentTarget.visibilityState;

          if (visibilityState === "visible") {
            document.onvisibilitychange = null;
            setDisplayConfirmationModal(true);
          }
        }
      };
    } else {
      setStepsForm(step.questions);
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

  const currentStepLabel = () => {
    if (candidature.result) {
      return "Visualizar devolutiva";
    }

    if (candidature.current_step === job?.steps.length) {
      if (candidature.feedback) {
        return "Aguardando devolutiva";
      }

      return "Feedback (opcional)";
    }

    return currentStep?.label;
  };

  useEffect(() => {
    const returnFromFeedback = searchParams.has("feedback");

    if (returnFromFeedback) {
      router.refresh();
    }
  }, [router, searchParams]);

  return (
    <div className={styles.item}>
      <div className={styles.image}>
        <Image
          src={`/api/company/image/${company?.profile_image}`}
          alt="Foto de perfil"
          width={64}
          height={64}
        />
      </div>
      <Link href={`/dashboard/jobs/${job?.id}`} className={styles.title}>
        {job
          ? job.title + ` - ${normalizeExperienceLevel(job.experience_level)}`
          : "[Sem título]"}
      </Link>
      <Link
        href={`/dashboard/company/${company?._id}`}
        className={styles.company}
      >
        {candidature.company?.name ?? "[Empresa não identificada]"}
      </Link>
      <span className={styles.location}>{location}</span>
      <details className={styles.steps}>
        <summary>{currentStepLabel()}</summary>
        <ul className={styles["step-list"]}>
          <li className={`${styles["step-item"]} ${styles.completed}`}>
            Inscrição
          </li>
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
            <>
              <li
                className={`${styles["step-item"]} ${
                  !!candidature.feedback ? styles.completed : ""
                }`}
              >
                <Link
                  href={`/dashboard/candidatures/${candidature._id}/feedback`}
                >
                  Feedback (opcional)
                </Link>
              </li>
              {candidature.result ? (
                <li
                  className={`${styles["step-item"]} ${styles.completed} ${styles.result}`}
                  onClick={() => setDisplayResultModal(true)}
                >
                  Visualizar devolutiva
                </li>
              ) : (
                <li className={`${styles["step-item"]} ${styles.waiting}`}>
                  Aguardando devolutiva
                </li>
              )}
            </>
          )}
          <div
            className={styles["completed-bar"]}
            style={{
              height: `${
                (candidature.current_step - (candidature.feedback ? 0 : 1)) * 2
              }rem`,
            }}
          ></div>
        </ul>
      </details>
      {stepsForm && (
        <StepModal
          steps={stepsForm}
          onClose={() => setStepsForm(null)}
          onSubmit={sendStep}
        />
      )}
      {displayConfirmationModal && (
        <ConfirmationModal
          onAnswer={sendStep}
          onClose={() => setDisplayConfirmationModal(false)}
        />
      )}
      {displayResultModal && (
        <ResultModal
          candidature={candidature}
          onClose={() => setDisplayResultModal(false)}
        />
      )}
    </div>
  );
};

export default CandidatureItem;
