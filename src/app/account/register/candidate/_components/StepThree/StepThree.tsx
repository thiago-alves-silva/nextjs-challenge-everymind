"use client";
import { StepFormProps } from "@/types/IStepFormProps";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { useEffect, useState } from "react";
import SwitchButton from "@/components/SwitchButton";
import Select from "@/components/Select";
import Checkbox from "@/components/Checkbox";
import FormControls from "../FormControls";
import RacialIdentityOptions from "@/components/RacialIdentityOptions";
import FamilyIncomeOptions from "@/components/FamilyIncomeOptions";
import styles from "./StepThree.module.css";
import displayNotification from "@/utils/displayNotification";

const StepThree = (props: StepFormProps) => {
  const { formData, setFormData } = useCandidateForm();
  const [notAnswer, setNotAnswer] = useState(false);

  const validate = (): boolean => {
    if (notAnswer) {
      return true;
    }

    if (!formData.racial_identity) {
      displayNotification({
        text: "Selecione uma identidade racial",
        type: "error",
      });
      return false;
    }

    if (!formData.family_income) {
      displayNotification({
        text: "Selecione uma renda familiar",
        type: "error",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (notAnswer) {
      setFormData((formData) => {
        return {
          ...formData,
          racial_identity: null,
          family_income: null,
          indigenous_descendancy: null,
          has_disability: null,
          is_lgbtqia: null,
        };
      });
    }
  }, [notAnswer, setFormData]);

  return (
    <>
      <div className={styles["not-answer"]}>
        <span>Prefiro não responder</span>
        <SwitchButton onChange={setNotAnswer} />
      </div>
      <Select
        name="racial_identity"
        label="Identificação racial"
        value={formData.racial_identity}
        onChange={props.handleOnChange}
        disabled={notAnswer}
      >
        <option value=""></option>
        <RacialIdentityOptions />
      </Select>
      <Select
        label="Renda familiar"
        name="family_income"
        value={formData.family_income}
        onChange={props.handleOnChange}
        disabled={notAnswer}
      >
        <option value=""></option>
        <FamilyIncomeOptions />
      </Select>
      <Checkbox
        label="Descendente indígena"
        name="indigenous_descendancy"
        checked={formData.indigenous_descendancy}
        onChange={props.handleOnChange}
        disabled={notAnswer}
      />
      <Checkbox
        label="Pessoa com deficiência"
        name="has_disability"
        checked={formData.has_disability}
        onChange={props.handleOnChange}
        disabled={notAnswer}
      />
      <Checkbox
        label="LGBTQIA+"
        name="is_lgbtqia"
        checked={formData.is_lgbtqia}
        onChange={props.handleOnChange}
        disabled={notAnswer}
      />
      <FormControls validate={validate} />
    </>
  );
};

export default StepThree;
