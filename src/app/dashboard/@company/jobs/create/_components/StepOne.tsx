import { JobApi } from "@/types/IJob";
import { StepFormProps } from "@/types/IStepFormProps";
import { useJobForm } from "@/context/JobFormContext";
import { useState } from "react";
import CopyIcon from "../../../../../../../public/copy.svg";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import Checkbox from "@/components/Checkbox";
import FormControls from "./FormControls";
import Input from "@/components/Input";
import JobListModal from "../../../_components/JobListModal";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import displayNotification from "@/utils/displayNotification";
import validateOnlyString from "@/utils/validateOnlyString";
import styles from "./StepOne.module.css";

const StepOne = (props: StepFormProps) => {
  const { formData, setFormData } = useJobForm();
  const [displayJobListModal, setDisplayJobListModal] = useState(false);
  const minDate = new Date().toJSON().slice(0, 10);

  const onSelectJobToImport = (job: JobApi) => {
    const timezone = new Date().getTimezoneOffset() * 60 * 1000;
    const today = new Date().setHours(0, 0, 0, 0) - timezone;
    const deadline = new Date(job.deadline_date).getTime();

    if (today >= deadline) {
      job.deadline_date = minDate;
    } else {
      job.deadline_date = job.deadline_date.slice(0, 10);
    }

    // @ts-expect-error
    delete job._id;

    setFormData(job);
  };

  const validate = (): boolean => {
    if (!formData.title.trim()) {
      displayNotification({
        text: "Preencha um título",
        type: "error",
      });
      return false;
    }

    if (!formData.state) {
      displayNotification({
        text: "Selecione um estado",
        type: "error",
      });
      return false;
    }

    if (!formData.deadline_date) {
      displayNotification({
        text: "Selecione uma data limite de candidatura",
        type: "error",
      });
      return false;
    }

    if (!formData.experience_level) {
      displayNotification({
        text: "Selecione um nível de experiência",
        type: "error",
      });
      return false;
    }

    if (!formData.work_model) {
      displayNotification({
        text: "Selecione um modelo de trabalho",
        type: "error",
      });
      return false;
    }

    if (!formData.description.trim()) {
      displayNotification({
        text: "Preencha uma descrição",
        type: "error",
      });
      return false;
    }

    if (!validateOnlyString(formData.city)) {
      displayNotification({
        text: !formData.city.trim()
          ? "Preencha uma cidade"
          : "Insira uma cidade válida",
        type: "error",
      });
      return false;
    }

    if (
      formData.salary !== null &&
      (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0)
    ) {
      displayNotification({
        text: "Insira uma valor de salário válido",
        type: "error",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <div>
        <button
          type="button"
          className={styles["import-button"]}
          onClick={() => setDisplayJobListModal(true)}
        >
          Importar dados de uma vaga já existente
          <CopyIcon />
        </button>
      </div>
      <Input
        label="Título do cargo"
        name="title"
        value={formData.title}
        onChange={props.handleOnChange}
        theme="light"
      />
      <div className={styles["double-inputs"]}>
        <Select
          label="Estado"
          name="state"
          value={formData.state}
          onChange={props.handleOnChange}
          theme="light"
        >
          <option value=""></option>
          <BrazilianStatesOptions />
        </Select>
        <Input
          label="Cidade"
          name="city"
          theme="light"
          value={formData.city}
          onChange={props.handleOnChange}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Input
          label="Prazo de candidatura"
          name="deadline_date"
          type="date"
          theme="light"
          value={formData.deadline_date}
          onChange={props.handleOnChange}
          min={minDate}
        />
        <Select
          label="Nível de experiência"
          name="experience_level"
          value={formData.experience_level}
          onChange={props.handleOnChange}
          theme="light"
        >
          <option value=""></option>
          <option value="internship">Estágio</option>
          <option value="junior">Júnior</option>
          <option value="full">Pleno</option>
          <option value="senior">Senior</option>
          <option value="director">Diretor</option>
        </Select>
      </div>
      <div className={styles["double-inputs"]}>
        <Select
          label="Modelo de trabalho"
          name="work_model"
          value={formData.work_model}
          onChange={props.handleOnChange}
          theme="light"
        >
          <option value=""></option>
          <option value="hybrid">Híbrido</option>
          <option value="in_person">Presencial</option>
          <option value="remote">Remoto</option>
        </Select>
        <div className={styles["salary"]}>
          <Input
            label="Salário"
            name="salary"
            type="number"
            theme="light"
            value={formData.salary ? formData.salary : ""}
            onChange={props.handleOnChange}
          />
          <Checkbox
            label="A combinar"
            name="salary"
            checked={formData.salary === null}
            onChange={props.handleOnChange}
            className={styles["salary-checkbox"]}
            theme="light"
          />
        </div>
      </div>
      <Textarea
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={props.handleOnChange}
        className={styles.textarea}
      />
      <FormControls validate={validate} />
      {displayJobListModal && (
        <JobListModal
          onChange={onSelectJobToImport}
          onClose={() => setDisplayJobListModal(false)}
        />
      )}
    </>
  );
};

export default StepOne;
