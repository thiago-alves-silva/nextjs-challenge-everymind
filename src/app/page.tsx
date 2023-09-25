import { Metadata } from "next";
import Wheelchair from "../../public/wheelchair.svg";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Home | EveryMind",
};

const HomePage = () => {
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>Bem-vindo(a) à nossa plataforma</h1>
        <h2 className={styles.subtitle}>
          Recrutamento e seleção para pessoas candidatas em vulnerabilidade
          social
        </h2>
        <p className={styles.description}>
          Nosso objetivo é fornecer oportunidades profissionais para pessoas que
          enfrentam vulnerabilidades sociais. Acreditamos que a diversidade é um
          componente essencial para o sucesso de qualquer organização, e estamos
          comprometidos em promover a inclusão no ambiente de trabalho.
        </p>
        <div className={styles["buttons-container"]}>
          <Link
            href={"/account/login/candidate"}
            className={`${styles.button} ${styles["candidate-button"]}`}
          >
            Quero me candidatar
          </Link>
          <Link href={"/account/login/company"} className={styles.button}>
            Sou recrutador
          </Link>
        </div>
      </div>
      <div className={styles["figure-container"]}>
        <Wheelchair />
      </div>
      <p className={styles.notice}>
        *Nosso foco está em pessoas que tenham se certificado em programas do EY
        Institute. Isso nos permite garantir que os inscritos em nossa
        plataforma tenham as habilidades necessárias para se destacar no mercado
        de trabalho
      </p>
    </main>
  );
};

export default HomePage;