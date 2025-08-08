import { CharacterCard } from '../components/CharacterCard';
import { MySpinner } from '../components/Loader';
import type { ResultsProps } from './types';
import { ResultsContainer } from './ResultsContainer';
import { NotFound } from '../pages/NotFound';
import { DEFAULT_PAGE } from '../constants.ts';
import { useAppSelector, useUpdateLocation } from '../hooks/hooks.ts';
import { useDispatch } from 'react-redux';
import { rickMortyApi } from '../services/rickMorty.ts';
import { MyButton } from '../components/MyButton.tsx';

export function Results(props: ResultsProps) {
  const { data, loading, error, searchParams } = props;
  const founded = Array.isArray(data?.results) && data?.results.length;
  const { page } = useUpdateLocation();
  const rightside = useAppSelector((state) => state.details.isVisible);

  const dispatch = useDispatch();
  const handleUpdate = () => {
    dispatch(
      rickMortyApi.util.invalidateTags([
        { type: 'Characters', id: JSON.stringify(searchParams) },
      ])
    );
  };
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
      <ResultsContainer
        style={
          rightside ? 'w-[340px] flex-col' : 'h-fit flex-wrap justify-around'
        }
      >
        <MyButton text="Update" onClick={handleUpdate} />
        {founded &&
          data.results?.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </ResultsContainer>
    );
}
