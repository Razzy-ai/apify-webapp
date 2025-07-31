import express from 'express';
import {
  fetchActors,
  fetchActorInputSchema,
  runActor,
  getRunResult,
} from '../controllers/apifyController';

const router = express.Router();

router.get('/actors', fetchActors);
router.get('/actors/:actorId/input-schema', fetchActorInputSchema);
router.post('/actors/:actorId/run', runActor);
router.get('/actors/:actorId/run/:runId/result', getRunResult);

export default router;
