import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
import type { ResultsProps } from './types';
import { ResultsContainer } from './ResultsContainer';
import { NotFound } from '../pages/NotFound';
import { useContext } from 'react';
import { AppContext, DEFAULT_PAGE } from '../constants.ts';
import { useUpdateLocation } from '../hooks/hooks.ts';

export function Results(props: ResultsProps) {
  const context = useContext(AppContext);
  const { data, loading, error } = props;
  const founded = Array.isArray(data?.results) && data?.results.length;
  const { page } = useUpdateLocation();
  const rightside = context?.character;
  if (error) {
    const hide = Number(page) <= DEFAULT_PAGE;
    return (
      <ResultsContainer>
        <NotFound reason={error} hideButton={hide} />
      </ResultsContainer>
    );
  }
  if (loading)
    return (
      <ResultsContainer>
        <MySpinner />
      </ResultsContainer>
    );
  if (founded)
    return (
      <ResultsContainer style={rightside ? 'w-[340px] flex-col' : ''}>
        {founded &&
          data.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </ResultsContainer>
    );
}
