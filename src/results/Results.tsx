import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
import type { ResultsProps } from './types';
import { ResultsContainer } from './ResultsContainer';
import { NotFound } from '../pages/NotFound';

export function Results(props: ResultsProps) {
  const { data, loading, error } = props;
  const founded = Array.isArray(data?.results) && data?.results.length > 0;
  if (error)
    return (
      <ResultsContainer>
        <NotFound reason={error} hideButton={true} />
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
