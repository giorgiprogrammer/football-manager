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
  // Ensure the parameter is a number between 0 and 100
  if (typeof parameter !== "number" || parameter < 0 || parameter > 100) {
    throw new Error("Parameter must be a number between 0 and 100");
  }

  // Interpolate between min and max based on the parameter
  const range = max - min;
  const result = min + (parameter / 100) * range;

  return result;
}
