// api/apify.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/apify';

const authHeader = (token: string) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const fetchActors = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/actors`, authHeader(token));
  return response.data;
};

export const fetchInputSchema = async (actorId: string, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/actors/${actorId}/input-schema`, authHeader(token));
  return response.data;
};

export const runActor = async (actorId: string, input: Record<string, unknown>, token: string) => {
  const response = await axios.post(`${API_BASE_URL}/actors/${actorId}/run`, input, authHeader(token));
  return response.data;
};

export const getRunResult = async (runId: string, token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/runs/${runId}/result`, authHeader(token));
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error fetching run result:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const getRunStatus = async (runId: string, token: string) => {
  const response = await axios.get(`${API_BASE_URL}/runs/${runId}/status`, authHeader(token));
  return response.data;
};
