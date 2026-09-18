import express from 'express';

import { calculateBmi } from './healthapp.ts';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { weight, height } = req.query;
 
  if (!weight || !height) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const heightInCentimeters: number = Number(height);
  const weightInKilos: number = Number(weight);

  const result = calculateBmi(heightInCentimeters, weightInKilos);

  return res.json({
    weight: weightInKilos,
    height: heightInCentimeters,
    bmi: result,
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});