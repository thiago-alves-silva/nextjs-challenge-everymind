"use client";
import { JobApi } from "@/types/IJob";
import { useParams } from "next/navigation";
import { useState } from "react";
import Button from "@/components/Button";
import JobListModal from "../../../_components/JobListModal";
import styles from "./Actions.module.css";

const Actions = () => {
  const [displayJobListModal, setDisplayJobListModal] = useState(false);
  const params = useParams();

  const sendJobInvitation = (job: JobApi) => {
    const candidateId = params.id;
    console.log(
      `Enviar convite da vaga ${job._id} para o candidato ${candidateId}`
    );
  };

  return (
    <>
      <div className={styles.actions}>
        <Button onClick={() => setDisplayJobListModal(true)}>
          Convidar para vaga
        </Button>
      </div>
      {displayJobListModal && (
        <JobListModal
          onChange={sendJobInvitation}
          onClose={() => setDisplayJobListModal(false)}
        />
      )}
    </>
  );
};

export default Actions;
