import { JobApi } from "@/types/IJob";
import { useEffect, useState } from "react";
import ArrowIcon from "../../../../../public/arrow_filled_down.svg";
import Modal from "@/components/Modal";
import Loading from "@/components/Loading";
import getJobListByCompany from "@/utils/getJobListByCompany";
import getUserFromTokenOnClientSide from "@/utils/getUserFromTokenOnClientSide";
import styles from "./JobListModal.module.css";

interface JobListModalProps {
  onChange: (job: JobApi) => void;
  onClose: () => void;
}

const JobListModal = (props: JobListModalProps) => {
  const [loading, setLoading] = useState(false);
  const [jobList, setJobList] = useState<JobApi[]>([]);

  const selectJob = (job: JobApi) => {
    props.onChange(job);
    props.onClose();
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      const user = getUserFromTokenOnClientSide();
      const list = user ? await getJobListByCompany(user.id) : [];

      if (list) {
        setJobList(list);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <Modal onClose={props.onClose}>
      {loading && <Loading />}
      {!loading && !!jobList.length ? (
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
              <button className={styles.button} onClick={() => selectJob(job)}>
                <ArrowIcon className={styles.icon} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h2 className={styles["not-found"]}>Nenhuma vaga encontrada!</h2>
      )}
    </Modal>
  );
};

export default JobListModal;
