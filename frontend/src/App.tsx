import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TokenInput from './components/TokenInput';
import ActorList from './components/ActorList';
import ActorForm from './components/ActorForm';
import Output from './components/Output';
import {
  fetchActors,
  fetchInputSchema,
  runActor,
  getRunResult,
  getRunStatus,
} from './api/apify';

type Actor = {
  id: string;
  name: string;
};

type ActorSchema = {
  type: string;
  properties: {
    [key: string]: {
      type: string;
      description?: string;
    };
  };
  required?: string[];
};

type RunResult = {
  runId: string;
  output: unknown;
};

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [actors, setActors] = useState<Actor[]>([]);
  const [selectedActorId, setSelectedActorId] = useState<string | null>(null);
  const [schema, setSchema] = useState<ActorSchema | null>(null);
  const [result, setResult] = useState<RunResult | null>(null);

  useEffect(() => {
    const loadActors = async () => {
      if (!token) return;
      try {
        const res = await fetchActors(token);
        setActors(res.items || []);
      } catch (err: unknown) {
        console.error('Error fetching actors:', err);
        alert('❌ Failed to fetch actors. Please check your token.');
      }
    };
    loadActors();
  }, [token]);

  const handleSelectActor = async (id: string) => {
    if (!token) return;
    setSelectedActorId(id);
    setResult(null);
    try {
      const schemaData = await fetchInputSchema(id, token);
      setSchema(schemaData);
    } catch (err) {
      console.error('Error fetching schema:', err);
      alert('❌ Failed to fetch input schema for this actor.');
    }
  };

  const handleRunActor = async (
    input: Record<string, string>,
    setError: (msg: string) => void
  ) => {
    if (!selectedActorId || !token) {
      setError('Missing actor or token');
      return;
    }

    try {
      const runData = await runActor(selectedActorId, input, token);
      const runId = runData.id;

      const interval = setInterval(async () => {
        try {
          const status = await getRunStatus(runId, token);
          if (status.status === 'SUCCEEDED') {
            clearInterval(interval);
            const output = await getRunResult(runId, token);
            setResult({ runId, output });
          } else if (status.status === 'FAILED') {
            clearInterval(interval);
            setError('Actor run failed. Please try again.');
          }
        } catch (error) {
          clearInterval(interval);
          console.error('Error polling status/result:', error);
          setError('Error fetching run status.');
        }
      }, 3000);
    } catch (err) {
  if (axios.isAxiosError(err)) {
    if (err.response?.status === 401 || err.message?.includes('401')) {
      setError('Invalid token. Please check and try again.');
    } else {
      setError('Actor run failed. Please try again.');
    }
  } else {
    setError('An unexpected error occurred.');
  }
}

  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apify Actor Runner</h1>
      <TokenInput token={token} setToken={setToken} />
      {actors.length > 0 && <ActorList actors={actors} onSelect={handleSelectActor} />}
      {schema && <ActorForm schema={schema} onSubmit={handleRunActor} />}
      {result && <Output result={result} />}
    </div>
  );
};

export default App;
