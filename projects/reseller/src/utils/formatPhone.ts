export const formatPhone = (phone: string): string => {
  if (!phone) return "";

  // Remove todos os caracteres não numéricos
  const numbersOnly = phone.replace(/\D/g, "");

  // Verifica se tem pelo menos 10 dígitos (DDD + número)
  if (numbersOnly.length < 10) return phone;

  // Extrai DDD (2 primeiros dígitos)
  const ddd = numbersOnly.slice(0, 2);
  const number = numbersOnly.slice(2);

  // Formata baseado no tamanho do número
  if (number.length === 9) {
    // Celular: (11) 91234-5678
    return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
  } else if (number.length === 8) {
    // Fixo: (11) 1234-5678
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  // Se não se encaixar nos padrões, retorna o original
  return phone;
};
