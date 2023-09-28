"use client";
import { JOB_POST } from "@/api";
import { useRouter } from "next/navigation";
import { useJobForm } from "@/context/JobFormContext";
import CurrentFormStep from "./CurrentFormStep";
import displayNotification from "@/utils/displayNotification";
import styles from "./JobForm.module.css";

const JobForm = () => {
  const { formData } = useJobForm();
  const router = useRouter();

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const { url, options } = JOB_POST(formData);
    const response = await fetch(url, options);

    if (response.ok) {
      displayNotification({
        text: "Vaga cadastrada com sucesso",
        type: "success",
      });
      router.push("/dashboard/jobs");
    } else {
      displayNotification({ text: "Falha ao cadastrar a vaga", type: "error" });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CurrentFormStep />
    </form>
  );
};

export default JobForm;
