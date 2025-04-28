export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "";

  const [datePart, timePart] = dateString.split(" - ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);

  const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute));

  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);

  const isSameDate = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isToday = isSameDate(utcDate, now);
  const isYesterday = isSameDate(utcDate, yesterday);

  const timeFormatted = utcDate.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Hoje, ${timeFormatted}`;
  if (isYesterday) return `Ontem, ${timeFormatted}`;

  return utcDate.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
