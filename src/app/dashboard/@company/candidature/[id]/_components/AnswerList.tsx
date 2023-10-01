import { Candidature } from "@/types/ICandidature";
import { Step } from "@/types/IJob";
import styles from "./AnswerList.module.css";

interface AnswerListProps {
  candidature: Candidature;
  steps: Step[];
}

const AnswerList = ({ candidature, steps }: AnswerListProps) => {
  // if (!candidature.answers?.length) {
  //   return null;
  // }

  return (
    <>
      <hr />
      <div className={styles.container}>
        <h2 className={styles.title}>Etapa do processo</h2>
        <ol className={styles["answer-list"]}>
          <li>
            <span className={styles.label}>1 - Inscrição</span>
          </li>
          {steps.slice(0, candidature.current_step).map((step, index) => {
            const answer = candidature.answers?.find((a) => a.step === index);

            return (
              <li key={index}>
                <span className={styles.label}>{`${index + 2} - ${
                  step.label
                }`}</span>
                <div className={styles["steps-container"]}>
                  {step.online ? (
                    <span>Etapa online</span>
                  ) : (
                    <ul className={styles["form-step-list"]}>
                      {answer?.values.map((value, index) => {
                        if (Array.isArray(step.questions)) {
                          const formStep = step.questions[index];

                          if (formStep) {
                            return (
                              <li key={index}>
                                <p>{formStep.label}</p>
                                <p>
                                  <b>R:</b> {[value].flat().join(", ")}
                                </p>
                              </li>
                            );
                          }
                        }
                      })}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default AnswerList;
