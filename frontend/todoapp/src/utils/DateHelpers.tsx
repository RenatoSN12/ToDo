export function toFullDate(date : Date | null): string {
  if(date === null){
    date = new Date();
  }

  const formatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
}).format(date);

return formatted; 
}

export function safeDateFromString(input: string | null): Date {
  if (!input) return new Date();

  const [year, month, day] = input.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// export function formatDateBR(date: Date | null): string {
//   if (!date) return "";
//   return date.toLocaleDateString("pt-BR", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });
// }

export function stripTime(date: Date): Date {
  const clean = new Date(date);
  clean.setHours(0, 0, 0, 0);
  return clean;
}