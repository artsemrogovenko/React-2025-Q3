import React from 'react';
import type { Character, Info } from 'rickmortyapi';
import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
interface ResultsProps {
  data: Info<Character[]> | null;
  loading?: boolean;
  error?: string | null;
}

export class Results extends React.Component<ResultsProps> {
  render(): React.ReactNode {
    const { data, loading, error } = this.props;
    return (
      <div
        data-testid="search-results"
        className="flex flex-col p-6 rounded-lg border-2 max-w-sm min-h-[360px] text-center gap-2"
      >
        {loading ? (
          <MySpinner />
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : !data?.results ? (
          <p>No characters found</p>
        ) : (
          data.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))
        )}
      </div>
    );
  }
}
