import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

const APIFY_API_BASE = 'https://api.apify.com/v2';
const APIFY_TOKEN = process.env.APIFY_API_TOKEN;

if (!APIFY_TOKEN) {
  console.error("APIFY_API_TOKEN is missing in .env");
  process.exit(1);
}

console.log('Loaded APIFY token:', APIFY_TOKEN);

// Create axios instance without auth header
const axiosInstance = axios.create({
  baseURL: APIFY_API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Get list of actors
export const getActors = async () => {
  try {
    console.log('Calling Apify with token:', APIFY_TOKEN);
    const response = await axiosInstance.get('/acts', {
      params: { token: APIFY_TOKEN },
    });
    console.log('Apify response:', response.data);
    return response.data.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};

// 2. Get actor input schema
export const getActorInputSchema = async (actorId: string) => {
 try {
    const response = await axiosInstance.get(`/acts/${actorId}`, {
      params: { token: APIFY_TOKEN },
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
export const startActor = async (actorId: string, input: any) => {
  try {
    const response = await axiosInstance.post(
      `/acts/${actorId}/runs`,
      { input },
      { params: { token: APIFY_TOKEN } }
    );
    return response.data.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};

// 4. Fetch run result by runId
export const fetchRunResult = async (runId: string) => {
  try {
    const response = await axiosInstance.get(`/actor-runs/${runId}/dataset/items`, {
      params: { token: APIFY_TOKEN },
    });
    return response.data;
  } catch (error: any) {
    console.error('Apify error:', error.response?.data || error.message);
    throw error;
  }
};
