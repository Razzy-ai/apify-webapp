import React from 'react';

type Props = {
  token: string;
  setToken: (val: string) => void;
  error?: string; 
};

const TokenInput: React.FC<Props> = ({ token, setToken, error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">API Token</label>
      <input
        className={`border p-2 w-full ${error ? 'border-red-500' : ''}`}
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="Enter your Apify token"
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TokenInput;
