export function convertFeetToInches(feet: number): number {
    return feet * 12;
}
  
export function convertInchestoCm(inches: number): number {
    return inches * 2.54;
}

export class Height {

    constructor(centimeters: number) {
        this.centimeters = centimeters;
    }

    convertToInches(): number {
        return this.centimeters / 2.54;
    }

    convertToFeet(): number {
        return this.centimeters / 30.48;
    }

    centimeters: number;
}