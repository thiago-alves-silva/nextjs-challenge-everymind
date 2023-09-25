"use client";
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import validateEmail from "@/utils/validateEmail";
import validatePhone from "@/utils/validatePhone";
import maskCnpj from "@/utils/maskCnpj";
import maskPhone from "@/utils/maskPhone";
import maskCep from "@/utils/maskCep";
import validateCep from "@/utils/validateCep";
import getAddressByCep from "@/utils/getAddressByCep";
import styles from "./CompanyForm.module.css";
import { Company } from "@/types/ICompany";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { REGISTER_COMPANY_POST } from "@/api";
import BrazilianStatesOptions from "@/components/BrazilianStatesOptions";
import { cnpjRegex } from "@/regex";
import { cookies } from "next/headers";

const CompanyForm = () => {
  const minPasswordLength = 8;
  const router = useRouter();
  const [formData, setFormData] = useState<Company>({
    name: "",
    cnpj: "",
    email: "",
    phone: "",
    cep: "",
    address: "",
    number: "",
    state: "",
    city: "",
    password: "",
    jobs: [],
  });
  const [hasMinChars, setHasMinChars] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumeric, setHasNumeric] = useState(false);
  const [hasSpecialChars, setHasSpecialChars] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validFields, setValidFields] = useState(false);

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = ({ target }) => {
    setFormData((formData) => ({ ...formData, [target.name]: target.value }));
  };
  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const { url, options } = REGISTER_COMPANY_POST(formData);
    const response = await fetch(url, options);

    if (response.ok) {
      const { token } = await response.json();

      console.log("Companhia cadastrado com sucesso!");
      document.cookie = `token=${token};Max-Age=3600;Path=/`;
      router.push("/dashboard");
    } else {
      console.log(`[${response.status}] Falha no login:`);
      console.log(await response.text());
    }
  };

  const validate = useCallback(() => {
    if (
      !formData.name ||
      !formData.address ||
      !formData.number ||
      !formData.state ||
      !formData.city
    ) {
      return false;
    }

    if (!cnpjRegex.test(formData.cnpj)) {
      return false;
    }

    if (!validateEmail(formData.email)) {
      return false;
    }

    if (!validatePhone(formData.phone)) {
      return false;
    }

    if (!validateCep(formData.cep)) {
      return false;
    }

    if (confirmPassword !== formData.password) {
      return false;
    }

    // valida os requisitos da senha
    return (
      hasMinChars &&
      hasUppercase &&
      hasLowercase &&
      hasNumeric &&
      hasSpecialChars
    );
  }, [
    confirmPassword,
    formData,
    hasLowercase,
    hasMinChars,
    hasNumeric,
    hasSpecialChars,
    hasUppercase,
  ]);

  useEffect(() => {
    setValidFields(validate());
  }, [formData, validate]);

  useEffect(() => {
    setHasMinChars(formData.password.length >= minPasswordLength);
    setHasUppercase(/[A-Z]/.test(formData.password));
    setHasLowercase(/[a-z]/.test(formData.password));
    setHasNumeric(/\d/.test(formData.password));
    setHasSpecialChars(
      /[!@#$%^&*()\-=_+[\]{}|;:'",.<>/?\\]/.test(formData.password)
    );
  }, [formData.password]);

  useEffect(() => {
    if (validateCep(formData.cep)) {
      (async () => {
        const address = await getAddressByCep(formData.cep);

        if (!("erro" in address)) {
          setFormData((formData) => {
            const { bairro, complemento, localidade, logradouro, uf } = address;
            const complement = complemento ? `, ${complemento}` : "";
            const neighborhood = bairro ? `- ${bairro}` : "";
            formData.address = `${logradouro} ${complement} ${neighborhood}`;
            formData.state = uf;
            formData.city = localidade;

            return { ...formData };
          });
        }
      })();
    } else {
      setFormData((formData) => {
        return { ...formData, address: "", state: "", city: "" };
      });
    }
  }, [formData.cep]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles["company-data-section"]}>
        <h2 className={styles.label}>
          Informa os dados cadastrais da sua empresa
        </h2>
        <Input
          name="name"
          label="Nome"
          value={formData.name}
          onChange={handleChange}
        />
        <Input
          name="cnpj"
          label="CNPJ"
          value={formData.cnpj}
          onChange={(event) => {
            const value = event.target.value;
            event.target.value = maskCnpj(value);
            handleChange(event);
          }}
        />
        <Input
          name="email"
          label="E-mail"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          label="Telefone"
          value={formData.phone}
          onChange={(event) => {
            const value = event.target.value;
            event.target.value = maskPhone(value);
            handleChange(event);
          }}
        />
        <Input
          name="cep"
          label="CEP"
          value={formData.cep}
          onChange={(event) => {
            const value = event.target.value;
            event.target.value = maskCep(value);
            handleChange(event);
          }}
        />
        <div className={styles["double-inputs"]}>
          <Input
            name="address"
            label="Endereço"
            className={styles["address-input"]}
            value={formData.address}
            onChange={handleChange}
            disabled={!formData.address}
          />
          <Input
            type="number"
            name="number"
            label="Número"
            value={formData.number}
            onChange={handleChange}
            disabled={!formData.address}
          />
        </div>
        <div className={styles["double-inputs"]}>
          <Select
            name="state"
            label="Estado"
            value={formData.state}
            onChange={handleChange}
            disabled={!formData.state}
          >
            <option value="">Selecione um estado</option>
            <BrazilianStatesOptions />
          </Select>
          <Input
            name="city"
            label="Cidade"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.city}
          />
        </div>
      </div>
      <div className={styles["password-section"]}>
        <h2 className={styles.label}>
          Defina uma senha para o seu acesso à plataforma
        </h2>
        <div className={styles["double-inputs"]}>
          <Input
            type="password"
            name="password"
            label="Senha"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            label="Confirmar senha"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
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
        </div>
      </div>
      <div className={styles["buttons-container"]}>
        <BackButton onClick={() => router.back()} />
        <Button disabled={!validFields}>Finalizar</Button>
      </div>
    </form>
  );
};

export default CompanyForm;
