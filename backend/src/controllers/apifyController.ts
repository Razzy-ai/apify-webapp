import { Request, Response } from 'express';
import {
  getActors,
  getActorInputSchema,
  startActor,
  fetchRunResult,
  getRunStatus
} from '../services/apifyService';

const extractToken = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  return authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
};

export const fetchActors = async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Missing Apify token' });

  try {
    const actors = await getActors(token);
    res.json(actors);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch actors' });
  }
};

export const fetchActorInputSchema = async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Missing Apify token' });

  try {
    const { actorId } = req.params;
    const schema = await getActorInputSchema(actorId, token);
    res.json(schema);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch input schema' });
  }
};

export const runActor = async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Missing Apify token' });

  try {
    const { actorId } = req.params;
    const input = req.body;
    const run = await startActor(actorId, input, token);
    res.json(run);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to run actor' });
  }
};

export const getRunResult = async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Missing Apify token' });

  try {
    const { runId } = req.params;
    const result = await fetchRunResult(runId, token);
    res.json(result);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch run result' });
  }
};

export const getRunStatusController = async (req: Request, res: Response) => {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Missing Apify token' });

  try {
    const { runId } = req.params;
    const status = await getRunStatus(runId, token);
    res.json(status);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch run status' });
  }
};
