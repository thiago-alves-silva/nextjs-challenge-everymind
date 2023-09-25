const maskPhone = (phone: string): string => {
  // Remover caracteres não numéricos do telefone
  phone = phone.replace(/\D/g, "").slice(0, 11);

  // Aplicar a máscara para telefone com DDD (## #####-####)
  return phone.replace(/^(\d{2})(\d{4,5})(\d{4})$/, "($1) $2-$3");
};

export default maskPhone;
