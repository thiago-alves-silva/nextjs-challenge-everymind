import { cpfRegex } from "@/regex";

const validateCpf = (cpf: string): boolean => {
  if (!cpfRegex.test(cpf)) {
    return false;
  }

  // Remover caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "");

  // Verificar se o CPF tem 11 dígitos
  if (cpf.length !== 11) {
    return false;
  }

  // Verificar CPFs com dígitos repetidos (ex: 111.111.111-11)
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  // Calcular o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === parseInt(cpf.charAt(9))) {
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    return remainder === 10 || remainder === parseInt(cpf.charAt(10));
  }

  return false;
};

export default validateCpf;
