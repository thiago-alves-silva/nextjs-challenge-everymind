import { Candidature } from "@/types/ICandidature";
import Modal from "@/components/Modal";
import styles from "./ResultModal.module.css";

interface ResultModalProps {
  candidature: Candidature;
  onClose: () => void;
}

const ResultModal = (props: ResultModalProps) => {
  const approved = props.candidature?.result?.approved;

  return (
    <Modal onClose={props.onClose}>
      <p
        className={`${styles.result} ${
          styles[approved ? "approved" : "disapproved"]
        }`}
      >
        {approved
          ? "Parabéns, você foi aprovado no processo seletivo!"
          : "Infelizmente você não foi selecionado para a vaga."}
      </p>
      {approved && (
        <p className={styles.orientation}>
          Fique atento a sua caixa de e-mails e ao seu telefone, pois a empresa
          tentará contato com você.
        </p>
      )}
      <p className={styles.return}>
        <b className={styles.label}>Devolutiva: </b>
        <p>
          {props.candidature?.result?.return ??
            "dhqiow hd hqwo hdqw j dpoiqwj  hdqow hdoqw hdqwo hdoqw"}
        </p>
      </p>
    </Modal>
  );
};

export default ResultModal;
