import colors from 'colors';

export async function logFile(message, filename) {
  console.log(colors.gray(message + ":"), filename);
}