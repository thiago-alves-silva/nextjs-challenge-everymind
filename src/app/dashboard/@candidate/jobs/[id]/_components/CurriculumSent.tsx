import Button from "@/components/Button";
import styles from "./CurriculumSent.module.css";
import Link from "next/link";

const CurriculumSent = () => {
  return (
    <div>
      <h2 className={styles.title}>Candidatura realizada com sucesso!</h2>
      <div className={styles["apply-container"]}>
        <Link href={"/dashboard/jobs"}>
          <Button variant="secondary">Visualizar as vagas</Button>
        </Link>
        <Link href={"/dashboard/candidatures"}>
          <Button>Minhas candidaturas</Button>
        </Link>
      </div>
    </div>
  );
};

export default CurriculumSent;
