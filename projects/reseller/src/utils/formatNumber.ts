export const formatNumber = (value: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    // minimumFractionDigits: 2,
    // maximumFractionDigits: 2,
  }).format(value);
};
