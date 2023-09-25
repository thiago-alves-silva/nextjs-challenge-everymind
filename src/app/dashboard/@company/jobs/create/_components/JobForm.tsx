"use client";
import { JOB_POST } from "@/api";
import { useRouter } from "next/navigation";
import { useJobForm } from "@/context/JobFormContext";
import CurrentFormStep from "./CurrentFormStep";
import styles from "./JobForm.module.css";
import getCookieByName from "@/utils/getCookieByName";

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
      console.log("Vaga criada com sucesso!");
      router.push("/dashboard/jobs");
    } else {
      console.log("Erro ao criar uma vaga");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CurrentFormStep />
    </form>
  );
};

export default JobForm;
