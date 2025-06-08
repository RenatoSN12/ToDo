// export function safeDateFromString(input: string | null): Date {
  // if(input === null) return new Date();
  
  // const dStr = input.replace(/\//g, "-");

  // let dateParts: string[] = dStr.split("-");

  // let dateObject: Date = new Date(+dateParts[0],+dateParts[2] -1, +dateParts[1]);

  // return dateObject;
// }

export function safeDateFromString(input: string | null): Date {
  if (!input) return new Date();

  const [year, month, day] = input.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatDateBR(date: Date | null): string {
  if (!date) return "";
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}