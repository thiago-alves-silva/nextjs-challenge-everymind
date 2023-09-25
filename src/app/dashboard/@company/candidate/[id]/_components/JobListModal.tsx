import { JobApi } from "@/types/IJob";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ArrowIcon from "../../../../../../../public/arrow_right.svg";
import Modal from "@/components/Modal";
import getJobListByCompany from "@/utils/getJobListByCompany";
import getUserFromTokenOnClientSide from "@/utils/getUserFromTokenOnClientSide";
import styles from "./JobListModal.module.css";

interface JobListModalProps {
  onClose: () => void;
}

const JobListModal = (props: JobListModalProps) => {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState<JobApi[]>([]);
  const params = useParams();

  const sendJobInvitation = (jobId: string) => {
    const candidateId = params.id;

    console.log(
      `Enviar convite da vaga ${jobId} para o candidato ${candidateId}`
    );

    props.onClose();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = getUserFromTokenOnClientSide();
      const list = user ? await getJobListByCompany(user?.id) : [];

      if (list) {
        setJobList(list);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      {loading && <span>Carregando...</span>}
      {!loading && !jobList.length && (
        <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
      )}
      {!loading && !!jobList.length && (
        <ul className={styles["job-list"]}>
          {jobList.map((job) => (
            <li key={job._id} className={styles.item}>
              <div>
                <span className={styles.title}>{job.title}</span>
                <span className={styles.id}>{`#${job._id}`}</span>
              </div>
              <span
                className={styles.location}
              >{`${job.city} - ${job.state}`}</span>
              <button
                className={styles.button}
                onClick={() => sendJobInvitation(job._id)}
              >
                <ArrowIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
};

export default JobListModal;
