export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const dateInBrazil = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );
  const nowInBrazil = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );
  const yesterdayInBrazil = new Date(
    yesterday.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }),
  );

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isToday = isSameDate(dateInBrazil, nowInBrazil);
  const isYesterday = isSameDate(dateInBrazil, yesterdayInBrazil);

  // Formatar hora no timezone do Brasil
  const timeFormatted = date.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Hoje, ${timeFormatted}`;
  if (isYesterday) return `Ontem, ${timeFormatted}`;

  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
