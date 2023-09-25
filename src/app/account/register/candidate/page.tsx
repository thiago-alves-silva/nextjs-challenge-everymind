import AccountModal from "@/components/AccountModal";
import FormDescription from "./_components/FormDescription";
import CandidateForm from "./_components/CandidateForm";
import styles from "./page.module.css";
import { CandidateFormProvider } from "@/context/CandidateFormContext";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre sua conta",
};

const RegisterCandidatePage = () => {
  return (
    <CandidateFormProvider>
      <div className={styles.container}>
        <div className={styles["stepper-container"]}>
          <FormDescription />
        </div>
        <AccountModal className={styles["form-container"]}>
          <CandidateForm />
        </AccountModal>
      </div>
    </CandidateFormProvider>
  );
};

export default RegisterCandidatePage;
