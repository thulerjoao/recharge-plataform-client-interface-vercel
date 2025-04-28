export function formatString(string: string) {
  return string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[./?%#&=+:,@]/g, "")
    .replace(/\s+/g, "_");
}
