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
