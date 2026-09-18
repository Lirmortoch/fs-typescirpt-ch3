import { argv } from 'node:process';

export const calculateBmi = (heightInCentimeters: number, weightInKilos: number): string => {
  if (process.argv[1] === import.meta.filename) {
    return 'Can\'t run this code if module imported';
  }

  const heightInMeters = heightInCentimeters / 100;
  const bmiIndex = weightInKilos / (heightInMeters ** 2);

  if (bmiIndex < 25) {
    return 'Normal range';
  }
  else if (bmiIndex >= 25 && bmiIndex <= 29) {
    return 'Overweight range';
  }
  else if (bmiIndex >= 30) {
    return 'Obese range';
  }
  else {
    return `Can't calculate BMI index`;
  }
}

try {
  const [weightInKilos, heightInCentimeters] = argv.slice(2).map(Number);
  console.log(calculateBmi(weightInKilos, heightInCentimeters));
}
catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage, 'here');
}