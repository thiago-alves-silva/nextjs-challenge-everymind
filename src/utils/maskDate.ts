const maskDate = (date: string): string => {
  // Remover caracteres não numéricos da data
  date = date.replace(/\D/g, "").slice(0, 8);

  // Aplicar a máscara para data (##/##/####)
  return date.replace(/^(\d{2})(\d{2})(\d{4})$/, "$1/$2/$3");
};

export default maskDate;
