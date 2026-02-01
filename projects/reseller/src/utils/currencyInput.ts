const DECIMAL_SEP = ",";
const DECIMAL_SEP_ALT = ".";

export function numberToEditableString(
  value: number | null | undefined,
): string {
  if (value === null || value === undefined) return "";
  const normalized = Math.round(value * 100) / 100;
  if (normalized === 0) return "";
  return normalized.toFixed(2).replace(".", DECIMAL_SEP);
}

export function sanitizeCurrencyInput(input: string): string {
  const cleaned = input.replace(/[^0-9.,]/g, "");
  if (!cleaned) return "";
  const lastComma = cleaned.lastIndexOf(DECIMAL_SEP);
  const lastDot = cleaned.lastIndexOf(DECIMAL_SEP_ALT);
  const lastSep = Math.max(lastComma, lastDot);
  if (lastSep === -1) return cleaned;
  const intPart = cleaned.slice(0, lastSep).replace(/[^0-9]/g, "") || "0";
  const decPart = cleaned
    .slice(lastSep + 1)
    .replace(/\D/g, "")
    .slice(0, 2);
  const trailingSep = lastSep === cleaned.length - 1;
  return decPart.length > 0
    ? `${intPart}${DECIMAL_SEP}${decPart}`
    : trailingSep
      ? `${intPart}${DECIMAL_SEP}`
      : intPart;
}

export function parseCurrencyInput(input: string): number {
  if (!input || !input.trim()) return 0;
  const trimmed = input.trim().replace(/[^0-9.,]/g, "");
  if (!trimmed) return 0;
  const lastComma = trimmed.lastIndexOf(DECIMAL_SEP);
  const lastDot = trimmed.lastIndexOf(DECIMAL_SEP_ALT);
  const lastSep = Math.max(lastComma, lastDot);
  const normalized =
    lastSep === -1
      ? trimmed
      : trimmed.slice(0, lastSep).replace(/[^0-9]/g, "") +
        DECIMAL_SEP_ALT +
        trimmed
          .slice(lastSep + 1)
          .replace(/\D/g, "")
          .slice(0, 2);
  const num = parseFloat(normalized.replace(DECIMAL_SEP, DECIMAL_SEP_ALT));
  if (Number.isNaN(num) || num < 0) return 0;
  return Math.round(num * 100) / 100;
}
