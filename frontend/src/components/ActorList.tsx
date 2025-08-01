import React from 'react';

type Actor = {
  id: string;
  name: string;
};

type Props = {
  actors: Actor[];
  onSelect: (id: string) => void;
  error?: string; // optional error prop
};

const ActorList: React.FC<Props> = ({ actors, onSelect, error }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2">Available Actors</h2>

      {error && (
        <div className="text-red-500 mb-2 bg-red-100 p-2 rounded">
          ⚠️ {error}
        </div>
      )}

      {actors.length === 0 && !error ? (
        <p className="text-gray-500">No actors found.</p>
      ) : (
        <ul>
          {actors.map((actor) => (
            <li key={actor.id} className="mb-2">
              <button
                className="text-blue-500 underline"
                onClick={() => onSelect(actor.id)}
              >
                {actor.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActorList;
