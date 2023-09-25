import { cepRegex } from "@/regex";

const validateCep = (cep: string): boolean => {
  return cepRegex.test(cep);
};

export default validateCep;
