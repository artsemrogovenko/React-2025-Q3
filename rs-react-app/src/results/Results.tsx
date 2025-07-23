import React from 'react';
import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
import type { ResultsProps } from './types';
import { ResultsContainer } from './ResultsContainer';

export class Results extends React.Component<ResultsProps> {
  render(): React.ReactNode {
    const { data, loading, error } = this.props;
    const founded = Array.isArray(data?.results) && data?.results.length > 0;
    if (error)
      return (
        <ResultsContainer>
          <p className="text-red-500">{error}</p>
        </ResultsContainer>
      );
    if (loading)
      return (
        <ResultsContainer>
          <MySpinner />
        </ResultsContainer>
      );
    if (founded)
      return (
        <ResultsContainer>
          {founded &&
            data.results?.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
        </ResultsContainer>
      );
  }
}
