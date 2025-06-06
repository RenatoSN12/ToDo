export function stringToDate(value?: string | null): Date {
  if (!value) return new Date();

  const parsed = new Date(value);
  return isNaN(parsed.getTime()) ? new Date() : parsed;
}