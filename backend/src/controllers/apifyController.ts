import { Request, Response } from 'express';
import {
  getActors,
  getActorInputSchema,
  startActor,
  fetchRunResult,
} from '../services/apifyService';

export const fetchActors = async (_req: Request, res: Response) => {
  try {
    const actors = await getActors();
    res.json(actors);
  } catch (error:any) {
     console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch actors' });
  }
};

export const fetchActorInputSchema = async (req: Request, res: Response) => {
  try {
    const { actorId } = req.params;
    console.log('Fetching input schema for actor:', actorId);  
    const schema = await getActorInputSchema(actorId);
    res.json(schema);
  } catch (error) {
    console.error(error);  
    res.status(500).json({ error: 'Failed to fetch input schema' });
  }
};

export const runActor = async (req: Request, res: Response) => {
  try {
    const { actorId } = req.params;
    const input = req.body;
    const run = await startActor(actorId, input);
    res.json(run);
  } catch (error) {
    res.status(500).json({ error: 'Failed to run actor' });
  }
};

export const getRunResult = async (req: Request, res: Response) => {
  try {
    const { runId } = req.params;
    const result = await fetchRunResult(runId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch run result' });
  }
};
