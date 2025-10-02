export interface PackageFormErrors {
  name?: string;
  amountCredits?: string;
  basePrice?: string;
  profitMargin?: string;
}

export const validatePackageForm = (formData: {
  name?: string;
  amountCredits?: number;
  basePrice?: string;
  profitMargin?: number;
}): { isValid: boolean; errors: PackageFormErrors } => {
  const newErrors: PackageFormErrors = {};

  // Validação do nome
  if (!formData.name?.trim()) {
    newErrors.name = "Nome do pacote é obrigatório";
  } else if (formData.name.length > 70) {
    newErrors.name = "Nome deve ter no máximo 70 caracteres";
  }

  // Validação da quantidade de créditos
  if (!formData.amountCredits || formData.amountCredits <= 0) {
    newErrors.amountCredits = "Quantidade de créditos deve ser maior que 0";
  } else if (formData.amountCredits > 99999999999999) {
    newErrors.amountCredits =
      "Quantidade de créditos deve ter no máximo 14 dígitos";
  }

  // Validação do preço base
  if (!formData.basePrice || +formData.basePrice <= 0) {
    newErrors.basePrice = "Preço base deve ser maior que 0";
  }

  // Validação da margem de lucro
  if (formData.profitMargin !== undefined && formData.profitMargin < 0) {
    newErrors.profitMargin = "Margem de lucro não pode ser negativa";
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
