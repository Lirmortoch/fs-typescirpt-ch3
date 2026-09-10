import { argv } from 'node:process';

interface calculateExercisesObject {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

type calculateExercisesResult = calculateExercisesObject | string;

const calculateExercises = (dailyExerciseHours: number[], targetAmount: number): calculateExercisesResult => {
  // const result: calculateExercisesResult = {
  //   periodLength: dailyExerciseHours.length,
  //   trainingDays: 0,
  //   success: true,
  //   rating: 0,
  //   ratingDescription: '',
  //   target: targetAmount,
  //   average: 0,
  // }

  // for (let i = 0; i < dailyExerciseHours.length; i++) {
  //   if (dailyExerciseHours[i] > 0) result.trainingDays += 1;
  //   result.average += dailyExerciseHours[i];
  // }

  // result.average /= result.periodLength;
  // result.success = result.average === targetAmount;
  // result.rating = result.success ? 3 : result.average >= targetAmount - 1 ? 2 : 1;
  // result.ratingDescription = result.rating === 3 ? 'You did great! Keep going!' : result.rating === 2 ? 'not too bad but could be better' : 'Try again and you\'ll improve';
  
  const average = dailyExerciseHours.reduce((acc, hours) => acc += hours, 0) / dailyExerciseHours.length;
  const success = average === targetAmount;
  const rating = success ? 3 : average >= targetAmount - 1 ? 2 : 1,
  ratingDescription = rating === 3 ? 'You did great! Keep going!' : rating === 2 ? 'not too bad but could be better' : 'Try again and you\'ll improve';

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.reduce((acc, hours) => hours > 0 ? ++acc : acc, 0), // dailyExerciseHours.filter(item => item > 0).length
    success: success,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetAmount,
    average: average,
  };
}

try {
  const arr = argv.slice(2);

  const target = Number(arr[0]);
  const trainingDays = arr.slice(1).map(Number);
  console.log(calculateExercises(trainingDays, target));
}
catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';

  if (error instanceof Error) {
    errorMessage += error.message;
  }

  console.log(errorMessage, 'here');
}