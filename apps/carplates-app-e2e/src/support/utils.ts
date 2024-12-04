export function generatePlatename(): string {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let carplate = '';

  for (let i = 0; i < 3; i++) {
    carplate += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  for (let i = 0; i < 3; i++) {
    carplate += numbers.charAt(Math.floor(Math.random() * numbers.length));
  }

  return carplate;
}
