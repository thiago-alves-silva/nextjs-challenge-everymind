import { JobFilter } from "@/types/IJobFilter";
import { useCandidateJobs } from "@/context/CandidateJobsContext";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Select from "@/components/Select";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import getJobList from "@/utils/getJobList";
import styles from "./CandidateJobFilterModal.module.css";
import displayNotification from "@/utils/displayNotification";

interface CandidateJobFilterModalProps {
  onClose: () => void;
}

const CandidateJobFilterModal = (props: CandidateJobFilterModalProps) => {
  const { filter, setFilter, setJobs } = useCandidateJobs();

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target }) => {
    setFilter((filter) => {
      const name = target.name as keyof JobFilter;

      return { ...filter, [name]: target.value };
    });
  };

  const filterJobs = () => {
    const hasFilter = Object.values(filter).some((v) => v !== null);

    if (hasFilter) {
      (async () => {
        const jobs = await getJobList(filter);

        displayNotification({
          text: "Filtro aplicado com sucesso!",
          type: "success",
        });
        setJobs(jobs);
        props.onClose();
      })();
    }
  };

  return (
    <Modal className={styles.modal} onClose={props.onClose}>
      <div className={styles.form}>
        <Select
          name="announcement_time"
          value={filter.announcement_time}
          onChange={handleOnChange}
          label="Tempo de anúncio"
          className={styles.select}
          theme="light"
        >
          <option value="">Qualquer momento</option>
          <option value="last_day">Últimas 24 horas</option>
          <option value="last_week">Última semana</option>
          <option value="last_month">Último mês</option>
        </Select>
        <Select
          name="experience_level"
          value={filter.experience_level}
          onChange={handleOnChange}
          label="Nível de experiência"
          className={styles.select}
          theme="light"
        >
          <option value=""></option>
          <option value="internship">Estágio</option>
          <option value="junior">Júnior</option>
          <option value="full">Pleno</option>
          <option value="senior">Sênior</option>
          <option value="director">Diretor</option>
        </Select>
        <Select
          name="work_model"
          value={filter.work_model}
          onChange={handleOnChange}
          label="Modelo de trabalho"
          className={styles.select}
          theme="light"
        >
          <option value=""></option>
          <option value="remote">Remoto</option>
          <option value="in_person">Presencial</option>
          <option value="hybrid">Híbrido</option>
        </Select>
        <Select
          name="location"
          value={filter.location}
          onChange={handleOnChange}
          label="Localidade"
          className={styles.select}
          theme="light"
        >
          <option value=""></option>
          <BrazilianStatesOptions />
        </Select>
      </div>
      <Button className={styles["apply-button"]} onClick={filterJobs}>
        Aplicar filtro
      </Button>
    </Modal>
  );
};

export default CandidateJobFilterModal;
