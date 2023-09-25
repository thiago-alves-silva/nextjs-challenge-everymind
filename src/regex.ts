export const cpfRegex =
  /^(?!000|00|11|22|33|44|55|66|77|88|99)([0-9]{3}\.?){2}[0-9]{3}-?[0-9]{2}$/;

export const dateRegex =
  /^(?:0[1-9]|[1-2]\d|3[0-1])\/(?:0[1-9]|1[0-2])\/\d{4}$/;

export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

export const cepRegex = /^\d{5}-?\d{3}$/;

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
