import express from 'express';
import {
  fetchActors,
  fetchActorInputSchema,
  runActor,
  getRunResult,
  getRunStatusController
} from '../controllers/apifyController';

const router = express.Router();

router.get('/actors', fetchActors);
router.get('/actors/:actorId/input-schema', fetchActorInputSchema);
router.post('/actors/:actorId/run', runActor);
router.get('/runs/:runId/result', getRunResult);

router.get('/runs/:runId/status', getRunStatusController);


export default router;
