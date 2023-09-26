"use client";
import { CandidateApi } from "@/types/ICandidate";
import { useEffect, useState } from "react";
import { CANDIDATE_PUT } from "@/api";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import RacialIdentityOptions from "@/components/RacialIdentityOptions";
import FamilyIncomeOptions from "@/components/FamilyIncomeOptions";
import Loading from "@/components/Loading";
import displayNotification from "@/utils/displayNotification";
import styles from "./SocialForm.module.css";

interface SocialFormProps {
  candidate: CandidateApi | null;
}

const SocialForm = (props: SocialFormProps) => {
  const [loading, setLoading] = useState(false);
  const [candidate, setCandidate] = useState<CandidateApi | null>(
    props.candidate
  );
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

  useEffect(() => {
    setHasChange(() => {
      for (const key in props.candidate) {
        const currentValue = candidate?.[key as keyof CandidateApi];
        const previousValue = props.candidate[key as keyof CandidateApi];

        if (currentValue !== previousValue) {
          return true;
        }
      }

      return false;
    });
  }, [candidate, props.candidate]);

  const sendSocialData: React.FormEventHandler = async (event) => {
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

  return (
    <form className={styles.form} onSubmit={sendSocialData}>
      <Select
        name="racial_identity"
        label="Identificação Racial"
        value={candidate?.racial_identity || ""}
        onChange={handleOnChange}
        theme="light"
      >
        <option value=""></option>
        <RacialIdentityOptions />
      </Select>
      <Select
        name="family_income"
        label="Renda Familiar"
        value={candidate?.family_income || ""}
        onChange={handleOnChange}
        theme="light"
      >
        <option value=""></option>
        <FamilyIncomeOptions />
      </Select>
      <Checkbox
        label="Descendente indígena"
        name="indigenous_descendancy"
        checked={candidate?.indigenous_descendancy}
        onChange={handleOnChange}
        theme="light"
      />
      <Checkbox
        label="Pessoa com deficiência"
        name="has_disability"
        checked={candidate?.has_disability}
        onChange={handleOnChange}
        theme="light"
      />
      <Checkbox
        label="LGBTQIA+"
        name="is_lgbtqia"
        checked={candidate?.is_lgbtqia}
        onChange={handleOnChange}
        theme="light"
      />
      <Button className={styles["submit-button"]} disabled={!hasChange}>
        {loading ? <Loading /> : "Salvar alterações"}
      </Button>
    </form>
  );
};

export default SocialForm;
