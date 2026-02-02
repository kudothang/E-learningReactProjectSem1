export function removeDiacritics(text: string) {
  return text
    .normalize("NFD")                 // tách dấu
    .replace(/[\u0300-\u036f]/g, "")  // xoá dấu
    .toLowerCase()
    .trim();
}
