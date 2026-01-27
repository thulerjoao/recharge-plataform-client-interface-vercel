export const formatNumber = (value: number | null | undefined) => {
  if (value === null || value === undefined) return "";
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
  }).format(value);
};
