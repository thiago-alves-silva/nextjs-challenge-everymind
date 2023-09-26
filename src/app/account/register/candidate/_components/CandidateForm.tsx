"use client";
import { CANDIDATE_POST } from "@/api";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { useRouter } from "next/navigation";
import CurrentFormStep from "./CurrentFormStep";
import displayNotification from "@/utils/displayNotification";
import styles from "./CandidateForm.module.css";

const CandidateForm = () => {
  const { formData } = useCandidateForm();
  const router = useRouter();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const { url, options } = CANDIDATE_POST(formData);
    const response = await fetch(url, options);

    if (response.ok) {
      const { token } = await response.json();

      document.cookie = `token=${token};Max-Age=3600;Path=/`;
      displayNotification({
        text: "Cadastro realizado com sucesso",
        type: "success",
      });
      router.push("/dashboard");
    } else {
      displayNotification({
        text: "Erro ao realizar o cadastro",
        type: "error",
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CurrentFormStep />
    </form>
  );
};

export default CandidateForm;
