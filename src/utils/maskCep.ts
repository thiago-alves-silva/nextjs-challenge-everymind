const maskCep = (cep: string): string => {
  // Remover caracteres não numéricos do CEP
  cep = cep.replace(/\D/g, "").slice(0, 8);

  // Aplicar a máscara para CEP (#####-###)
  return cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
};

export default maskCep;
