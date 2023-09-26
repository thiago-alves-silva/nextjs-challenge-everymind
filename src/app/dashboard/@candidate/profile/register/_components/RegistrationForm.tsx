"use client";
import { dateRegex } from "@/regex";
import { CandidateApi } from "@/types/ICandidate";
import { useCallback, useEffect, useState } from "react";
import { CANDIDATE_PUT } from "@/api";
import { useRouter } from "next/navigation";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import Select from "@/components/Select";
import maskPhone from "@/utils/maskPhone";
import maskDate from "@/utils/maskDate";
import validatePhone from "@/utils/validatePhone";
import styles from "./RegistrationForm.module.css";
import displayNotification from "@/utils/displayNotification";

interface RegistrationFormProps {
  candidate: CandidateApi | null;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState<CandidateApi | null>(
    props.candidate
  );
  const [validFields, setValidFields] = useState(false);
  const [hasChange, setHasChange] = useState(false);
  const router = useRouter();

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target }) => {
    setCandidate((candidate) => {
      if (candidate) {
        const name = target.name as keyof CandidateApi;

        if (target instanceof HTMLInputElement && target.type === "checkbox") {
          return { ...candidate, [name]: target.checked };
        }

        return { ...candidate, [name]: target.value };
      }

      return null;
    });
  };

  const validate = useCallback(() => {
    if (!candidate?.name.trim()) {
      return false;
    }

    if (!validatePhone(candidate?.phone)) {
      return false;
    }

    if (!dateRegex.test(candidate?.birthdate)) {
      return false;
    }

    return true;
  }, [candidate]);

  const sendRegistrationData: React.FormEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { url, options } = CANDIDATE_PUT(candidate);
    const response = await fetch(url, options);

    if (response.ok) {
      displayNotification({
        text: "Dados alterados com sucesso",
        type: "success",
      });
      setHasChange(false);
      router.refresh();
    } else {
      displayNotification({
        text: "Erro na alteração dos dados",
        type: "error",
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    setValidFields(validate());
    setHasChange(() => {
      for (const key in props.candidate) {
        const currentValue = candidate?.[key as keyof CandidateApi] ?? "";
        const previousValue = props.candidate[key as keyof CandidateApi] ?? "";

        if (currentValue !== previousValue) {
          return true;
        }
      }

      return false;
    });
  }, [candidate, props.candidate, validate]);

  useEffect(() => {
    setCandidate(props.candidate);
  }, [props.candidate]);

  return (
    <form className={styles.form} onSubmit={sendRegistrationData}>
      <Input
        name="name"
        label="Nome completo"
        theme="light"
        value={candidate?.name || ""}
        onChange={handleOnChange}
      />
      <div className={styles["double-inputs"]}>
        <Input
          name="cpf"
          label="CPF"
          theme="light"
          value={candidate?.cpf || ""}
          onChange={undefined}
          disabled={true}
        />
        <Input
          name="email"
          label="E-mail"
          theme="light"
          value={candidate?.email || ""}
          onChange={undefined}
          disabled={true}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Input
          name="phone"
          label="Telefone"
          theme="light"
          value={candidate?.phone || ""}
          onChange={(event) => {
            const value = maskPhone(event.target.value);
            event.target.value = value;
            handleOnChange(event);
          }}
        />
        <Input
          name="birthdate"
          label="Data de nascimento"
          theme="light"
          value={candidate?.birthdate || ""}
          onChange={(event) => {
            const value = maskDate(event.target.value);
            event.target.value = value;
            handleOnChange(event);
          }}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Select
          name="state"
          label="Estado"
          value={candidate?.state || ""}
          onChange={handleOnChange}
          theme="light"
        >
          <option value=""></option>
          <BrazilianStatesOptions />
        </Select>
        <Input
          name="city"
          label="Cidade"
          theme="light"
          value={candidate?.city || ""}
          onChange={handleOnChange}
        />
      </div>
      <Button
        className={styles["submit-button"]}
        disabled={!validFields || !hasChange || loading}
      >
        {loading ? <Loading /> : "Salvar alterações"}
      </Button>
    </form>
  );
};

export default RegistrationForm;
