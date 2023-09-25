"use client";
import { Company } from "@/types/ICompany";
import { UPDATE_COMPANY_PUT } from "@/api";
import { useCallback, useEffect, useState } from "react";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import maskCep from "@/utils/maskCep";
import maskPhone from "@/utils/maskPhone";
import validateCep from "@/utils/validateCep";
import validatePhone from "@/utils/validatePhone";
import styles from "./RegistrationForm.module.css";

interface RegistrationFormProps {
  company: Company | null;
}

const RegistrationForm = (props: RegistrationFormProps) => {
  const [company, setCompany] = useState<Company | null>(props.company);
  const [validFields, setValidFields] = useState(false);
  const [hasChange, setHasChange] = useState(false);

  const handleOnChange: React.ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement
  > = ({ target }) => {
    setCompany((company) => {
      if (company) {
        const name = target.name as keyof Company;

        if (target instanceof HTMLInputElement && target.type === "checkbox") {
          return { ...company, [name]: target.checked };
        }

        return { ...company, [name]: target.value };
      }

      return null;
    });
  };

  const validate = useCallback(() => {
    if (
      !company?.name.trim() ||
      !company?.address.trim() ||
      (company?.number && !String(company?.number).trim()) ||
      !company?.state.trim() ||
      !company?.city.trim()
    ) {
      return false;
    }

    if (!validatePhone(company?.phone)) {
      return false;
    }

    if (!validateCep(company?.cep)) {
      return false;
    }

    return true;
  }, [company]);

  useEffect(() => {
    setValidFields(validate());
    setHasChange(() => {
      for (const key in props.company) {
        const currentValue = company?.[key as keyof Company] ?? "";
        const previousValue = props.company[key as keyof Company] ?? "";

        if (currentValue !== previousValue) {
          return true;
        }
      }

      return false;
    });
  }, [company, props.company, validate]);

  const sendRegistrationData: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const payload = { ...company };
    delete payload._id;

    const { url, options } = UPDATE_COMPANY_PUT(payload);
    const response = await fetch(url, options);

    if (response.ok) {
      console.log("Dados cadastrais do candidato atualizados com sucesso!");
      setHasChange(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={sendRegistrationData}>
      <Input
        name="name"
        label="Nome completo"
        theme="light"
        value={company?.name || ""}
        onChange={handleOnChange}
      />
      <div className={styles["double-inputs"]}>
        <Input
          name="cnpj"
          label="CNPJ"
          theme="light"
          value={company?.cnpj || ""}
          onChange={undefined}
          disabled={true}
        />
        <Input
          name="email"
          label="E-mail"
          theme="light"
          value={company?.email || ""}
          onChange={undefined}
          disabled={true}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Input
          name="phone"
          label="Telefone"
          theme="light"
          value={company?.phone || ""}
          onChange={(event) => {
            const value = maskPhone(event.target.value);
            event.target.value = value;
            handleOnChange(event);
          }}
        />
        <Input
          name="cep"
          label="CEP"
          theme="light"
          value={company?.cep || ""}
          onChange={(event) => {
            const value = maskCep(event.target.value);
            event.target.value = value;
            handleOnChange(event);
          }}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Input
          name="address"
          label="Endereço"
          theme="light"
          value={company?.address || ""}
          onChange={handleOnChange}
        />
        <Input
          name="number"
          label="Número"
          type="number"
          theme="light"
          value={String(company?.number) || ""}
          onChange={handleOnChange}
        />
      </div>
      <div className={styles["double-inputs"]}>
        <Select
          name="state"
          label="Estado"
          value={company?.state || ""}
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
          value={company?.city || ""}
          onChange={handleOnChange}
        />
      </div>
      <Button
        className={styles["submit-button"]}
        disabled={!validFields || !hasChange}
      >
        Salvar alterações
      </Button>
    </form>
  );
};

export default RegistrationForm;
