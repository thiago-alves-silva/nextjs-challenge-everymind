"use client";
import Button from "@/components/Button";
import Textarea from "@/components/Textarea";
import styles from "./FeedbackForm.module.css";
import { useEffect, useState } from "react";
import { CANDIDATURE_PUT } from "@/api";
import { useRouter } from "next/navigation";
import getCandidature from "@/utils/getCandidature";
import { Candidature } from "@/types/ICandidature";

interface FeedbackFormProps {
  candidatureId: string;
}

const FeedbackForm = (props: FeedbackFormProps) => {
  const [candidature, setCandidature] = useState<Candidature | null>(null);
  const [feedback, setFeedback] = useState("");
  const [hasFeedback, setHasFeedback] = useState(false);
  const router = useRouter();

  const sendFeedback: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const { url, options } = CANDIDATURE_PUT(props.candidatureId, {
      feedback,
      current_step: candidature?.current_step ?? 0,
    });
    const response = await fetch(url, options);

    if (response.ok) {
      console.log(
        `Feedback enviado com sucesso para a candidatura ${props.candidatureId}`
      );
      router.push("/dashboard/candidatures?feedback");
    }
  };

  useEffect(() => {
    (async () => {
      const candidature = await getCandidature(props.candidatureId);

      setCandidature(candidature);

      if (candidature?.feedback) {
        setFeedback(candidature.feedback);
        setHasFeedback(true);
      }
    })();
  }, [props.candidatureId]);

  return (
    <form onSubmit={sendFeedback}>
      <Textarea
        name="feedback"
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className={styles.textarea}
        disabled={hasFeedback}
      />
      <div className={styles["buttons-container"]}>
        <Button disabled={!feedback || hasFeedback}>Enviar feedback</Button>
      </div>
    </form>
  );
};

export default FeedbackForm;
