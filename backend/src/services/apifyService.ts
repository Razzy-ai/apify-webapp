import axios from 'axios';

const APIFY_API_BASE = 'https://api.apify.com/v2';

// 1. Get list of actors
export const getActors = async (token: string) => {
  try {
    const response = await axios.get(`${APIFY_API_BASE}/acts`, {
      params: { token },
    });
    return response.data.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};

// 2. Get actor input schema
export const getActorInputSchema = async (actorId: string, token: string) => {
  try {
    const response = await axios.get(`${APIFY_API_BASE}/acts/${actorId}`, {
      params: { token },
    });

    const actorData = response.data.data;

    if (actorData.inputSchema) {
      return actorData.inputSchema;
    }

    if (actorData.exampleRunInput) {
      console.warn("No inputSchema found. Returning exampleRunInput instead.");
      return { exampleInput: actorData.exampleRunInput };
    }

    throw new Error("Neither inputSchema nor exampleRunInput found.");
  } catch (error: any) {
    console.error("Apify error:", error.response?.data || error.message);
    throw error;
  }
};

// 3. Start an actor with input
export const startActor = async (actorId: string, input: any, token: string) => {
  try {
    const response = await axios.post(
      `${APIFY_API_BASE}/acts/${actorId}/runs`,
      { input },
      { params: { token } }
    );
    return response.data.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};

// 4. Fetch run result by runId
export const fetchRunResult = async (runId: string, token: string) => {
  try {
    const response = await axios.get(`${APIFY_API_BASE}/actor-runs/${runId}/dataset/items`, {
      params: { token },
    });
    return response.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};

// 5. Get run status
export const getRunStatus = async (runId: string, token: string) => {
  try {
    const response = await axios.get(`${APIFY_API_BASE}/actor-runs/${runId}`, {
      params: { token },
    });
    return response.data.data; // includes status, finishedAt, etc.
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};
