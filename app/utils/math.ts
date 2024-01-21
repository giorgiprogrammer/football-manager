export function getRandomNumber(from: number, to: number) {
  if (from > to) {
    throw new Error(
      "Invalid input parameters. The `from` parameter must be less than or equal to the `to` parameter."
    );
  }
  const randomNumber = Math.floor(Math.random() * (to - from + 1)) + from;
  return randomNumber;
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) {
    throw new Error("Total cannot be zero");
  }

  return (part * total) / 100;
}

export function interpolate(parameter: number, min: number, max: number) {
  const normalizedPassDelay = (parameter - 1) / 99;

  // Calculate the interpolated value
  const interpolatedValue = min + normalizedPassDelay * (max - min);

  return interpolatedValue;
}

export function clamp(parameter: number, min: number, max: number) {
  const range = max - min;

  return Math.floor(((parameter - min) * 100) / range);
}
