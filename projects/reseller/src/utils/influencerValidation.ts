import { validateCNPJ, validateCPF } from "./documentValidation";

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  paymentMethod?: string;
  paymentData?: string;
}

export const validateInfluencerForm = (formData: {
  name: string;
  email: string;
  phone: string;
  paymentMethod: string;
  paymentData: string;
}): { isValid: boolean; errors: FormErrors } => {
  const newErrors: FormErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    newErrors.name = "Nome é obrigatório";
  }

  // Email validation (if provided)
  if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Email inválido";
  }

  // Phone validation (if provided)
  if (formData.phone.trim()) {
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 1) {
      newErrors.phone = "Telefone não pode ser vazio";
    }
  }

  // Payment method validation
  if (!formData.paymentMethod) {
    newErrors.paymentMethod = "Tipo de chave PIX é obrigatório";
  }

  // PIX key validation
  if (!formData.paymentData.trim()) {
    newErrors.paymentData = "Chave PIX é obrigatória";
  } else {
    // Specific validation by payment method type
    const paymentData = formData.paymentData.replace(/\D/g, "");

    if (formData.paymentMethod === "CPF") {
      if (paymentData.length !== 11) {
        newErrors.paymentData = "CPF deve ter 11 dígitos";
      } else if (!validateCPF(formData.paymentData)) {
        newErrors.paymentData = "CPF inválido";
      }
    } else if (formData.paymentMethod === "CNPJ") {
      if (paymentData.length !== 14) {
        newErrors.paymentData = "CNPJ deve ter 14 dígitos";
      } else if (!validateCNPJ(formData.paymentData)) {
        newErrors.paymentData = "CNPJ inválido";
      }
    } else if (
      formData.paymentMethod === "EMAIL" &&
      !/\S+@\S+\.\S+/.test(formData.paymentData)
    ) {
      newErrors.paymentData = "Email inválido";
    } else if (formData.paymentMethod === "PHONE" && paymentData.length < 1) {
      newErrors.paymentData = "Telefone não pode ser vazio";
    } else if (
      formData.paymentMethod === "RANDOM" &&
      formData.paymentData.length !== 32
    ) {
      newErrors.paymentData = "Chave aleatória deve ter 32 caracteres";
    }
  }

  return {
    isValid: Object.keys(newErrors).length === 0,
    errors: newErrors,
  };
};
