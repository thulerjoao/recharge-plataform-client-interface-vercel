export const formatDate = (dateString: string | null): string => {
  if (dateString === null) return;
  const dateParts = dateString.split(" - ");
  const [day, month, year] = dateParts[0].split("/").map(Number);
  const time = dateParts[1];

  const date = new Date(year, month - 1, day);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  now.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === now.toDateString();

  if (isToday) return `Hoje, ${time}`;
  if (isYesterday) return `Ontem, ${time}`;

  return dateString;
};
