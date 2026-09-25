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
 
  if (!weight || !height) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightInCentimeters: number = Number(height); 
  const weightInKilos: number = Number(weight);

  const result: string = calculateBmi(heightInCentimeters, weightInKilos);

  return res.json({
    weight: weightInKilos,
    height: heightInCentimeters,
    bmi: result,
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  if (!req.body.daily_exercises || !req.body.target) {
    return res.status(404).json({ error: "parameters missing" });
  }

  const dailyExerciseHours: number[] = req.body.daily_exercises.map(Number);
  const target: number = Number(req.body.target);

  if (typeof target !== 'number' || !Array.isArray(dailyExerciseHours)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const result: calculateExercisesResult = calculateExercises(dailyExerciseHours, target);

  return res.json(result);
}); 

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});