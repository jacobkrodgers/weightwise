export function convertLbsToOz(lbs: number): number {
  return lbs * 16;
}

export function convertOzToGrams(oz: number): number {
  return oz * 28.3495;
}

export class Weight {

  constructor(grams: number) {
    this.grams = grams;
  }

  convertToOz(): number {
    return this.grams / 28.3495;
  }

  convertToLbs(): number {
    return this.grams / 453.592;
  }

  convertToKg(): number {
    return this.grams / 1000;
  }

  grams: number;
}