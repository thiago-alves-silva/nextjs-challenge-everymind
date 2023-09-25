import AccountModal from "@/components/AccountModal";
import CompanyForm from "./_components/CompanyForm";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastre sua empresa",
};

const RegisterCompanyPage = () => {
  return (
    <AccountModal className={styles.modal}>
      <CompanyForm />
    </AccountModal>
  );
};

export default RegisterCompanyPage;
