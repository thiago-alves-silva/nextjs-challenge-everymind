"use client";
import { StepFormProps } from "@/types/IStepFormProps";
import { useCandidateForm } from "@/context/CandidateFormContext";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import PasswordIcon from "../../../../../../../public/password.svg";
import FormControls from "../FormControls";
import styles from "./StepTwo.module.css";
import displayNotification from "@/utils/displayNotification";

const StepTwo = (props: StepFormProps) => {
  const minLength = 8;
  const { formData } = useCandidateForm();
  const [hasMinChars, setHasMinChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumeric, setHasNumeric] = useState(false);
  const [hasSpecialChars, setHasSpecialChars] = useState(false);

  const validate = (): boolean => {
    if (!formData.confirm_password.trim() || !formData.password.trim()) {
      displayNotification({
        text: "Preencha todos os campos",
        type: "error",
      });
    }

    if (formData.confirm_password !== formData.password) {
      displayNotification({
        text: "As senhas não possuem o mesmo valor",
        type: "error",
      });
      return false;
    }

    if (!hasMinChars) {
      displayNotification({
        text: `A senhas deve conter no mínimo ${minLength} caracteres`,
        type: "error",
      });
      return false;
    }

    if (!hasUppercase) {
      displayNotification({
        text: `A senhas deve conter letras maiúsculas`,
        type: "error",
      });
      return false;
    }

    if (!hasLowercase) {
      displayNotification({
        text: `A senhas deve conter letras minúsculas`,
        type: "error",
      });
      return false;
    }

    if (!hasNumeric) {
      displayNotification({
        text: `A senhas deve conter números`,
        type: "error",
      });
      return false;
    }

    if (!hasSpecialChars) {
      displayNotification({
        text: `A senhas deve conter caracteres especiais`,
        type: "error",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    setHasMinChars(formData.password.length >= minLength);
    setHasUppercase(/[A-Z]/.test(formData.password));
    setHasLowercase(/[a-z]/.test(formData.password));
    setHasNumeric(/\d/.test(formData.password));
    setHasSpecialChars(
      /[!@#$%^&*()\-=_+[\]{}|;:'",.<>/?\\]/.test(formData.password)
    );
  }, [formData.password]);

  return (
    <>
      <Input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={props.handleOnChange}
      >
        <PasswordIcon />
      </Input>
      <Input
        type="password"
        name="confirm_password"
        placeholder="Confirme sua senha"
        value={formData.confirm_password}
        onChange={props.handleOnChange}
      >
        <PasswordIcon />
      </Input>
      <div className={styles.requirements}>
        <p className={hasMinChars ? styles.valid : ""}>
          A senha deve conter pelo menos 8 caracteres
        </p>
        <p className={hasUppercase && hasLowercase ? styles.valid : ""}>
          A senha deve conter letras maiúsculas e minúsculas
        </p>
        <p className={hasNumeric ? styles.valid : ""}>
          A senha deve caracteres numéricos
        </p>
        <p className={hasSpecialChars ? styles.valid : ""}>
          A senha deve caracteres especiais
        </p>
      </div>
      <FormControls validate={validate} />
    </>
  );
};

export default StepTwo;
