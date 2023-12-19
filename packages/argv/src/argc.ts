export function parseArgc(value: string) {
  if (!Number.isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}
