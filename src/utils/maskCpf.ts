const maskCpf = (cpf: string): string => {
  // Remover caracteres não numéricos do CPF
  cpf = cpf.replace(/\D/g, "").slice(0, 11);

  // Aplicar a máscara para CPF (###.###.###-##)
  return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
};

export default maskCpf;
