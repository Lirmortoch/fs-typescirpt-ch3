import express from 'express';
import type { Response } from 'express';

import patientsService from '../services/patientsService.ts';
import type { NonSensitivePatientsEntry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  const data = patientsService.getNonSensitivePatientsData();
  res.send(data);
});

export default router;