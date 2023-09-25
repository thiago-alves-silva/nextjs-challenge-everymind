"use client";
import Button from "@/components/Button";
import styles from "./Actions.module.css";
import { useState } from "react";
import JobListModal from "./JobListModal";

const Actions = () => {
  const [displayJobListModal, setDisplayJobListModal] = useState(false);

  return (
    <>
      <div className={styles.actions}>
        <Button onClick={() => setDisplayJobListModal(true)}>
          Convidar para vaga
        </Button>
      </div>
      {displayJobListModal && (
        <JobListModal onClose={() => setDisplayJobListModal(false)} />
      )}
    </>
  );
};

export default Actions;
