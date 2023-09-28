"use client";
import { Candidature } from "@/types/ICandidature";
import { useState } from "react";
import Button from "@/components/Button";
import FeedbackModal from "./FeedbackModal";
import Link from "next/link";
import styles from "./Actions.module.css";

interface ActionsProps {
  candidature: Candidature;
}

const Actions = (props: ActionsProps) => {
  const [displayFeedback, setDisplayFeedback] = useState(false);

  return (
    <div className={styles.container}>
      <Button
        variant="secondary"
        onClick={() => setDisplayFeedback(true)}
        disabled={!props.candidature.feedback}
      >
        Visualizar feedback
      </Button>
      <Link
        href={`/api/curriculum/${props.candidature.curriculum}`}
        target="_blank"
      >
        <Button fullWidth={true}>Visualizar currículo</Button>
      </Link>
      {displayFeedback && (
        <FeedbackModal
          feedback={props.candidature.feedback ?? "Sem conteúdo de feedback."}
          onClose={() => setDisplayFeedback(false)}
        />
      )}
    </div>
  );
};

export default Actions;
