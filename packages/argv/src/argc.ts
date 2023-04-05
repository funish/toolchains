export function parseArgc(value: string) {
  if (!isNaN(Number(value))) {
    return Number(value);
  } else {
    return value;
  }
}
