import { StepFormProps } from "@/types/IStepFormProps";
import { useJobForm } from "@/context/JobFormContext";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import Checkbox from "@/components/Checkbox";
import FormControls from "./FormControls";
import Input from "@/components/Input";
import Select from "@/components/Select";
import Textarea from "@/components/Textarea";
import styles from "./StepOne.module.css";

const StepOne = (props: StepFormProps) => {
  const { formData } = useJobForm();
  const minDate = new Date().toJSON().slice(0, 10);

  const validate = (): boolean => {
    if (
      !formData.title.trim() ||
      !formData.state ||
      !formData.city.trim() ||
      !formData.deadline_date ||
      !formData.experience_level ||
      !formData.work_model ||
      !formData.description.trim()
    ) {
      return false;
    }

    if (
      formData.salary !== null &&
      (isNaN(Number(formData.salary)) || Number(formData.salary) <= 0)
    ) {
      return false;
    }

    return true;
  };

  return (
    <>
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
    </>
  );
};

export default StepOne;
