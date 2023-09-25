"use client";
import CurrentFormStep from "./CurrentFormStep";
import styles from "./CandidateForm.module.css";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { REGISTER_CANDIDATE_POST } from "@/api";
import { useRouter } from "next/navigation";

const CandidateForm = () => {
  const { formData } = useCandidateForm();
  const router = useRouter();

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    document.cookie = `user=candidate`;
    const { url, options } = REGISTER_CANDIDATE_POST(formData);
    const response = await fetch(url, options);

    if (response.ok) {
      const { token } = await response.json();

      console.log("Candidato cadastrado com sucesso!");
      document.cookie = `token=${token};Max-Age=3600;Path=/`;
      router.push("/dashboard");
    } else {
      console.log("falha no cadastro");
      console.log(await response.text());
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <CurrentFormStep />
    </form>
  );
};

export default CandidateForm;
