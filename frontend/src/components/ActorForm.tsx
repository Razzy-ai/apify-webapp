import React, { useState } from 'react';

type Schema = {
  properties: Record<string, { type: string; description?: string }>;
  required?: string[];
};

type Props = {
  schema: Schema | null;
  onSubmit: (input: Record<string, string>, setError: (msg: string) => void) => void;
};

const ActorForm: React.FC<Props> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null); // clear error on user input
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // clear old error before new attempt
    onSubmit(formData, setError); // pass setError to parent
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-300 rounded">
          {error}
        </div>
      )}

      {schema &&
        Object.entries(schema.properties || {}).map(([key, val]) => (
          <div key={key} className="mb-4">
            <label className="block mb-1 capitalize">{key}</label>
            <input
              className="border p-2 w-full"
              type="text"
              name={key}
              placeholder={val.description}
              onChange={handleChange}
              required={schema.required?.includes(key)}
            />
          </div>
        ))}

      <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
        Run Actor
      </button>
    </form>
  );
};

export default ActorForm;
