import express from 'express';
import type { Request, Response } from 'express';

import { calculateBmi } from './healthapp.ts';
import { calculateExercises, type calculateExercisesResult } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req: Request, res: Response) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request, res: Response) => {
  const { weight, height } = req.query;

  const heightInCentimeters: number = Number(height);
  const weightInKilos: number = Number(weight);

  if (!weight || !height
      || typeof heightInCentimeters !== 'number' || typeof weightInKilos !== 'number'
      || Number.isNaN(weightInKilos) || Number.isNaN(heightInCentimeters)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: string = calculateBmi(heightInCentimeters, weightInKilos);

  return res.json({
    weight: weightInKilos,
    height: heightInCentimeters,
    bmi: result,
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  const body = req.body as { daily_exercises: unknown; target: unknown };
  const { daily_exercises, target } = body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(404).json({ error: "parameters missing" });
  }

  if (
    typeof target !== 'number' || Number.isNaN(target) || !Array.isArray(daily_exercises) ||
    !daily_exercises.every((item): item is number => typeof item === 'number' 
    || typeof item === 'string')) {
      return res.status(400).json({ error: "malformatted parameters" });
  }

  const dailyExerciseHours: number[] = (daily_exercises as (number | string)[]).map(Number);

  if (dailyExerciseHours.some(item => Number.isNaN(item))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: calculateExercisesResult = calculateExercises(dailyExerciseHours, target);

  return res.json(result);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});