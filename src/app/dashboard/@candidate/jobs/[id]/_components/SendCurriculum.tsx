import Button from "@/components/Button";
import styles from "./SendCurriculum.module.css";

interface SendCurriculumProps {
  file?: File;
  onSelectFile: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.MouseEventHandler;
}

const SendCurriculum = (props: SendCurriculumProps) => {
  return (
    <div>
      <h3 className={styles.title}>Envie seu currículo</h3>
      <p className={styles.description}>
        Para concluir a sua candidatura para esta vaga, envie seu currículo para
        que possamos enviar para a empresa recrutadora.
      </p>
      <div className={styles["actions-container"]}>
        <span className={styles.filename} title={props.file?.name}>
          {props.file?.name}
        </span>
        <input
          type="file"
          accept=".pdf"
          id="curriculum"
          className={styles["file-input"]}
          onChange={props.onSelectFile}
        />
        <label htmlFor="curriculum" className={styles["upload-button"]}>
          Carregar currículo
        </label>
        <Button onClick={props.onSubmit} disabled={!props.file}>
          Enviar
        </Button>
      </div>
    </div>
  );
};

export default SendCurriculum;
