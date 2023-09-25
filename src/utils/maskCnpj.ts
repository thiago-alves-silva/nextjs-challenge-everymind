const maskCnpj = (cnpj: string): string => {
  // Remover caracteres não numéricos do CNPJ
  cnpj = cnpj.replace(/\D/g, "").slice(0, 14);

  // Aplicar a máscara para CNPJ (##.###.###/####-##)
  return cnpj.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
};

export default maskCnpj;
