import React from 'react';

type Props = {
  result: {
    runId: string;
    output: unknown;
  };
};

const Output: React.FC<Props> = ({ result }) => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Run Output</h2>
      <p className="text-sm text-gray-500 mb-2">Run ID: {result.runId}</p>
      <pre className="bg-gray-100 p-4 rounded overflow-x-auto max-w-full text-sm">
        {result.output
          ? JSON.stringify(result.output, null, 2)
          : 'No output available'}
      </pre>
    </div>
  );
};

export default Output;
