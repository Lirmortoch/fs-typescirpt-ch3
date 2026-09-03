const calculateBmi = (weightInKilos: number, heightInCentimeters: number): string => {
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
  console.log(calculateBmi(90, 180));
}
catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage, 'here');
}