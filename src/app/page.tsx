import { Metadata } from "next";
import Wheelchair from "../../public/wheelchair.svg";
import Link from "next/link";
import styles from "./page.module.css";
import Acessibility from "@/components/Acessibility";

export const metadata: Metadata = {
  title: "Home | EveryMind",
};

const HomePage = () => {
  return (
    <>
      <header className={styles.header}>
        <Acessibility />
      </header>
      <main className={styles.main}>
        <div>
          <h1 className={styles.title}>
            Bem-vindo(a) à <br /> nossa plataforma
          </h1>
          <h2 className={styles.subtitle}>
            Recrutamento e seleção para pessoas candidatas em vulnerabilidade
            social
          </h2>
          <p className={styles.description}>
            Nosso objetivo é fornecer oportunidades profissionais para pessoas
            que enfrentam vulnerabilidades sociais. Acreditamos que a
            diversidade é um componente essencial para o sucesso de qualquer
            organização, e estamos comprometidos em promover a inclusão no
            ambiente de trabalho.
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
      </main>
    </>
  );
};

export default HomePage;
