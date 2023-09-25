import { Metadata } from "next";
import { JobFormProvider } from "@/context/JobFormContext";
import DashboardModal from "@/components/DashboardModal";
import FormDescription from "./_components/FormDescription";
import JobForm from "./_components/JobForm";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Criar uma nova vaga",
};

const CompanyDashboardCreateJobPage = () => {
  return (
    <DashboardModal>
      <JobFormProvider>
        <div className={styles.container}>
          <FormDescription />
          <JobForm />
        </div>
      </JobFormProvider>
    </DashboardModal>
  );
};

export default CompanyDashboardCreateJobPage;
