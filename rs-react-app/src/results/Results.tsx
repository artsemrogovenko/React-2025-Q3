import React from 'react';
import type { Character, Info } from 'rickmortyapi';
import { CharacterCard } from '../components/CharacterCard';
interface ResultsProps {
  data: Info<Character[]>;
  loading?: boolean;
  error?: string | null;
}

export class Results extends React.Component<ResultsProps> {
  render(): React.ReactNode {
    const { data } = this.props;

    return (
      <div className="flex flex-col p-6 rounded-lg border-2 max-w-sm text-center gap-2">
        {data.results?.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    );
  }
}
