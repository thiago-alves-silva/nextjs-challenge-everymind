const formatToCurrency = (value: number) => {
  return Intl.NumberFormat("pt-br", {
    currency: "BRL",
    style: "currency",
  }).format(value);
};

export default formatToCurrency;
