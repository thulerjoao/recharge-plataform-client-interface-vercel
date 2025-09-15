export interface FormErrors {
  title?: string;
  discountPercentage?: string;
  discountAmount?: string;
  expiresAt?: string;
  maxUses?: string;
  minOrderAmount?: string;
}

export const validateCouponForm = (formData: {
  title?: string;
  discountPercentage?: number | null;
  discountAmount?: number | null;
  expiresAt?: string;
  maxUses?: number;
  minOrderAmount?: number;
  selectedDiscountType?: "percentage" | "amount";
}): { isValid: boolean; errors: FormErrors } => {
  const newErrors: FormErrors = {};

  // Validação do título
  if (!formData.title?.trim()) {
    newErrors.title = "Título do cupom é obrigatório";
  }

  // Validação do tipo de desconto baseado no selectedDiscountType
  if (formData.selectedDiscountType === "percentage") {
    // Validação APENAS para porcentagem quando tipo é percentage
    if (!formData.discountPercentage || formData.discountPercentage <= 0) {
      newErrors.discountPercentage = "Porcentagem deve ser maior que 0";
    } else if (formData.discountPercentage > 100) {
      newErrors.discountPercentage = "Porcentagem não pode ser maior que 100%";
    }
    // NÃO valida discountAmount quando tipo é percentage
  } else if (formData.selectedDiscountType === "amount") {
    // Validação APENAS para valor fixo quando tipo é amount
    if (!formData.discountAmount || formData.discountAmount <= 0) {
      newErrors.discountAmount = "Valor deve ser maior que 0";
    }
    // NÃO valida discountPercentage quando tipo é amount
  } else {
    // Fallback: se selectedDiscountType não está definido, valida ambos
    if (formData.discountPercentage !== undefined) {
      if (!formData.discountPercentage || formData.discountPercentage <= 0) {
        newErrors.discountPercentage = "Porcentagem deve ser maior que 0";
      } else if (formData.discountPercentage > 100) {
        newErrors.discountPercentage =
          "Porcentagem não pode ser maior que 100%";
      }
    }
    if (formData.discountAmount !== undefined) {
      if (!formData.discountAmount || formData.discountAmount <= 0) {
        newErrors.discountAmount = "Valor deve ser maior que 0";
      }
    }
    // Se nenhum dos dois está definido, é obrigatório ter pelo menos um
    if (!formData.discountPercentage && !formData.discountAmount) {
      newErrors.discountPercentage = "Porcentagem é obrigatória";
      newErrors.discountAmount = "Valor é obrigatório";
    }
  }

  // Validação da data de expiração (se preenchida)
  if (formData.expiresAt) {
    const selectedDate = new Date(formData.expiresAt);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      newErrors.expiresAt = "Data de expiração deve ser futura";
    }
  }

  // Validação do máximo de usos (se preenchido)
  if (formData.maxUses && formData.maxUses <= 0) {
    newErrors.maxUses = "Máximo de usos deve ser maior que 0";
  }

  // Validação do valor mínimo do pedido (se preenchida)
  if (formData.minOrderAmount && formData.minOrderAmount < 0) {
    newErrors.minOrderAmount = "Valor mínimo não pode ser negativo";
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
