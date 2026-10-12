import express from 'express';
import cors from 'cors';

import diagnosesRouter from './src/routers/diagnoses.ts';
import patientsRouter from './src/routers/patients.ts';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('Someone pinged there!');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
 
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`)
});